import { IGym, GymFeature, MetroStation } from '@fit-friends/shared-types';

export class GymEntity implements IGym {
  public id: number;
  public title: string;
  public location: MetroStation;
  public isVerified?: boolean;
  public gymFeatures: GymFeature[];
  public photos: string[];
  public description: string;
  public price: number;
  public registerDate?: Date;

  constructor(gym: IGym) {
    this.fillEntity(gym);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(gym: IGym) {
    this.id = gym.id;
    this.title = gym.title;
    this.location = gym.location;
    this.isVerified = gym.isVerified;
    this.gymFeatures = gym.gymFeatures;
    this.photos = gym.photos;
    this.description = gym.description;
    this.price = gym.price;
    this.registerDate = gym.registerDate;
  }
}
