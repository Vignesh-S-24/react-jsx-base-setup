import {
  Box,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  NotificationsNone as NotificationsIcon,
  SettingsOutlined as SettingsIcon,
  Apps as AppsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useTheme, keyframes } from '@mui/material/styles';
import { useThemeMode } from '../context/ThemeModeContext';
import GlobalSearch from './GlobalSearch';

const spinIn = keyframes`
  from {
    transform: rotate(-90deg) scale(0.4);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
`;

export default function Header({ onNotificationClick }) {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  const headerBg = theme.palette.header.bg;
  const headerDivider = theme.palette.header.divider;
  const headerText = theme.palette.header.text;
  const headerTextMuted = theme.palette.header.mutedText;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pr: 2,
        height: 52,
        backgroundColor: headerBg,
        color: headerText,
        borderBottom: `1px solid ${headerDivider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', width: 240, pl: 2 }}>
          <Box
            component="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            sx={{ width: 28, height: 28, fill: theme.palette.success.main }}
          >
            <path d="M144 96a48 48 0 0 0-48 48v224a48 48 0 0 0 48 48h22.6l105.4-158v110a48 48 0 0 0 48 48h22.6a48 48 0 0 0 48-48V144a48 48 0 0 0-48-48H320l-105.4 158V144a48 48 0 0 0-48-48H144z"/>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 0.5, color: headerText }}>
            NDE
          </Typography>
        </Box>

        <GlobalSearch sx={{ ml: 3 }} />
      </Box>

      {/* Right section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

        <IconButton
          onClick={toggleMode}
          aria-label="Toggle light/dark mode"
          sx={{
            color: headerTextMuted,
            transition: 'color 0.2s, transform 0.15s',
            '&:hover': { color: headerText, transform: 'scale(1.1)' },
            '&:active': { transform: 'scale(0.85)' },
          }}
        >
          <Box
            key={mode}
            sx={{
              display: 'flex',
              animation: `${spinIn} 0.35s ease`,
            }}
          >
            {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </Box>
        </IconButton>

        <IconButton 
          sx={{ color: headerTextMuted, '&:hover': { color: headerText } }}
          onClick={onNotificationClick}
        >
          <NotificationsIcon fontSize="small" />
        </IconButton>
        <IconButton sx={{ color: headerTextMuted, '&:hover': { color: headerText } }}>
          <SettingsIcon fontSize="small" />
        </IconButton>

        <Avatar
          src="https://contacts.zoho.in/file?t=user&ID=60010825350&fs=thumb"
          alt="vignesh"
          sx={{ width: 28, height: 28, cursor: 'pointer', ml: 0.5 }}
        />
      </Box>
    </Box>
  );
}
