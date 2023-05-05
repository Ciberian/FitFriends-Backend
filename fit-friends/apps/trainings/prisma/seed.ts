import { PrismaClient } from '@prisma/client-trainings';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.training.create({
    data: {
      title: 'Crossfit',
      image: 'img1.jpg',
      level: 'Профессионал',
      type: 'Кроссфит',
      duration: '30-50 мин',
      gender: 'Женщина',
      caloriesToLose: 1200,
      description: 'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
      video: 'crossfit.mp4',
      price: 800,
      rating: 4,
      trainer: '64380940331da46b3f5a4776',
      isSpecialOffer: false,
    },
  });
  await prisma.training.create({
    data: {
      title: 'Energy',
      image: 'img2.jpg',
      level: 'Новичок',
      type: 'Пилатес',
      duration: '10-30 мин',
      gender: 'Женщина',
      caloriesToLose: 320,
      description: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
      video: 'pilates.mp4',
      price: 1000,
      rating: 5,
      trainer: '64380940331da46b3f5a4776',
      isSpecialOffer: true,
    },
  });
  await prisma.training.create({
    data: {
      title: 'Boxing',
      image: 'img3.jpg',
      level: 'Любитель',
      type: 'Бокс',
      duration: '50-80 мин',
      gender: 'Неважно',
      caloriesToLose: 1500,
      description: 'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
      video: 'boxing.mp4',
      price: 500,
      rating: 4,
      trainer: '64380940331da46b3f5a4776',
      isSpecialOffer: false,
    },
  });
  await prisma.training.create({
    data: {
      title: 'Power',
      image: 'img4.jpg',
      level: 'Профессионал',
      type: 'Аэробика',
      duration: '30-50 мин',
      gender: 'Мужчина',
      caloriesToLose: 800,
      description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
      video: 'power.mp4',
      price: 1800,
      rating: 5,
      trainer: '64380940331da46b3f5a4776',
      isSpecialOffer: false,
    },
  });
  await prisma.training.create({
    data: {
      title: 'Antistress',
      image: 'img5.jpg',
      level: 'Любитель',
      type: 'Йога',
      duration: '30-50 мин',
      gender: 'Женщина',
      caloriesToLose: 700,
      description: 'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
      video: 'yoga.mp4',
      price: 800,
      rating: 4,
      trainer: '64380940331da46b3f5a4776',
      isSpecialOffer: false,
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
