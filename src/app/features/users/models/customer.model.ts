export interface Customer {
  id: string;
  userId: string;
  name: string;
  email: string;
  document: string;
  isActive: boolean;
  addresses?: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  customerId: string;
  appCustomer: Customer;
  title: string;
  street: string;
  district: string;
  number: number;
  zipCode: string;
  city: string;
  state: string;
  complement?: string;
  isMain: boolean;
}
