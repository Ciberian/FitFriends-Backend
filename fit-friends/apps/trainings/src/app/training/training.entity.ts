import {
  TrainingType,
  UserLevel,
  UserGender,
  ITraining,
  TrainingDuration,
} from '@fit-friends/shared-types';

export class TrainingEntity implements ITraining {
  public id: number;
  public title: string;
  public image: string;
  public level: UserLevel;
  public type: TrainingType;
  public duration: TrainingDuration;
  public gender: UserGender;
  public caloriesToLose: number;
  public description: string;
  public video: string;
  public price: number;
  public rating: number;
  public ratingSum: number;
  public reviewsCount: number;
  public trainer: string;
  public isSpecialOffer: boolean;

  constructor(training: ITraining) {
    this.fillEntity(training);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(training: ITraining) {
    this.id = training.id;
    this.title = training.title;
    this.image = training.image;
    this.level = training.level;
    this.type = training.type;
    this.duration = training.duration;
    this.gender = training.gender;
    this.caloriesToLose = training.caloriesToLose;
    this.description = training.description;
    this.video = training.video;
    this.price = training.price;
    this.rating = training.rating;
    this.ratingSum = training.ratingSum;
    this.reviewsCount = training.reviewsCount;
    this.trainer = training.trainer;
    this.isSpecialOffer = training.isSpecialOffer;
  }
}
