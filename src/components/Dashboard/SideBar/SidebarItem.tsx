
import Link from 'next/link';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DrawerItem } from '@/types';

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: any) => {
  const linkPath = item.path ? `/dashboard/${item.path}` : undefined;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const isActive = (path: string) => pathname.startsWith(`/dashboard/${path}`);

  return (
    <>
      {linkPath ? (
        <Link href={linkPath}>
          <ListItem
            disablePadding
            sx={{
              mb: 1,
              ...(isActive(item.path)
                ? {
                    borderRight: '3px solid #1586FD',
                    '& svg': {
                      color: '#1586FD',
                    },
                  }
                : {}),
            }}
          >
            <ListItemButton onClick={item.children ? handleClick : undefined}>
              <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
              <ListItemText primary={item.title} />
              {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
        </Link>
      ) : (
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
            {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </ListItem>
      )}
      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child: DrawerItem, index: number) => (
              <SidebarItem key={index} item={child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
