import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Typography } from '@mui/material';
import AccountPopover from './AccountPopover';

const DRAWER_WIDTH = 64;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const UserNameContainerStyle = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));


export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 0.5, py: 3, display: 'inline-flex' }}>
          <RouterLink to="/">
            <Box component="img" src="/static/logo.jpg" sx={{ width: 150, height: 35 }} />
          </RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <UserNameContainerStyle>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}><b>Username</b></Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Company Name</Typography>
            </UserNameContainerStyle>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
