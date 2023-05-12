import { IClient, ITrainer } from '@fit-friends/shared-types';
import UserItem from '../user-item/user-item';

type UsersCatalogListProp = {
  users: ((IClient & { id: string }) | (ITrainer & { id: string }))[];
};

function UsersCatalogList({ users }: UsersCatalogListProp): JSX.Element {
  return (
    <div className="users-catalog">
      <ul className="users-catalog__list">
        {users.map((user) => <UserItem user={user} key={user.id} /> )}
      </ul>
      <div className="show-more users-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </div>
  );
}

export default UsersCatalogList;
