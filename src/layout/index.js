import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Drawer,
  Avatar,
  Typography,
  Stack,
  Rating,
  Button,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { useRouter } from 'next/router';

const drawerWidth = 300;

const data = [
  {
    name: 'My Ads',
    link: '/',
    icon: <ComputerOutlinedIcon />,
  },
  {
    name: 'My settings',
    link: '/settings',
    icon: <SettingsOutlinedIcon />,
  },
  {
    name: 'chat',
    link: '/chat',
    icon: <MessageOutlinedIcon />,
  },
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { pathname } = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(pathname, 'patham');
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            ml: 2,
            mt: 2,
            pb: 2,
            borderRadius: '12px',
            border: 'none',
            height: 'auto',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <Stack
          justifyContent='center'
          alignItems='center'
          spacing={0.2}
          sx={{
            pt: 4,
            px: 1,
          }}>
          <Box
            sx={{
              border: '2px solid #39CCF9',
              height: 64,
              width: 64,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '8px !important',
            }}>
            <Box
              sx={{
                height: 56,
                width: 56,
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden',
              }}>
              <Image
                alt='avatar'
                fill
                src='/avatar.jpeg'
              />
            </Box>
          </Box>
          <Typography
            variant='subtitle2'
            color='text.secondary'>
            John Doe
          </Typography>
        </Stack>
        <List
          sx={{
            px: 2,
            mt: 5,
          }}>
          {data.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                mb: 1,
              }}>
              <ListItemButton
                sx={
                  pathname === item.link
                    ? {
                        borderRadius: '12px',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.1),
                        ':before': {
                          content: "''",
                          position: 'absolute',
                          width: 5,
                          height: '100%',
                          right: 0,
                          bgcolor: 'primary.main',
                        },
                      }
                    : { borderRadius: '12px' }
                }>
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: pathname === item.link ? 'primary.main' : 'inherit',
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>{children}</Main>
    </Box>
  );
}
