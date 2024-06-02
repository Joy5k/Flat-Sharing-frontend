import { USER_ROLE } from '@/contants/role';
import { DrawerItem, UserRole } from '@/types';

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestPageIcon from '@mui/icons-material/RequestPage';
export const drawerItems = (role: UserRole): DrawerItem[] => {
   const roleMenus: DrawerItem[] = [];
const defaultMenus = [
  {
    title: 'Profile',
    icon: PersonIcon,
    children: [
      {
        title: 'Edit Profile',
        path: `profile`,
        icon: PersonIcon,
      },
      {
        title: 'Manage Flat Posts',
        path: `${role}/profile/flatPosts`,
        icon: PostAddIcon,
      },
      {
        title: 'Flat Requests',
        path: `${role}/profile/flatRequests`,
        icon: RequestPageIcon,
      },
      {
        title: 'Change Password',
        path: `${role}/profile/change-password`,
        icon: KeyIcon,
      },
    ],
  },
];

   switch (role) {
      case USER_ROLE.ADMIN:
         roleMenus.push(
            {
               title: 'Dashboard',
               path: `${role}`,
               icon: DashboardIcon,
            },
            {
               title: 'Manage Users',
               path: `${role}/manageUsers`,
               icon: GroupIcon,
           },
            {
              title: 'Flat Post',
              path: `${role}/flatPost`,
              icon: PostAddIcon,
           },
         );
         break;

     

      case USER_ROLE.USER:
         roleMenus.push(
            {
               title: 'Flat Post',
               path: `${role}/flatPost`,
               icon: PostAddIcon,
            },
            {
               title: 'Flat Share Requests',
               path: `${role}/flatRequests`,
               icon: RequestPageIcon,
            },
         );
         break;

      default:
         break;
   }

   return [...roleMenus, ...defaultMenus];
};
