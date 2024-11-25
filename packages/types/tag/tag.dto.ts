import { TagType } from './tag.vo';

export interface CreateTagDTO {
  name: string;
  type: TagType;
}

export interface UpdateTagDTO {
  id: number;
  name: string;
  type: TagType;
}
