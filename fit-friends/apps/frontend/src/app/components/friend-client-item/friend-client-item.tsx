import { ResponseValue } from '../../utils/constants';
import { IClient } from '../../../../../../libs/shared-types/src/lib/client.interface';
import { UserGender } from '../../../../../../libs/shared-types/src/lib/enums/user-gender.enum';
import RequestTraining from '../request-training/request-training';
import RequestFriendship from '../request-friendship/request-friendship';
import RequestTrainingResponse from '../request-training-response/request-training-response';

type FriendClientItemProps = {
  client: IClient & { id: string };
  isForClientPage: boolean;
};

function FriendClientItem({ client, isForClientPage }: FriendClientItemProps): JSX.Element {
  const { id, name, gender, location, avatar, trainingType, readyToTraining } = client;

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <img src={avatar} width="78" height="78" alt="avatar" />
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
              {readyToTraining ? (
                <span>
                  {gender === UserGender.Male ? 'Готов' : 'Готова'}{' '}
                  к&nbsp;тренировке
                </span>
              ) : (
                <span>
                  Не {gender === UserGender.Male ? 'готов' : 'готова'}{' '}
                  к&nbsp;тренировке
                </span>
              )}
            </div>
            {isForClientPage && (
              <button className="thumbnail-friend__invite-button" type="button" disabled={!readyToTraining}>
                <svg
                  width="43"
                  height="46"
                  aria-hidden="true"
                  focusable="false"
                >
                  <use xlinkHref="#icon-invite"></use>
                </svg>
                <span className="visually-hidden">
                  Пригласить друга на совместную тренировку
                </span>
              </button>
            )}
          </div>
        </div>
        {id.split('-').includes('reqFriendship') && <RequestFriendship />}
        {id.split('-').includes('getReqTraining') && <RequestTraining />}
        {id.split('-').includes('sentReqTraining') && <RequestTrainingResponse response={ResponseValue.Sent} />}
        {id.split('-').includes('accTraining') && <RequestTrainingResponse response={ResponseValue.Accepted} />}
        {id.split('-').includes('rejTraining') && <RequestTrainingResponse response={ResponseValue.Rejected} />}
      </div>
    </li>
  );
}

export default FriendClientItem;
