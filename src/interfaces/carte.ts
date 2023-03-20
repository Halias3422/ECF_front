import { DishCarteData } from './dishes';

export interface CarteCategoryData {
  category: {
    id?: string;
    name: string;
    position: number;
  };
  dishes: DishCarteData[];
}
