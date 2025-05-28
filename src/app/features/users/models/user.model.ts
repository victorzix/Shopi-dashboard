import { Admin } from './admin.model';
import { Customer } from './customer.model';

export interface User {
  role: string;
  appCustomer: Customer;
  appAdmin: Admin;
}
