import { DishCarteData } from './dishes';

export interface CarteCategoryData {
  category: {
    name: string;
  };
  dishes: DishCarteData[];
}
