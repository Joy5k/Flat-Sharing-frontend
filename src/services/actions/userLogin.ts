import { FieldValues } from 'react-hook-form';
import setAccessToken from './setAccessToken';

export const userLogin = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error('Failed to login. Please try again.');
    }

    const userInfo = await res.json();
     const { accessToken, needPasswordChange } = userInfo.data;
     
     if (accessToken) {
      setAccessToken(userInfo.data.accessToken, {
         redirect: '/dashboard',
         needPasswordChange,
      });
   }
    return userInfo;
  } catch (error:any) {
    console.error('Login error:', error);
    return { error: error.message }; 
  }
};
