import { IClient } from '../../../../../../libs/shared-types/src/lib/client.interface';
import { ITrainer } from '../../../../../../libs/shared-types/src/lib/trainer.interface';
import { UserRole } from '../../../../../../libs/shared-types/src/lib/enums/user-role.enum';
import { Link } from 'react-router-dom';

type UserItemProp = {
  user: (IClient & { id: string }) | (ITrainer & { id: string });
};

function UserItem({ user }: UserItemProp): JSX.Element {
  const { name, location, trainingType, avatar, role } = user;

  return (
    <li className="users-catalog__item">
      <div className={`thumbnail-user thumbnail-user--role-${role === UserRole.Client ? 'user' : 'coach'}`}>
        <div className="thumbnail-user__image">
          <img src={avatar} width="78" height="78" alt="avatar" />
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
        <Link className="btn btn--medium thumbnail-user__button" to="#">
          Подробнее
        </Link>
      </div>
    </li>
  );
}

export default UserItem;
