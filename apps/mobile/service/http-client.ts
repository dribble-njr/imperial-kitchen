import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;
  private defaultConfig: AxiosRequestConfig;

  private constructor(config: AxiosRequestConfig) {
    this.defaultConfig = config;
    this.axiosInstance = axios.create(config);
  }

  public static getInstance(config: AxiosRequestConfig = {}): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(config);
    }
    return HttpClient.instance;
  }

  private mergeConfig(overrideConfig?: AxiosRequestConfig) {
    return { ...this.defaultConfig, ...overrideConfig };
  }

  // Axios instance will combine finalConfig and defaultConfig.
  public request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const finalConfig = this.mergeConfig(config);
    console.log(finalConfig, 'combined config');
    return this.axiosInstance.request<T>(finalConfig);
  }

  public get<T, D>(url: string, params?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'GET', params });
  }

  public post<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'POST', data });
  }

  public put<T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'PUT', data });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }
}

const httpClient = HttpClient.getInstance({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' }
});

export default httpClient;
