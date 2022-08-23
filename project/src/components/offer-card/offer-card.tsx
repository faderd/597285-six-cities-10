import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';

type OfferCardProps = {
  offer: Offer;
  onMouseOver?: () => void;
  articleClassName: string,
  imageWrapperClassName: string,
  imageWidth: string,
  imageHeight: string,
  cardInfoClassName: string,
};

function OfferCard({ offer, onMouseOver, articleClassName, imageWrapperClassName, imageWidth, imageHeight, cardInfoClassName }: OfferCardProps): JSX.Element {

  return (
    <article className={`${articleClassName} place-card`} onMouseOver={onMouseOver} >
      {
        offer.isPremium && (<div className="place-card__mark"><span>Premium</span></div>)
      }

      <div className={`${imageWrapperClassName} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Room, { id: `${offer.id}` })}>
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place" />
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            offer={offer}
            className="place-card__bookmark-button"
            iconWidth={18}
            iconHeight={19}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room, { id: `${offer.id}` })}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
