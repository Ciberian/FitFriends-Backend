import { IGym } from '@fit-friends/shared-types';
import GymItem from '../gym-item/gym-item';

type GymsListProps = {
  gyms: IGym[];
  isForCatalogPage?: boolean;
}

function GymsList({ gyms, isForCatalogPage }: GymsListProps): JSX.Element {
  return (
    <>
      <ul className={`${isForCatalogPage ? 'gyms-catalog__list' : 'my-gyms__list'}`}>
        {gyms.map(gym => <GymItem gym={gym} isForCatalogPage={!!isForCatalogPage} />)}
      </ul>
      <div className={`${isForCatalogPage ? 'gyms-catalog__show-more' : 'my-gyms__show-more'} show-more`}>
        <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
        <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
      </div>
    </>
  );
}

export default GymsList;
