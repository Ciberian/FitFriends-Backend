import FriendsList from '../../components/friends-list/friends-list';
import SiteHeader from '../../components/site-header/site-header';

function ClientFriendsPage(): JSX.Element {
  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <FriendsList clients={[]} trainers={[]} isForClientPage />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClientFriendsPage;
