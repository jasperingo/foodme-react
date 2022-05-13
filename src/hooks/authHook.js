import { useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';

export function useAuthRedirectURL(defaultRedirect) {
  const location = useLocation();
  return useMemo(function() {
    return new URLSearchParams(location.search).get('redirect_to') ?? defaultRedirect;
  }, [location, defaultRedirect]);
}

export function useAuthMiddleware(user) {

  const location = useLocation();

  return function() {
    return user !== null ? null : <Redirect to={`/login?redirect_to=${encodeURIComponent(location.pathname)}`} />
  }
}

export function useGuestMiddleware(user, defaultRedirect) {

  const redirectTo = useAuthRedirectURL(defaultRedirect);

  return function() {
    return user === null ? null : <Redirect to={redirectTo} />
  }
}
