import React, { ChangeEvent, useState, FormEvent } from 'react';
import { RATING_LEVELS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { pushReview } from '../../store/api-actions';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [commentFormState, setCommentFormState] = useState('');
  const [ratingFormState, setRatingFormState] = useState(0);

  const ratingChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setRatingFormState(() => +target.value);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (commentFormState && ratingFormState) {
        dispatch(pushReview({ offerId, review: { comment: commentFormState, 'rating': ratingFormState } }));
        setCommentFormState('');
        setRatingFormState(0);
      }
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {Array.from({ length: 5 }).map((_, index, arr) => {
          const value = arr.length - index;
          return (
            <React.Fragment key={value}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={`${value}`}
                id={`${value}-stars`}
                type="radio"
                onChange={ratingChangeHandler}
                checked={ratingFormState === value}
              />
              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={`${RATING_LEVELS[value - 1]}`}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>);
        })}

      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentFormState}
        onInput={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setCommentFormState(() => target.value);
        }}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
