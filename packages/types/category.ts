import { Commodity } from './commodity';

export interface Category {
  id?: number;
  name?: string;
  description?: string;
  goods?: Commodity[];
}
