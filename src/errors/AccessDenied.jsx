import { Box, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

export default function AccessDeniedPage() {
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
      <WarningAmberRoundedIcon sx={{ fontSize: 80, color: '#f59e0b', mb: 2 }} />
      <Typography
        variant="h4"
        gutterBottom
      >
        Access Denied
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        You do not have permission to view this page. Contact your administrator if this is a mistake.
      </Typography>
    </Box>
  );
}
