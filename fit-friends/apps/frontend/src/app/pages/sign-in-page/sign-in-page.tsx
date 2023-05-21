import { useAppDispatch, useAppSelector } from 'apps/frontend/src/hooks';
import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import { loginAction } from 'apps/frontend/src/store/api-actions';
import { getAuthorizationStatus, getUserInfo } from 'apps/frontend/src/store/user-process/selectors';
import { AuthData } from 'apps/frontend/src/types/state';
import { UserRole } from '@fit-friends/shared-types';

function SignInPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector(getUserInfo);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(user?.role === UserRole.Client ? AppRoute.Root : AppRoute.TrainerPersonalAccount);
    }
  }, [authorizationStatus, navigate]);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
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
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form
                  action="#"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            ref={loginRef}
                            type="email"
                            name="email"
                            required
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            required
                          />
                        </span>
                      </label>
                    </div>
                    <button className="btn sign-in__button" type="submit">
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

export default SignInPage;
