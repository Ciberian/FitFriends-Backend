import { GymFeature } from './enums/gym-params.enum';
import { MetroStation } from './enums/metro-station.enum';

export interface IGym {
  id?: number;
  title: string;
  location: MetroStation;
  isVerified?: boolean;
  gymFeatures: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  registerDate?: Date;
}
