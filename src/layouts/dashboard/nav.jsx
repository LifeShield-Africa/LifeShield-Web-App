import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import UserProfile from './UserProfile';
import navConfig from './config-navigation';

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const pharmacy = 'robialasor@gmail.com';

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        // mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 1,
      }}
    >
      <Avatar src="/favicon/favicon.svg" alt="photoURL" sx={{ width: 56, height: 56 }} />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {pharmacy.length > 12 ? `${pharmacy.substring(0, 12)}...` : pharmacy}
        </Typography>
      </Box>

      <Box
        component="span"
        onClick={handleClick}
        sx={{
          position: 'absolute',
          right: -40,
          ml: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          cursor: 'pointer',
          transform: 'rotate(-90deg)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
          },
        }}
      >
        <ExpandMore />
      </Box>
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              handleOpen();
            }}
          >
            <SettingsOutlinedIcon
              sx={{
                mr: 1,
                fontSize: 20,
                opacity: 0.8,
              }}
            />
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              // logout();
            }}
          >
            <LogoutOutlinedIcon
              sx={{
                mr: 1,
                fontSize: 20,
                opacity: 0.8,
              }}
            />
            Log out
          </MenuItem>
        </Menu>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <UserProfile handleClose={handleClose} pharmacy={pharmacy.data} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={2} sx={{ px: 2, mt: 5 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} active={pathname === item.path} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          mt: 1,
          width: "100%",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <Logo sx={{ mt: 5, transform: "scale(1.3)" }} />

      </Box>

      {renderMenu}

      {renderAccount}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'white',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: '#438EF2',
          '&:hover': {
            bgcolor: (theme) => alpha('#438EF2', 0.95),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title}</Box>

      {!active && (
        <Box
          component="span"
          sx={{
            width: 24,
            height: 24,
            mr: 2,
            position: 'absolute',
            right: 2,
          }}
        >
          <ChevronRight />
        </Box>
      )}
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
