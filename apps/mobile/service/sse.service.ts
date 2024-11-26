import httpClient from './http-client';

import { PushSseEventDTO } from '@imperial-kitchen/types';

export default class SSEService {
  public static pushEventByTargetIds(params: PushSseEventDTO) {
    return httpClient.post<boolean, PushSseEventDTO>(`/sse/push`, params);
  }
}
