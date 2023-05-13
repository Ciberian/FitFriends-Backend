import { Link } from 'react-router-dom';
import SiteHeader from '../../components/site-header/site-header';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <SiteHeader />
      <main className="not-found-main">
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <section className="favorites favorites--empty">
                <div className="cities__status-wrapper">
                  <h1>404 Error</h1>
                  <b className="favorites__status">This page does not exist.</b>
                  <p className="favorites__status-description not-found-description">
                    Would you like to back on the{' '}
                    <Link className='not-found-description' to={'/'}>main page</Link>?
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
