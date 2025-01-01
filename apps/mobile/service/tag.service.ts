import { CreateTagDTO, TagVO, UpdateTagDTO } from '@/types';
import httpClient from './http-client';

export default class TagService {
  public static createTag(params: CreateTagDTO) {
    return httpClient.post<TagVO, CreateTagDTO>('/tag', params);
  }

  public static updateTag(params: UpdateTagDTO) {
    return httpClient.put<boolean, UpdateTagDTO>('/tag', params);
  }

  public static getAllTags() {
    return httpClient.get<TagVO[]>('/tag');
  }

  public static deleteTag(id: number) {
    return httpClient.delete<boolean>(`/tag/${id}`);
  }
}
