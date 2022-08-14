import { City } from './types/offer';
import leaflet from 'leaflet';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_LEVELS = ['terribly', 'badly', 'not bad', 'good', 'perfect'];

export enum MapStartLocation {
  latitude = 52.37454,
  longitude = 4.897976,
  zoom = 12,
}

export const LOCATIONS = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  }, {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    }
  }, {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    }
  }, {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    }
  }, {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    }
  }, {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    }
  },
];

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/offer/:id',
  NearbyOffers = '/hotels/:hotelId/nearby',
  Reviews = '/comments/:hotelId',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const DEFAULT_CITY: City = LOCATIONS.find((location) => location.name === 'Paris') || LOCATIONS[0];

export const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '../img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
