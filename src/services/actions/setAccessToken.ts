'use server';

import { cookies } from 'next/headers';

import { authKey } from '@/contants/authkey';
import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: any) => {
   console.log(token,"the setAccess token trying set in cookies")
   cookies().set(authKey, token);
   if (option && option.passwordChangeRequired) {
      // redirect('/dashboard/change-password');
   }
   if (option && !option.passwordChangeRequired && option.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;
