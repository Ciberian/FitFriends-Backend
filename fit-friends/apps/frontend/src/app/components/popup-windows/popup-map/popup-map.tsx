import { CITY } from '../../../utils/constants';
import Map from '../../map/map';

type PopupMapProps = {
  name: string;
  address: string;
  isGymLocation: boolean;
  setPopupVisible: () => void;
}

function PopupMap({name, address, isGymLocation, setPopupVisible}: PopupMapProps): JSX.Element {
  return (
    <div className="wrapper">
      <main>
        <div className="popup-form popup-form--map">
          <section className="popup">
            <div className="popup__wrapper popup__wrapper--map">
              <div className="popup-head popup-head--address">
                <h2 className="popup-head__header">{name}</h2>
                <p className="popup-head__address">
                  <svg
                    className="popup-head__icon-location"
                    width="12"
                    height="14"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <span>{address}</span>
                </p>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                  onClick={setPopupVisible}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content-map">
                <div className="popup__map">
                  <Map city={CITY} isGymLocation={isGymLocation} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PopupMap;
