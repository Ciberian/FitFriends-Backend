import { IClient, ITrainer } from '@fit-friends/shared-types';
import FriendClientItem from '../friend-client-item/friend-client-item';
import FriendTrainerItem from '../friend-trainer-item/friend-trainer-item';

type FriendsListProp = {
  clients: (IClient & { id: string })[];
  trainers?: (ITrainer & { id: string })[];
  isForClientPage?: boolean;
};

function FriendsList({ clients, trainers, isForClientPage }: FriendsListProp): JSX.Element {
  return (
    <>
      <div className="friends-list__title-wrapper">
        <h1 className="friends-list__title">Мои друзья</h1>
      </div>
      <ul className="friends-list__list">
        {clients.map((client) => (
          <FriendClientItem
            client={client}
            key={client.id}
            isForClientPage={!!isForClientPage}
          />
        ))}
        {trainers
          ? trainers.map((trainer) => (
              <FriendTrainerItem
                trainer={trainer}
                key={trainer.id}
                isForClientPage={!!isForClientPage}
              />
            ))
          : null}
      </ul>
      <div className="show-more friends-list__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
        >
          Вернуться в начало
        </button>
      </div>
    </>
  );
}

export default FriendsList;
