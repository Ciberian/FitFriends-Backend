import { ITraining } from '@fit-friends/shared-types';
import SpecialForYouItem from '../special-for-you-item/special-for-you-item';

type SpecialForYouListProps = {
  specialTrainings: ITraining[];
};

function SpecialForYouList({ specialTrainings }: SpecialForYouListProps): JSX.Element {
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {specialTrainings.map((specialTraining) => (
              <SpecialForYouItem specialTraining={specialTraining} key={specialTraining.id} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYouList;
