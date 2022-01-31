import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StarOutline } from '@material-ui/icons';
import { BaseSyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/navbar.css';

type linkDisplayType = {
  display: string;
  link: string;
};

const pages: linkDisplayType[] = [
  { display: 'סטארים', link: '/stars' },
  { display: 'גיחות', link: '/flights' },
];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  const handleCloseNavMenu = () => {
    setAnchorElNav(undefined);
  };

  return (
    <AppBar position="static" sx={{ background: 'goldenrod' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <StarOutline fontSize="large" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={(
                e: BaseSyntheticEvent,
              ) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page: linkDisplayType, index) => (
                <NavLink to={page.link} key={index}>
                  <MenuItem key={page.display} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.display}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <StarOutline fontSize="large" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page: linkDisplayType) => (
              <NavLink to={page.link}>
                <Button
                  key={page.display}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontSize: 'large',
                    color: 'white',
                    display: 'block',
                    marginRight: '15px',
                  }}
                >
                  {page.display}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={
                  (e: BaseSyntheticEvent) => setAnchorElUser(e.currentTarget)
                }
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(undefined)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;