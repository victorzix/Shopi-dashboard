export interface Admin {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
