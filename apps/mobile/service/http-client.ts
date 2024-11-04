import { CommonResponse } from '@imperial-kitchen/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private defaultConfig: AxiosRequestConfig;

  private constructor(config: AxiosRequestConfig) {
    this.defaultConfig = config;
    this.axiosInstance = axios.create(config);
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

  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config;
  }

  private handleResponse<T>(response: AxiosResponse<T>): AxiosResponse<T> {
    return response;
  }

  private handleError(error: AxiosError): Promise<AxiosError> {
    if (error.response?.status === 401) {
      // refresh token
    }
    return Promise.reject(error);
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
          if (response.data.statusCode !== 200) {
            throw new Error(
              typeof response.data.message === 'string' ? response.data.message : response.data.message.join(',')
            );
          }
          resolve(response.data.data as T);
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
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default httpClient;
