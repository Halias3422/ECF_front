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
  id?: string;
  image: string;
  title: string;
}

export interface GalleryDishDashboard {
  id: string;
  confirm: boolean;
  error: string;
}

export interface GalleryDishImageData {
  file: Blob | null;
  name: string;
}

export interface GalleryDishFormData {
  title: string;
  image: {
    file: Blob | null;
    name: string;
  };
}

export interface GalleryDishModifyDashboard {
  context: GalleryDishDashboard;
  attributes: GalleryDishFormData;
  previousImage?: string;
}

export interface GalleryDishCreateDashboard {
  context: GalleryDishDashboard;
  attributes: GalleryDishFormData;
}
