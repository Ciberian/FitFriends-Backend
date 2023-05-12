import { useState } from 'react';

type PopupCertificatesProps = {
  certificates: string[];
  trainerName: string;
};

function PopupCertificates({ certificates, trainerName }: PopupCertificatesProps): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNextSlideBtn = () => {
    if (currentSlide === certificates.length) {
      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  const handlePrevSlideBtn = () => {
    if (currentSlide === 1) {
      return;
    }

    setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="wrapper">
      <main>
        <div className="popup-form popup-form--feedback">
          <section className="popup">
            <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Сертификаты</h2>
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
              <div className="popup__content popup__content--certificates">
                <div className="popup__slider-buttons">
                  <button
                    className="btn-icon popup__slider-btn popup__slider-btn--prev"
                    type="button"
                    aria-label="prev"
                    onClick={handlePrevSlideBtn}
                  >
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                  </button>
                  <button
                    className="btn-icon popup__slider-btn popup__slider-btn--next"
                    type="button"
                    aria-label="next"
                    onClick={handleNextSlideBtn}
                  >
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
                <ul className="popup__slider-list">
                  {certificates.map((certificate, index) => (
                    <li
                      className={`popup__slide ${
                        index + 1 === currentSlide
                          ? 'popup__slide--current'
                          : ''
                      }`}
                    >
                      <div className="popup__slide-img">
                        <img
                          src={certificate}
                          width="294"
                          height="360"
                          alt={`Сертификат №${index + 1} выданный ${trainerName}, за особые заслуги в спорте.`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PopupCertificates;
