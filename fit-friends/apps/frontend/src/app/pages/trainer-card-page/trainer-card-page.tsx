import SiteHeader from '../../components/site-header/site-header';
import PopularTraining from '../../components/popular-training/popular-training';
import { useEffect, useRef, useState } from 'react';
import PopupMap from '../../components/popup-windows/popup-map/popup-map';

function TrainerCardPage(): JSX.Element {
  const isFirstRun = useRef(true);
  const [isVisibleMapPopup, setVisibleMapPopup] = useState(false);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const onKeyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        setVisibleMapPopup((prevState) => !prevState);
      }
    };

    document.addEventListener('keydown', onKeyDownEsc);

    return () => {
      document.removeEventListener('keydown', onKeyDownEsc);
    };
  }, [isVisibleMapPopup]);

  const setMapPopupVisible = () => {
    setVisibleMapPopup((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">
                    Карточка пользователя роль тренер
                  </h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">Валерия</h2>
                        </div>
                        <div className="user-card-coach__label">
                          <svg
                            className="user-card-coach__icon-location"
                            width="12"
                            height="14"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <span>Адмиралтейская</span>
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg
                              className="user-card-coach__icon-cup"
                              width="12"
                              height="13"
                              aria-hidden="true"
                            >
                              <use xlinkHref="#icon-cup"></use>
                            </svg>
                            <span>Тренер</span>
                          </div>
                          <div className="user-card-coach__status user-card-coach__status--check">
                            <span>Готов тренировать</span>
                          </div>
                          {/* <div className="user-card-coach-2__status user-card-coach-2__status--check">
                            <span>Не готов тренировать</span>
                          </div> */}
                        </div>
                        <div className="user-card-coach__text">
                          <p>
                            Привет! Меня зовут Иванова Валерия, мне 34 года.
                            Я&nbsp;профессиональный тренер по&nbsp;боксу.
                            Не&nbsp;боюсь пробовать новое, также увлекаюсь
                            кроссфитом, йогой и&nbsp;силовыми тренировками.
                          </p>
                          <p>
                            Провожу как индивидуальные тренировки, так
                            и&nbsp;групповые занятия. Помогу вам достигнуть
                            своей цели и&nbsp;сделать это с&nbsp;удовольствием!
                          </p>
                        </div>
                        <button
                          className="btn-flat user-card-coach__sertificate"
                          type="button"
                        >
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg>
                          <span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          <li className="user-card-coach__hashtag-item">
                            <div className="hashtag">
                              <span>#бокс</span>
                            </div>
                          </li>
                          <li className="user-card-coach__hashtag-item">
                            <div className="hashtag">
                              <span>#кроссфит</span>
                            </div>
                          </li>
                          <li className="user-card-coach__hashtag-item">
                            <div className="hashtag">
                              <span>#силовые</span>
                            </div>
                          </li>
                          <li className="user-card-coach__hashtag-item">
                            <div className="hashtag">
                              <span>#йога</span>
                            </div>
                          </li>
                        </ul>
                        <button
                          className="btn user-card-coach__btn"
                          type="button"
                        >
                          Добавить в друзья
                        </button>
                        {/* <button className="btn btn--outlined user-card-coach-2__btn" type="button">Удалить из друзей</button> */}
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img
                              src="img/content/user-coach-photo1.jpg"
                              srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                              width="334"
                              height="573"
                              alt="photo1"
                            />
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img
                              src="img/content/user-coach-photo2.jpg"
                              srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                              width="334"
                              height="573"
                              alt="photo2"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">
                          Тренировки
                        </h2>
                        <div className="user-card-coach__training-bts">
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button"
                            aria-label="back"
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button"
                            aria-label="next"
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        {[].map((training) => (
                          <PopularTraining
                            popularTraining={training}
                            key={training}
                          /> /*<- training.id*/
                        ))}
                      </ul>
                      <form className="user-card-coach__training-form">
                        {/* <button
                          className="btn user-card-coach__btn-training"
                          type="button"
                        >
                          Хочу персональную тренировку
                        </button> */}
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
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
                                Получать уведомление на почту о новой тренировке
                              </span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isVisibleMapPopup && (
        <PopupMap name="" address="" isGymLocation={false} setPopupVisible={setMapPopupVisible} />
      )}
    </div>
  );
}

export default TrainerCardPage;
