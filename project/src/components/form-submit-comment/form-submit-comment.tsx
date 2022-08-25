import React, { ChangeEvent, useState, FormEvent } from 'react';
import { RATING_LEVELS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { submitReview } from '../../store/api-actions';

enum CommentLength {
  Min = 50,
  Max = 300,
}

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleRatingChange = ({ target }: ChangeEvent<HTMLInputElement>) => setRating(+target.value);

  const validate = (): boolean =>
    comment.length >= CommentLength.Min &&
    comment.length <= CommentLength.Max &&
    rating > 0;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (validate()) {
        setSubmitting(true);
        dispatch(submitReview({ offerId, review: { comment: comment, rating: rating } })).then((data) => {
          if (data.payload) {
            setComment('');
            setRating(0);
          }
          setSubmitting(false);
        });
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
                onChange={handleRatingChange}
                checked={rating === value}
                disabled={submitting}
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
        value={comment}
        onInput={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(target.value);
        }}
        minLength={CommentLength.Min}
        maxLength={CommentLength.Max}
        required
        disabled={submitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!validate()}>Submit</button>
      </div>
    </form >
  );
}

export default ReviewForm;
