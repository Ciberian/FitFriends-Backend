export interface IReview {
  id?: number;
  authorName: string;
  authorAvatar: string;
  trainingId: number;
  rating: number;
  comment: string;
  creationDate?: Date;
}
