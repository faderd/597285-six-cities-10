import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { isCheckedAuth } from '../../utils/common';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
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
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen />
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
  );
}

export default App;
