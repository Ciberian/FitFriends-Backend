import { IClient } from '@fit-friends/shared-types';
import { Link } from 'react-router-dom';

type LookForCompanyItemProps = {
  user: IClient;
};

function LookForCompanyItem({ user }: LookForCompanyItemProps): JSX.Element {
  const { avatar, name, location, trainingType } = user;

  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
            <img
              src={`img/content/thumbnails/${avatar}`}
              width="82"
              height="82"
              alt=""
            />
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">
              {location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag">
              <span>#{trainingType}</span>
            </div>
          </li>
        </ul>
        <Link
          className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
          to="#"
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default LookForCompanyItem;
