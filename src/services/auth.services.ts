import { authKey } from "@/contants/authkey";
import { getAccessToken } from "@/utils/getTokenFromCookie";
// import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import { instance as axiosInstance } from "../helpers/axios/axiosInstance";

import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};
export const setRefreshToken = ({ refreshToken }: { refreshToken: string }) => {
  return setToLocalStorage('refreshToken', refreshToken);

}
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role,
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getAccessToken();
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

// there is update your access token if that was invalidated

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: "https://spare-room-backend.vercel.app/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
