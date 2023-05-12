import { ITraining } from '@fit-friends/shared-types';
import { useState } from 'react';

type PopupBuyProps = {
  training: ITraining;
};

function PopupBuy({ training }: PopupBuyProps): JSX.Element {
  const { image, title, price } = training;
  const [quantity, setQuantity] = useState(1);

  const handleMinusBtnClick = () => {
    if (quantity === 1) {
      return;
    }

    setQuantity(quantity - 1)
  }

  const handlePlusBtnClick = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="wrapper">
      <main>
        <div className="popup-form popup-form--buy">
          <section className="popup">
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Купить тренировку</h2>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content popup__content--purchases">
                <div className="popup__product">
                  <div className="popup__product-image">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`img/content/popup/popup-${image}.webp, img/content/popup/popup-${image}@2x.webp 2x`}
                      />
                      <img
                        src={`img/content/popup/popup-${image}.jpg`}
                        srcSet={`img/content/popup/popup-${image}@2x.jpg 2x`}
                        width="98"
                        height="80"
                        alt=""
                      />
                    </picture>
                  </div>
                  <div className="popup__product-info">
                    <h3 className="popup__product-title">{title}</h3>
                    <p className="popup__product-price">{price} ₽</p>
                  </div>
                  <div className="popup__product-quantity">
                    <p className="popup__quantity">Количество</p>
                    <div className="input-quantity">
                      <button
                        className="btn-icon btn-icon--quantity"
                        type="button"
                        aria-label="minus"
                        onClick={handleMinusBtnClick}
                      >
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-minus"></use>
                        </svg>
                      </button>
                      <div className="input-quantity__input">
                        <label>
                          <input type="text" value={quantity} size={2} readOnly />
                        </label>
                      </div>
                      <button
                        className="btn-icon btn-icon--quantity"
                        type="button"
                        aria-label="plus"
                        onClick={handlePlusBtnClick}
                      >
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-plus"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <section className="payment-method">
                  <h4 className="payment-method__title">
                    Выберите способ оплаты
                  </h4>
                  <ul className="payment-method__list">
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input
                            type="radio"
                            name="payment-purchases"
                            aria-label="Visa."
                            defaultChecked
                          />
                          <span className="btn-radio-image__image">
                            <svg width="58" height="20" aria-hidden="true">
                              <use xlinkHref="#visa-logo"></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input
                            type="radio"
                            name="payment-purchases"
                            aria-label="Мир."
                          />
                          <span className="btn-radio-image__image">
                            <svg width="66" height="20" aria-hidden="true">
                              <use xlinkHref="#mir-logo"></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input
                            type="radio"
                            name="payment-purchases"
                            aria-label="Iomoney."
                          />
                          <span className="btn-radio-image__image">
                            <svg width="106" height="24" aria-hidden="true">
                              <use xlinkHref="#iomoney-logo"></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <div className="popup__total">
                  <p className="popup__total-text">Итого</p>
                  <svg
                    className="popup__total-dash"
                    width="310"
                    height="2"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#dash-line"></use>
                  </svg>
                  <p className="popup__total-price">
                    {price ? (price * quantity) : 0} ₽
                  </p>
                </div>
                <div className="popup__button">
                  <button className="btn" type="button">
                    Купить
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PopupBuy;
