import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';

function SignUpPage(): JSX.Element {
  const avatarPreview = useRef<null | HTMLImageElement>(null);
  const [location, setLocation] = useState('Пионерская');
  const [locationsListVisibility, setLocationsListVisibility] = useState(false);
  const [avatarPreviewSrc, setAvatarPreviewSrc] = useState('');
  const navigate = useNavigate();

  const handleSelectLocation = () => {
    setLocationsListVisibility((prev) => !prev);
  };

  const handleUploadAvatar = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const avatarImg = (evt.target.files as FileList)[0];
    const avatarSrc = URL.createObjectURL(avatarImg);

    setAvatarPreviewSrc(avatarSrc);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    formData.append('location', location);

    const data: { [K in string]: unknown } = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    if (formData.get('role') === 'client') {
      navigate(AppRoute.QuestionnaireClient, { state: { firstForm: data } });
    } else {
      navigate(AppRoute.QuestionnaireTrainer, { state: { firstForm: data } });
    }
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input
                            onChange={handleUploadAvatar}
                            className="visually-hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="avatar"
                            required
                          />
                          <span className="input-load-avatar__btn">
                            {avatarPreviewSrc ? (
                              <img
                                ref={avatarPreview}
                                src={avatarPreviewSrc}
                                alt="User avatar preview"
                                width={98}
                                height={98}
                                style={{
                                  borderRadius: '50%',
                                  width: 'auto',
                                  height: '100%',
                                  backgroundSize: 'cover',
                                }}
                              />
                            ) : (
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg>
                            )}
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">
                          Загрузите фото профиля
                        </h2>
                        <span className="sign-up__text">
                          JPG, PNG, оптимальный размер 100&times;100&nbsp;px
                        </span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input type="text" name="name" required />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input type="email" name="email" required />
                          </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">
                            Дата рождения
                          </span>
                          <span className="custom-input__wrapper">
                            <input
                              type="date"
                              name="birthDate"
                              max="2099-12-31"
                              required
                            />
                          </span>
                        </label>
                      </div>
                      <div className="custom-select custom-select--not-selected">
                        <span className="custom-select__label">
                          Ваша локация
                        </span>
                        <button
                          className="custom-select__button"
                          type="button"
                          aria-label="Выберите одну из опций"
                          onClick={handleSelectLocation}
                        >
                          <span>{location}</span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-down"></use>
                            </svg>
                          </span>
                        </button>
                        <ul
                          className={` ${
                            locationsListVisibility
                              ? 'custom-select__list--active'
                              : 'custom-select__list'
                          }`}
                          role="listbox"
                          style={{ listStyle: 'none' }}
                        >
                          <li
                            className="custom-select__item"
                            onClick={() => setLocation('Пионерская')}
                          >
                            ст. м. Пионерская
                          </li>
                          <li
                            className="custom-select__item"
                            onClick={() => setLocation('Петроградская')}
                          >
                            ст. м. Петроградская
                          </li>
                          <li
                            className="custom-select__item"
                            onClick={() => setLocation('Удельная')}
                          >
                            ст. м. Удельная
                          </li>
                          <li
                            className="custom-select__item"
                            onClick={() => setLocation('Звёздная')}
                          >
                            ст. м. Звёздная
                          </li>
                          <li
                            className="custom-select__item"
                            onClick={() => setLocation('Спортивная')}
                          >
                            ст. м. Спортивная
                          </li>
                        </ul>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="password"
                              name="password"
                              autoComplete="off"
                              required
                            />
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__radio">
                        <span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="sex" value="male" />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Мужской
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                value="female"
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Женский
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="sex"
                                value="irrelevant"
                                defaultChecked
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Неважно
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value="trainer"
                              defaultChecked
                            />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              Я хочу тренировать
                            </span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input
                              className="visually-hidden"
                              type="radio"
                              name="role"
                              value="client"
                            />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-weight"></use>
                              </svg>
                            </span>
                            <span className="role-btn__btn">
                              Я хочу тренироваться
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="user-agreement"
                          name="user-agreement"
                          required
                        />
                        <span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="sign-up__checkbox-label">
                          Я соглашаюсь с{' '}
                          <span>политикой конфиденциальности</span> компании
                        </span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit">
                      Продолжить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
