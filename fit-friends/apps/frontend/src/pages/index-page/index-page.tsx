import LookForCompanyList from '../../components/look-for-company-list/look-for-company-list';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import SiteHeader from '../../components/site-header/site-header';
import SpecialForYouList from '../../components/special-for-you-list/special-for-you-list';
import SpecialOffers from '../../components/special-offers/special-offers';

function IndexPage(): JSX.Element {
  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYouList specialTrainings={[]} />
        <SpecialOffers specialTrainings={[]} />
        <PopularTrainings popularTrainings={[]} />
        <LookForCompanyList users={[]}/>
      </main>
    </div>
  );
}

export default IndexPage;
