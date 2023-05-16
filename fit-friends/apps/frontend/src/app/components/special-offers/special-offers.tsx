import { ITraining } from '@fit-friends/shared-types';
// import SpecialGym from '../special-gym/special-gym';
import SpecialTraining from '../special-training/special-training';
import { useState } from 'react';

type SpecialOffersProps = {
  specialTrainings: ITraining[];
}

function SpecialOffers({ specialTrainings }: SpecialOffersProps): JSX.Element {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {specialTrainings.map((specialTraining, index) => (
              <SpecialTraining
                specialTraining={specialTraining}
                isActive = {index === activeSlide}
                setActiveSlide={setActiveSlide}
              />
            ))}
          </ul>
          {/* <SpecialGym gym={}/> нет данных на данный момент */}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
