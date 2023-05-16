import { IReview } from '@fit-friends/shared-types';
import ReviewItem from '../review-item/review-item';

type ReviewsListProps = {
  reviews: IReview[];
  isForTrainer?: boolean;
  setPopupVisible: () => void;
};

function ReviewsList({ reviews, isForTrainer, setPopupVisible }: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {reviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        disabled={isForTrainer}
        onClick={setPopupVisible}
      >
        Оставить отзыв
      </button>
    </>
  );
}

export default ReviewsList;
