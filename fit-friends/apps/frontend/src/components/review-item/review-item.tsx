import { IReview } from '@fit-friends/shared-types';

type ReviewItemProps = {
  review: IReview;
}

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { authorName, authorAvatar, rating, comment } = review;

  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <img
              src={authorAvatar}
              width="64"
              height="64"
              alt="Изображение пользователя"
            />
          </div>
          <span className="review__user-name">{authorName}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">
          {comment}
        </p>
      </div>
    </li>
  );
}

export default ReviewItem;
