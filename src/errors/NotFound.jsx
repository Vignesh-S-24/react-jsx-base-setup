import { Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        width: '100%',
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <WarningAmberRoundedIcon sx={{ fontSize: 60, color: '#f59e0b', mb: 2 }} />
      <Typography
        variant="h4"
        gutterBottom
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        You may have mistyped the address or the page may have been moved.
      </Typography>
    </Box>
  );
}
