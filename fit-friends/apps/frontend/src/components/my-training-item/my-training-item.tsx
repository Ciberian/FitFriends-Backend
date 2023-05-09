import { Link } from 'react-router-dom';
import { ITraining } from '@fit-friends/shared-types';

type MyTrainingItemProps = {
  training: ITraining;
};

function MyTrainingItem({ training }: MyTrainingItemProps): JSX.Element {
  const { title, image, type, caloriesToLose, description, price, rating } = training;

  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet={`img/content/thumbnails/${image}.webp, img/content/thumbnails/${image}@2x.webp 2x`}
              />
              <img
                src={`img/content/thumbnails/${image}.jpg`}
                srcSet={`img/content/thumbnails/${image}@2x.jpg 2x`}
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          {price ? (
            <p className="thumbnail-training__price">
              <span className="thumbnail-training__price-value">${price}</span>
              <span>₽</span>
            </p>
          ) : (
            <p className="thumbnail-training__price">Бесплатно</p>
          )}
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{type}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{caloriesToLose}</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to="#"
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to="#"
            >
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MyTrainingItem;
