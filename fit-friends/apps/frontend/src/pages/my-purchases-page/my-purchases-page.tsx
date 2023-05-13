import { useState } from 'react';
import SiteHeader from '../../components/site-header/site-header';
import MyTrainingsList from '../../components/my-trainings-list/my-trainings-list';
import GymsList from '../../components/gyms-list/gyms-list';

function MyPurchasesPage(): JSX.Element {
  const [isTrainingListOn, setTrainingListOn] = useState(true);

  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button className="btn-flat my-purchases__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div
                    className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                    data-validate-type="checkbox"
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        Только активные
                      </span>
                    </label>
                  </div>
                  <div className="btn-radio-sort">
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        checked={!isTrainingListOn}
                        onChange={() => setTrainingListOn(!isTrainingListOn)}
                      />
                      <span className="btn-radio-sort__label">Абонементы</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sort"
                        checked={isTrainingListOn}
                        onChange={() => setTrainingListOn(!isTrainingListOn)}
                      />
                      <span className="btn-radio-sort__label">Тренировки</span>
                    </label>
                  </div>
                </div>
              </div>
              {isTrainingListOn ? (
                <MyTrainingsList trainings={[]} />
              ) : (
                <GymsList gyms={[]} />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyPurchasesPage;
