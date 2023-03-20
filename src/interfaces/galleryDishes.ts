export interface GalleryDishData {
  id?: string;
  image: string;
  title: string;
  position: number;
}

export interface GalleryDishDashboard {
  id: string;
  confirm: boolean;
  modified: boolean;
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
