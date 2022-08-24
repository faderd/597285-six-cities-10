import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferReviews } from '../../store/api-actions';
import { storeReviews } from '../../store/app-data/app-data';
import { getReviewsCount, getSortedReviews } from '../../store/app-data/selectors';
import ReviewItem from '../review-item/review-item';

type ReviewProps = {
  offerId: string,
};

function Reviews({ offerId }: ReviewProps): JSX.Element {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(getSortedReviews);
  const reviewsCount = useAppSelector(getReviewsCount);

  useEffect(() => {
    dispatch(fetchOfferReviews(offerId));

    return () => {
      // очистим store при размонтировании компонента
      dispatch(storeReviews([]));
    };
  }, [dispatch, offerId]);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>

      <ul className="reviews__list">
        {
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        }
      </ul>
    </>
  );
}

export default memo(Reviews);
