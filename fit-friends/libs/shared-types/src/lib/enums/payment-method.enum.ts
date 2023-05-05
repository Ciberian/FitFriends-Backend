export let PaymentMethod: {
  Visa: 'Visa',
  Mir: 'Mir',
  Umoney: 'Umoney'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]
