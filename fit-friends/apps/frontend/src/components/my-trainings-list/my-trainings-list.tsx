import { ITraining } from '@fit-friends/shared-types';
import MyTrainingItem from '../my-training-item/my-training-item';

type MyTrainingsListProps = {
  trainings: ITraining[];
};

function MyTrainingsList({ trainings }: MyTrainingsListProps): JSX.Element {
  return (
    <div className="my-trainings">
      <ul className="my-trainings__list">
        {trainings.map((training) => (
          <MyTrainingItem training={training} key={training.id} />
        ))}
      </ul>
      <div className="show-more my-trainings__show-more">
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

export default MyTrainingsList;
