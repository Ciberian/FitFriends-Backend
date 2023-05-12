import { ITraining } from '@fit-friends/shared-types';
import TrainingItem from '../training-item/training-item';

type MyTrainingCatalogProps = {
  trainings: ITraining[];
};

function TrainingCatalog({ trainings }: MyTrainingCatalogProps): JSX.Element {
  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {trainings.map((training) => (
          <TrainingItem training={training} key={training.id} />
        ))}
      </ul>
      <div className="show-more training-catalog__show-more">
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
        >
          Показать еще
        </button>
        <button
          className="btn show-more__button show-more__button--to-top"
          type="button"
        >
          Вернуться в начало
        </button>
      </div>
    </div>
  );
}

export default TrainingCatalog;
