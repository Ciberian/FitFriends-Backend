import MyOrdersList from '../../components/my-orders-list/my-orders-list';
import SiteHeader from '../../components/site-header/site-header';

function MyOrdersPage(): JSX.Element {
  return (
    <div className="wrapper">
      <SiteHeader />
      <main>
        <section className="my-orders">
          <div className="container">
            <MyOrdersList orders={[]}/>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyOrdersPage;
