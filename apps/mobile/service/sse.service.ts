import httpClient from './http-client';

import { PushSSEEventDTO } from '@/types';

export default class SSEService {
  public static pushEventByTargetIds(params: PushSSEEventDTO) {
    return httpClient.post<boolean, PushSSEEventDTO>(`/sse/push`, params);
  }
}
