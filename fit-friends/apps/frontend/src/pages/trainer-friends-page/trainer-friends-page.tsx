import SiteHeader from '../../components/site-header/site-header'
import TrainerFriendsList from '../../components/trainer-friends-list/trainer-friends-list';

function TrainerFriendsPage(): JSX.Element {
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
              <TrainerFriendsList friends={[]}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TrainerFriendsPage;
