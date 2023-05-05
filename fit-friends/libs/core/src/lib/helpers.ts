import { plainToInstance, ClassConstructor } from 'class-transformer';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const makeId = (idLength: number) => {
  let id = '';

  for (let i = 0; i < idLength; i++) {
    id += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }

  return id;
}

export const getTodayWeekday = () => new Date().toDateString().toLowerCase().split(' ')[0];

export const parseQueryFromUrl = (url: string) => {
  const [, query] = url.split('?');
  return query;
};
