export interface DishFormData {
  title?: string;
  description?: string;
  image?: string;
  price?: number;
  category?: string;
}

export interface DishCarteData {
  title: string;
  image: string;
  description: string;
  price: string;
}

export interface GalleryDishData {
  image: string;
  title: string;
}

export interface GalleryDishDashboard {
  title: string;
  click: boolean;
  confirm: boolean;
}

export interface GalleryDishModifyDashboard {
  context: GalleryDishDashboard;
  attributes: GalleryDishData;
}
