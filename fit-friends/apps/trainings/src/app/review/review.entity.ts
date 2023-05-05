import { IReview } from '@fit-friends/shared-types';

export class ReviewEntity implements IReview {
  public id: number;
  public authorName: string;
  public authorAvatar: string;
  public trainingId: number;
  public rating: number;
  public comment: string;
  public creationDate?: Date;

  constructor(review: IReview) {
    this.fillEntity(review);
  }


  public toObject() {
    return { ...this };
  }

  public fillEntity(review: IReview) {
    this.id = review.id;
    this.authorName = review.authorName;
    this.authorAvatar = review.authorAvatar;
    this.trainingId = review.trainingId;
    this.rating = review.rating;
    this.comment = review.comment;
    this.creationDate = review.creationDate;
  }
}
