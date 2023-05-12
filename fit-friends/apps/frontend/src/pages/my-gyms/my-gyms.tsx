import GymsList from '../../components/gyms-list/gyms-list';
import SiteHeader from '../../components/site-header/site-header';

function MyGyms(): JSX.Element {
  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <section className="my-gyms">
          <div className="container">
            <div className="my-gyms__wrapper">
              <button className="btn-flat my-gyms__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-gyms__title-wrapper">
                <h1 className="my-gyms__title">Мои залы</h1>
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement" /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">Только рядом</span>
                  </label>
                </div>
              </div>
              <GymsList gyms={[]} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyGyms;
