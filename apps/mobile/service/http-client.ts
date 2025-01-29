import { getStorageItemAsync, removeStorageItemAsync, setStorageItemAsync } from '@/hooks/useStorageState';
import { CommonResponse, RefreshTokenResponseVO } from '@/types';
import { eventBus } from '@/utils/event-bus';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { router } from 'expo-router';

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private defaultConfig: AxiosRequestConfig;

  private constructor(config: AxiosRequestConfig) {
    this.defaultConfig = config;
    this.axiosInstance = axios.create(config);

    this.handleRequest = this.handleRequest.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);

    this.initializeInterceptors();
  }

  public static getInstance(config: AxiosRequestConfig = {}): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  private initializeInterceptors() {
    this.axiosInstance.interceptors.request.use(this.handleRequest, this.handleError);
    this.axiosInstance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const accessToken = await getStorageItemAsync('accessToken');
    console.log(accessToken, 'accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private async handleError(error: AxiosError<CommonResponse>) {
    if (!(error instanceof AxiosError)) {
      return Promise.reject('Network error');
    }

    if (error.response?.status === 401 && error.response?.data.message === 'Expired token') {
      const refreshToken = await getStorageItemAsync('refreshToken');
      if (refreshToken) {
        try {
          // refresh token
          const response = await httpClient.post<RefreshTokenResponseVO>('/auth/refresh-token', { refreshToken });
          console.log(response, 'response');
          if (response) {
            await setStorageItemAsync('accessToken', response.accessToken);
            await setStorageItemAsync('refreshToken', response.refreshToken);

            const originalRequest = error.config as AxiosRequestConfig;
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${response.accessToken}`
            };
            return this.axiosInstance.request(originalRequest);
          }
        } catch (error) {
          await removeStorageItemAsync('accessToken');
          await removeStorageItemAsync('refreshToken');
          router.replace('/guide');
          return Promise.reject(error);
        }
      }
    }

    console.log(error.response?.data, 'error.response?.data.message');

    const errorMessage =
      (Array.isArray(error.response?.data.message) ? error.response?.data.message[0] : error.response?.data.message) ||
      'Request error';

    eventBus.emit('message', errorMessage);

    return Promise.reject(errorMessage);
  }

  private mergeConfig(overrideConfig?: AxiosRequestConfig) {
    return { ...this.defaultConfig, ...overrideConfig };
  }

  // Axios instance will combine finalConfig and defaultConfig.
  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      const finalConfig = this.mergeConfig(config);
      this.axiosInstance
        .request<CommonResponse<T>>(finalConfig)
        .then((response) => {
          if (!(response.data.statusCode >= 200 && response.data.statusCode < 300)) {
            throw new Error(
              typeof response.data.message === 'string' ? response.data.message : response.data.message?.join(',')
            );
          }
          if (response.data.data) {
            resolve(response.data.data);
          } else {
            reject(new Error('No data in response'));
          }
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }

  public get<T, P = Record<string, unknown>>(url: string, params?: P, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: 'GET', params });
  }

  public post<T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  public put<T, D = Record<string, unknown>>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }
}

const httpClient = HttpClient.getInstance({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export const getSSEBaseURL = () => {
  return process.env.EXPO_PUBLIC_BASE_URL + '/api/sse/events';
};

export default httpClient;
