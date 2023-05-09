import { useState } from 'react';
import LookForCompanyItem from '../look-for-company-item/look-for-company-item';
import { IClient } from '@fit-friends/shared-types';

const USERS_ON_PAGE = 4;

type LookForCompanyListProps = {
  users: (IClient & { id: string })[];
};

function LookForCompanyList({ users }: LookForCompanyListProps): JSX.Element {
  const usersCount = users.length;
  const usersForFirstSlide = users.slice(0, USERS_ON_PAGE + 1);
  const usersForSecondSlide = users.slice(USERS_ON_PAGE + 1);

  const [shownUsers, setShownUsers] = useState(usersForFirstSlide);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
                onClick={() => setShownUsers(usersForFirstSlide)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                disabled={usersCount <= USERS_ON_PAGE}
                onClick={() => setShownUsers(usersForSecondSlide)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {shownUsers.map((user) => (
              <LookForCompanyItem user={user} key={user.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompanyList;
