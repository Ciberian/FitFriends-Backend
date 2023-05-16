import { IGym } from '@fit-friends/shared-types';
import { Link } from 'react-router-dom';

type SpecialGymProps = {
  gym: IGym;
};

function SpecialGym({ gym }: SpecialGymProps): JSX.Element {
  const { title, location, photos } = gym;
  const promoPhoto = photos[0];

  return (
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`img/content/thumbnails/${promoPhoto}.webp, img/content/thumbnails/${promoPhoto}@2x.webp 2x`}
          />
          <img
            src={`img/content/thumbnails/${promoPhoto}.jpg`}
            srcSet={`img/content/thumbnails/${promoPhoto}@2x.jpg 2x`}
            width="330"
            height="190"
            alt=""
          />
        </picture>
      </div>
      <p className="thumbnail-spec-gym__type">Ближайший зал</p>
      <div className="thumbnail-spec-gym__header">
        <h3 className="thumbnail-spec-gym__title">{title}</h3>
        <div className="thumbnail-spec-gym__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-spec-gym__location-address">
            {location}
          </address>
        </div>
      </div>
      <div className="thumbnail-spec-gym__button-wrapper">
        <Link className="btn btn--small thumbnail-spec-gym__button" to="#">
          Подробнее
        </Link>
        <Link className="btn btn--small btn--outlined thumbnail-spec-gym__button" to="#">
          Все залы
        </Link>
      </div>
    </div>
  );
}

export default SpecialGym;
