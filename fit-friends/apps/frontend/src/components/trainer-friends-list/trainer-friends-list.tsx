import { IClient } from '@fit-friends/shared-types';
import TrainerFriendItem from '../trainer-friend-item/trainer-friend-item';

type TrainerFriendsListProp = {
  friends: (IClient & { id: string })[]
}

function TrainerFriendsList({ friends }: TrainerFriendsListProp): JSX.Element {
  return (
    <>
      <div className="friends-list__title-wrapper">
        <h1 className="friends-list__title">Мои друзья</h1>
      </div>
      <ul className="friends-list__list">
        {friends.map((friend) => <TrainerFriendItem friend={friend} key={friend.id} />)}
      </ul>
      <div className="show-more friends-list__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </>
  );
}

export default TrainerFriendsList;
