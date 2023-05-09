import { IClient, UserGender } from '@fit-friends/shared-types';

type TrainerFriendItemProps = {
  friend: IClient & { id: string };
};

function TrainerFriendItem({ friend }: TrainerFriendItemProps): JSX.Element {
  const { id, name, gender, location, avatar, trainingType, readyToTraining } = friend;

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <img
                src={avatar}
                width="78"
                height="78"
                alt="avatar"
              />
              <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">
                {location}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>#{trainingType}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
              { readyToTraining ?
                <span>{gender === UserGender.Male ? 'Готов' : 'Готова'} к&nbsp;тренировке</span> :
                <span>Не {gender === UserGender.Male ? 'готов' : 'готова'} к&nbsp;тренировке</span>
              }
            </div>
          </div>
        </div>
        { id.split('-').includes('reqFriendship') &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              Запрос на&nbsp;персональную тренировку
            </p>
            <div className="thumbnail-friend__button-wrapper">
              <button
                className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                type="button"
              >
                Принять
              </button>
              <button
                className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                type="button"
              >
                Отклонить
              </button>
            </div>
          </div>
        }
      </div>
    </li>
  );
}

export default TrainerFriendItem;
