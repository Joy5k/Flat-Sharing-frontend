'use client';
import DashboardDrawer from '@/components/Dashboard/DashboardDrawer/DashboardDrawer';
import { getAccessToken } from '@/utils/getTokenFromCookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const token=getAccessToken()
useEffect(() => {
   if (!token) {
      router.push('/login');
   }
}, [token,router]);
   return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
