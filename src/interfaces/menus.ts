import { Formula } from './formulas';

export interface Menu {
  id?: string;
  title: string;
  formulas: Formula[];
  position: number;
}
