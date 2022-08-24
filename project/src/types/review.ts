export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
  };
};

export type Reviews = Review[];

export type SubmitReview = {
  offerId: string,
  review: {
    comment: string,
    rating: number,
  }
};
