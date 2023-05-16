import { IGym } from '@fit-friends/shared-types';
import { Link } from 'react-router-dom';

type GymItemProps = {
  gym: IGym;
  isForCatalogPage: boolean;
};

function GymItem({ gym, isForCatalogPage }: GymItemProps): JSX.Element {
  const { title, location, isVerified, photos, description } = gym;
  const promoPhoto = photos[0];

  return (
    <li className={`${isForCatalogPage ? 'gyms-catalog__item' : 'my-gyms__item'}`}>
      <div className="thumbnail-gym">
        <div className="thumbnail-gym__image">
          <img src={promoPhoto} width="330" height="190" alt="" />
        </div>
        {isVerified && (
          <div className="thumbnail-gym__verified">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-verify"></use>
            </svg>
          </div>
        )}
        <button className="thumbnail-gym__favourite-button is-active">
          <span className="visually-hidden">Удалить из Избранного</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-heart-filled"></use>
          </svg>
        </button>
        <div className="thumbnail-gym__header">
          <h2 className="thumbnail-gym__title">{title}</h2>
          <div className="thumbnail-gym__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-gym__location-address">
              {location}
            </address>
          </div>
        </div>
        <div className="thumbnail-gym__text-wrapper">
          <p className="thumbnail-gym__text">
            {description}
          </p>
        </div>
        <div className="thumbnail-gym__buttons-wrapper">
          <Link className="btn btn--small thumbnail-gym__button" to="#">
            Подробнее
          </Link>
        </div>
      </div>
    </li>
  );
}

export default GymItem;
