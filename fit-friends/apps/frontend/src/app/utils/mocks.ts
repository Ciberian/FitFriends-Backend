import { UserRole } from '../../../../../libs/shared-types/src/lib/enums/user-role.enum';
import { UserLevel } from '../../../../../libs/shared-types/src/lib/enums/user-level.enum';
import { UserGender } from '../../../../../libs/shared-types/src/lib/enums/user-gender.enum';
import { TrainingDuration } from '../../../../../libs/shared-types/src/lib/enums/training-duration.enum';
import { MetroStation } from '../../../../../libs/shared-types/src/lib/enums/metro-station.enum';
import { ITokenPayload } from '../../../../../libs/shared-types/src/lib/token-payload.interface';
import { ITraining } from '../../../../../libs/shared-types/src/lib/training.interface';
import { IGym } from '../../../../../libs/shared-types/src/lib/gym.interface';
import { datatype, internet, image, name, random, date } from 'faker';
import { Types } from 'mongoose';

const MOCK_GYMS_COUNT = 10;
const MOCK_TRAININGS_COUNT = 10;

export const makeFakeUserInfo = (): ITokenPayload => ({
  id: new Types.ObjectId('6446894d48463129630bf00c'),
  email: internet.email(),
  role: UserRole.Client,
  name: name.firstName(),
  avatar: image.imageUrl(),
  favoriteGyms: [],
});

export const makeFakeGym = (id: number): IGym => ({
  id: id,
  title: random.word(),
  location: MetroStation.Petrogradskaya,
  isVerified: datatype.boolean(),
  gymFeatures: [],
  photos: [],
  description: random.words(15),
  price: datatype.number({min: 100, max: 1000}),
  registerDate: date.recent(),
});

export const makeFakeTraining = (id: number): ITraining => ({
  id: id,
  title: random.word(),
  image: image.imageUrl(),
  level: UserLevel.Newbie,
  type: ['Йога'],
  duration: TrainingDuration.LessAnHour,
  gender: UserGender.Female,
  caloriesToLose: datatype.number({min: 100, max: 5000}),
  description: datatype.string(),
  video: datatype.string(),
  price: datatype.number({min: 100, max: 10000}),
  rating: datatype.number({min: 1, max: 5}),
  ratingSum: datatype.number({min: 100, max: 1000}),
  reviewsCount: datatype.number({min: 1, max: 1000}),
  trainer: datatype.string(),
  isSpecialOffer: datatype.boolean(),
});

export const fakeGyms = new Array(MOCK_GYMS_COUNT).fill(null).map((_gym, index) => (makeFakeGym(index)));

export const fakeTrainings = new Array(MOCK_TRAININGS_COUNT).fill(null).map((_training, index) => (makeFakeTraining(index)));
