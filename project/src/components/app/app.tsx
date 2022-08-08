import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { favorites } from '../../mocks/favorites';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import { getIsDataLoadedStatus } from '../../store/app-data/selectors';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoadedStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />

        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />

        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen offers={favorites} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Room}
          element={<PropertyScreen />}
        />

        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
