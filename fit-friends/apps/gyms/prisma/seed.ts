import { PrismaClient } from '@prisma/client-gyms';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.gym.create({
    data: {
      title: 'Grand fitness',
      location: 'Пионерская',
      isVerified: true,
      gymFeatures: ['Бассейн', 'Массаж'],
      photos: ['photo1.png', 'photo2.png'],
      description: 'Спортивный комплекс премиум-класса с 3 видами сауны, бассейном длинной 54 м., услугами массажиста и большой парковкой.',
      price: 750,
      registerDate: new Date(),
    },
  });
  await prisma.gym.create({
    data: {
      title: 'Aтлетика',
      location: 'Петроградская',
      isVerified: false,
      gymFeatures: [],
      photos: ['photo3.png', 'photo4.png'],
      description: 'Большой выбор направлений групповых занятий, от йоги до бокса. После упорной тренировки можно расслабиться в сауне.',
      price: 800,
      registerDate: new Date(),
    },
  });
  await prisma.gym.create({
    data: {
      title: 'World Sport',
      location: 'Удельная',
      isVerified: true,
      gymFeatures: ['Детская комната'],
      photos: ['photo5.png', 'photo6.png', 'photo7.png'],
      description: 'Огромный зал с отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.',
      price: 600,
      registerDate: new Date(),
    },
  });
  await prisma.gym.create({
    data: {
      title: 'Power fit',
      location: 'Звёздная',
      isVerified: true,
      gymFeatures: ['Бесплатная парковка'],
      photos: ['photo8.png', 'photo9.png'],
      description: 'Потрясающий зал с панорамными окнами и вдохновляющим видом на город, огромное разнообразие направлений.',
      price: 550,
      registerDate: new Date(),
    },
  });
  await prisma.gym.create({
    data: {
      title: 'Fitrepublic',
      location: 'Спортивная',
      isVerified: false,
      gymFeatures: [],
      photos: ['photo10.png'],
      description: 'Спортивный комплекс с тренажерным залом, комнатами для групповых занятий и огромным залом для бега.',
      price: 900,
      registerDate: new Date(),
    },
  });
  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
