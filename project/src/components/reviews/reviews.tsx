import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getReviewsCount, getSortedReviews } from '../../store/app-data/selectors';
import ReviewItem from '../review-item/review-item';

function Reviews(): JSX.Element {

  const reviews = useAppSelector(getSortedReviews);
  const reviewsCount = useAppSelector(getReviewsCount);

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
