import {
  IOrder,
  OrderType,
  PaymentMethod,
} from '@fit-friends/shared-types';

export class OrderEntity implements IOrder {
  public id: number;
  public type: OrderType;
  public serviceId: number;
  public trainerId: string;
  public price: number;
  public quantity: number;
  public totalPrice: number;
  public paymentMethod: PaymentMethod;
  public creationDate: Date;

  constructor(order: IOrder) {
    this.fillEntity(order);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(order: IOrder) {
    this.id = order.id;
    this.type = order.type;
    this.serviceId = order.serviceId;
    this.trainerId = order.trainerId;
    this.price = order.price;
    this.quantity = order.quantity;
    this.totalPrice = order.totalPrice;
    this.paymentMethod = order.paymentMethod;
    this.creationDate = order.creationDate;
  }
}
