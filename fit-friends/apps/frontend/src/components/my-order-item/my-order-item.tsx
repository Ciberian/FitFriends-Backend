import { IOrder } from '@fit-friends/shared-types';
import { Link } from 'react-router-dom';

type MyOrderItemProps = {
  order: IOrder;
};

function MyOrderItem({ order }: MyOrderItemProps): JSX.Element {
  const { quantity, totalPrice } = order;
  // по serviceId нужно будет из Редакса выдернуть тренировку с соот-щим id.

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp" srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x" /><img src="img/content/thumbnails/training-01.jpg" srcSet="img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">800</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">energy</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#320ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">4</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
          </div>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to="#">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg><span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{quantity}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{totalPrice}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MyOrderItem;
