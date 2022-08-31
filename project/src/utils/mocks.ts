import { internet, name } from 'faker';
import { GroupedFavoritesOffers, Offers } from '../types/offer';

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
  description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
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
