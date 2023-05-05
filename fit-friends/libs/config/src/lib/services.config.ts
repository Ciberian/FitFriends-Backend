import { registerAs } from '@nestjs/config';

export const servicesConfig = registerAs('service', () => ({
  users: process.env.USERS_SERVICE_URL,
  trainings: process.env.TRAININGS_SERVICE_URL,
  orders: process.env.ORDERS_SUBSERVICE_URL,
  reviews: process.env.REVIEWS_SUBSERVICE_URL,
  gyms: process.env.GYMS_SERVICE_URL,
  notify: process.env.NOTIFY_SERVICE_URL,
}));
