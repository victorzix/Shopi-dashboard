export interface Product {
  id: string;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  description: string;
  manufacturer: string;
  visible: boolean;
  imagesUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}
