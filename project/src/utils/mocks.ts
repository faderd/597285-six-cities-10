import { internet, name } from 'faker';
import { NUMBER_OF_REVIEWS } from '../const';
import { GroupedFavoritesOffers, Offers } from '../types/offer';
import { Review, Reviews } from '../types/review';

export const makeFakeOffers = (): Offers => ([{
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  previewImage: 'https://10.react.pages.academy/static/hotel/19.jpg',
  images: [
    'https://10.react.pages.academy/static/hotel/3.jpg',
    'https://10.react.pages.academy/static/hotel/2.jpg',
    'https://10.react.pages.academy/static/hotel/15.jpg',
    'https://10.react.pages.academy/static/hotel/20.jpg',
    'https://10.react.pages.academy/static/hotel/9.jpg',
    'https://10.react.pages.academy/static/hotel/10.jpg',
    'https://10.react.pages.academy/static/hotel/13.jpg',
    'https://10.react.pages.academy/static/hotel/18.jpg',
    'https://10.react.pages.academy/static/hotel/7.jpg',
    'https://10.react.pages.academy/static/hotel/8.jpg',
    'https://10.react.pages.academy/static/hotel/16.jpg',
    'https://10.react.pages.academy/static/hotel/6.jpg',
    'https://10.react.pages.academy/static/hotel/11.jpg',
    'https://10.react.pages.academy/static/hotel/4.jpg'
  ],
  title: 'Fake offer title',
  isFavorite: false,
  isPremium: false,
  rating: 3.3,
  type: 'house',
  bedrooms: 2,
  maxAdults: 3,
  price: 654,
  goods: [
    'Breakfast',
    'Laptop friendly workspace'
  ],
  host: {
    id: 25,
    name: name.firstName(),
    isPro: true,
    avatarUrl: internet.avatar(),
  },
  description: 'Fake description.',
  location: {
    latitude: 48.843610000000005,
    longitude: 2.338499,
    zoom: 16
  },
  id: 2
}] as Offers);

export const makeFakeGroupedFavoritesOffers = (): GroupedFavoritesOffers => ([{
  city: {
    name: 'Paris',
  },
  offers: [{
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    previewImage: 'https://10.react.pages.academy/static/hotel/19.jpg',
    images: [
      'https://10.react.pages.academy/static/hotel/3.jpg',
      'https://10.react.pages.academy/static/hotel/2.jpg',
      'https://10.react.pages.academy/static/hotel/15.jpg',
      'https://10.react.pages.academy/static/hotel/20.jpg',
      'https://10.react.pages.academy/static/hotel/9.jpg',
      'https://10.react.pages.academy/static/hotel/10.jpg',
      'https://10.react.pages.academy/static/hotel/13.jpg',
      'https://10.react.pages.academy/static/hotel/18.jpg',
      'https://10.react.pages.academy/static/hotel/7.jpg',
      'https://10.react.pages.academy/static/hotel/8.jpg',
      'https://10.react.pages.academy/static/hotel/16.jpg',
      'https://10.react.pages.academy/static/hotel/6.jpg',
      'https://10.react.pages.academy/static/hotel/11.jpg',
      'https://10.react.pages.academy/static/hotel/4.jpg'
    ],
    title: name.title(),
    isFavorite: true,
    isPremium: false,
    rating: 3.3,
    type: 'house',
    bedrooms: 2,
    maxAdults: 3,
    price: 654,
    goods: [
      'Breakfast',
      'Laptop friendly workspace'
    ],
    host: {
      id: 25,
      name: name.firstName(),
      isPro: true,
      avatarUrl: internet.avatar(),
    },
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    location: {
      latitude: 48.843610000000005,
      longitude: 2.338499,
      zoom: 16
    },
    id: 2
  }],
}] as GroupedFavoritesOffers);

export const makeFakeReview = (): Review => (
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Wed Aug 31 2022 22:33:25 GMT+0300 (Москва, стандартное время)',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'img/1.png',
      'id': 1,
      'isPro': false,
      'name': 'Oliver.conner'
    }
  }
);

export const makeFakeReviews = (): Reviews => {
  const reviews: Reviews = [];
  for (let index = 0; index < NUMBER_OF_REVIEWS + 1; index++) {
    reviews.push(
      {
        'id': index + 1,
        'user': {
          'id': 18,
          'isPro': true,
          'name': 'Sophie',
          'avatarUrl': 'https://10.react.pages.academy/static/avatar/9.jpg'
        },
        'rating': 4,
        'comment': 'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
        'date': '2022-05-25T12:25:36.939Z'
      }
    );
  }
  return reviews;
};

export const makeFakeFavoriteOffers = (): Offers => ([{
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  previewImage: 'https://10.react.pages.academy/static/hotel/19.jpg',
  images: [
    'https://10.react.pages.academy/static/hotel/3.jpg',
    'https://10.react.pages.academy/static/hotel/2.jpg',
    'https://10.react.pages.academy/static/hotel/15.jpg',
    'https://10.react.pages.academy/static/hotel/20.jpg',
    'https://10.react.pages.academy/static/hotel/9.jpg',
    'https://10.react.pages.academy/static/hotel/10.jpg',
    'https://10.react.pages.academy/static/hotel/13.jpg',
    'https://10.react.pages.academy/static/hotel/18.jpg',
    'https://10.react.pages.academy/static/hotel/7.jpg',
    'https://10.react.pages.academy/static/hotel/8.jpg',
    'https://10.react.pages.academy/static/hotel/16.jpg',
    'https://10.react.pages.academy/static/hotel/6.jpg',
    'https://10.react.pages.academy/static/hotel/11.jpg',
    'https://10.react.pages.academy/static/hotel/4.jpg'
  ],
  title: 'Fake offer title',
  isFavorite: true,
  isPremium: false,
  rating: 3.3,
  type: 'house',
  bedrooms: 2,
  maxAdults: 3,
  price: 654,
  goods: [
    'Breakfast',
    'Laptop friendly workspace'
  ],
  host: {
    id: 25,
    name: name.firstName(),
    isPro: true,
    avatarUrl: internet.avatar(),
  },
  description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
  location: {
    latitude: 48.843610000000005,
    longitude: 2.338499,
    zoom: 16
  },
  id: 2
}] as Offers);
