import { ITraining } from '@fit-friends/shared-types';


const DISCOUNT_RATE = 0.8;

type SpecialTrainingProps = {
  specialTraining: ITraining;
  isActive: boolean;
  setActiveSlide: (activeSlideNumber: number) => void;
};

function SpecialTraining({
  specialTraining,
  isActive,
  setActiveSlide,
}: SpecialTrainingProps): JSX.Element {
  const { title, image, price } = specialTraining;

  return (
    <li className={`special-offers__item ${isActive ? 'is-active' : ''}`}>
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img
            src={`img/content/${image}.png`}
            srcSet={`img/content/${image}@2x.png 2x`}
            width="1040"
            height="469"
            alt="promo"
          />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">
          Горячие предложения на тренировки на {title}
        </span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            <button
              className={`${isActive ? 'promo-slider__slider-dot--active' : ''} promo-slider__slider-dot`}
              aria-label="первый слайд"
              onClick={() => setActiveSlide(1)}
            ></button>
            <button
              className={`${isActive ? 'promo-slider__slider-dot--active' : ''} promo-slider__slider-dot`}
              aria-label="второй слайд"
              onClick={() => setActiveSlide(2)}
            ></button>
            <button
              className={`${isActive ? 'promo-slider__slider-dot--active' : ''} promo-slider__slider-dot`}
              aria-label="третий слайд"
              onClick={() => setActiveSlide(3)}
            ></button>
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">
              {price ? Math.floor(price * DISCOUNT_RATE) : 0} ₽
            </p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{price} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default SpecialTraining;
