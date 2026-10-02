import { useState } from 'react';
import { alpha, Box, ButtonBase, Fade, IconButton, Slide, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DesktopAlertIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <rect x="2.5" y="3.5" width="19" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 20.5h8M12 16.5v4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M13 6.2l-3.6 4.2h2.6l-1 3.4 3.8-4.4h-2.6z" fill="currentColor" />
  </SvgIcon>
);

const MailboxIllustration = ({ dark, darkSoft, red, yellow, green, light }) => (
  <svg width="140" height="171" viewBox="0 0 270 330" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* bird */}
    <path d="M118 22c6-4 14-4 18 2-2 8-10 12-18 8-3-3-3-7 0-10z" fill={yellow} />
    <path d="M124 14c5-3 10-1 12 4-4 1-9 0-12-4z" fill={dark} />
    {/* swirl */}
    <path d="M110 36c-25 8-45 12-44 22 2 10 40 4 50 14" stroke={dark} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M100 72l18 4M124 76l10 3" stroke={dark} strokeWidth="1.5" strokeLinecap="round" />
    {/* flag */}
    <path d="M40 152c4-8 14-12 24-14l4 10-24 8z" fill={dark} />
    {/* mailbox back */}
    <path d="M118 108c-22 0-38 14-38 34v40h76v-74h-38z" fill={dark} />
    <path d="M118 128c-12 0-22 8-22 20v34h44v-54h-22z" fill={darkSoft} />
    {/* mailbox front */}
    <path d="M156 108h72c14 0 24 10 24 24v50h-96v-74z" fill={red} />
    <path d="M232 128v52h-24" stroke={dark} strokeWidth="1.2" fill="none" />
    <path d="M186 182h44" stroke={dark} strokeWidth="1.5" />
    {/* door */}
    <path d="M82 184h72c0 26-16 44-40 44-22 0-36-14-32-44z" fill={dark} />
    <path d="M82 184h74" stroke={light} strokeWidth="1.5" />
    {/* post */}
    <path d="M178 182h28l-4 96h-20z" fill={darkSoft} />
    {/* grass */}
    <path d="M186 292c0-24 10-36 16-40-2 14 4 24 0 40z" fill={green} />
    <path d="M178 292c-2-12 0-22-6-28 10 4 14 16 14 28z" fill={dark} />
    <path d="M204 292c0-14 4-22 8-28 6 6 6 18 4 28z" fill={darkSoft} />
    <path d="M226 292c-2-8 0-14 4-18 2 6 2 12 0 18z" fill={green} />
    {/* ground */}
    <path d="M70 296c50-16 130-16 190 6" stroke={dark} strokeWidth="1.2" fill="none" />
  </svg>
);

export default function Notification({ open, onClose }) {
  const theme = useTheme();
  const [tab, setTab] = useState('mentions');

  const tabSx = (active) => ({
    position: 'relative',
    height: 28,
    px: 0.5,
    fontSize: 14,
    fontWeight: active ? 700 : 400,
    color: active ? 'text.primary' : 'text.secondary',
    '&::after': active
      ? {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          borderRadius: '3px 3px 0 0',
          bgcolor: 'primary.main',
        }
      : undefined,
  });

  return (
    <>
      <Fade in={open} mountOnEnter unmountOnExit>
        <Box
          onClick={onClose}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: theme.zIndex.drawer - 1,
            bgcolor: alpha(theme.palette.sidebar.bg, 0.7),
          }}
        />
      </Fade>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 400,
            maxWidth: '100%',
            zIndex: theme.zIndex.drawer,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[8],
          }}
        >
          {/* Title bar */}
          <Box
            sx={{
              bgcolor: 'background.default',
              px: 2,
              pt: 1.5,
              display: 'flex',
              flexDirection: 'column',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 17, fontWeight: 500, color: 'text.primary' }}>Notifications</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip
                  title="Enable Desktop Notifications"
                  placement="left"
                  disableInteractive
                  enterDelay={100}
                  arrow
                  slotProps={{
                    tooltip: {
                      sx: {
                        bgcolor: theme.palette.sidebar.bg,
                        color: theme.palette.header.text,
                        fontSize: 12,
                        fontWeight: 500,
                        px: 1,
                        py: 0.6,
                        borderRadius: '6px',
                      },
                    },
                    arrow: {
                      sx: {
                        color: theme.palette.sidebar.bg,
                      },
                    },
                  }}
                >
                  <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}>
                    <DesktopAlertIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
                <Box sx={{ width: '1px', height: 16, bgcolor: 'divider', mx: 1.5 }} />
                <IconButton size="small" onClick={onClose} sx={{ color: 'error.main' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Tabs */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mt: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: 28 }}>
                <ButtonBase onClick={() => setTab('all')} sx={tabSx(tab === 'all')}>
                  All
                </ButtonBase>
                <Box sx={{ width: '1px', height: 12, bgcolor: 'divider', mx: 1.5 }} />
                <KeyboardArrowDownIcon sx={{ color: 'text.primary' }} fontSize="small" />
              </Box>
              <ButtonBase onClick={() => setTab('mentions')} sx={tabSx(tab === 'mentions')}>
                Mentions
              </ButtonBase>
            </Box>
          </Box>

          {/* Empty state */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: 1,
              px: 2,
              textAlign: 'center',
              py: 10
            }}
          >
            <MailboxIllustration
              dark={theme.palette.sidebar.bg}
              darkSoft={theme.palette.header.searchBg}
              red={theme.palette.error.main}
              yellow={theme.palette.warning.light}
              green={theme.palette.success.light}
              light={theme.palette.background.paper}
            />
            <Typography sx={{ mt: 2, lineHeight: 1.4 }}>
              Uhh... There are no notifications at the moment.
            </Typography>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
