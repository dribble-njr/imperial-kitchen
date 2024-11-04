import { Commodity } from '../commodity/commodity.vo';

export interface Category {
  id?: number;
  name?: string;
  description?: string;
  goods?: Commodity[];
}
