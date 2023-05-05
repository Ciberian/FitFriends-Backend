import { OrderType } from './enums/order-type.enum';
import { PaymentMethod } from './enums/payment-method.enum';

export interface IOrder {
  id?: number;
  type: OrderType;
  serviceId: number;
  trainerId?: string;
  price: number;
  quantity: number;
  totalPrice?: number;
  paymentMethod: PaymentMethod;
  creationDate?: Date;
}
