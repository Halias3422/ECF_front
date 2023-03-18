export interface DashboardItemContext {
  id: string;
  confirm: boolean;
  error: string;
}

export interface ModifyDashboardItem {
  context: DashboardItemContext;
  attributes: any;
  previousImage?: string;
}

export interface DashboardImageData {
  file: Blob;
  name: string;
}
