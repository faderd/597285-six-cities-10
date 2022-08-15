import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { isUserAuthorized } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {

  return (
    useAppSelector(isUserAuthorized)
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
