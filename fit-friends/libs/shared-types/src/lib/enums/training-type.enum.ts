const Training = {
  Yoga: 'Йога',
  Running: 'Бег',
  Boxing: 'Бокс',
  Stretching: 'Стрейчинг',
  Crossfit: 'Кроссфит',
  Aerobics: 'Аэробика',
  Pilates: 'Пилатес',
} as const;

export type TrainingType = typeof Training[keyof typeof Training];
