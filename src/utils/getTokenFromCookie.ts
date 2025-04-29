import Cookies from 'js-cookie';

export function getAccessToken() {
  const  accessToken = Cookies.get('accessToken');
  return accessToken;
}
export function getRefreshToken() {
  const refreshToken = Cookies.get('refreshToken');
  return refreshToken;
}