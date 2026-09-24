import { Alert, Box, useTheme } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const Banner = ({ severity = "info", message, icon, sx = {} }) => {
  const theme = useTheme();

  // Mapping severity to colors and icons
  const severityConfig = {
    info: {
      bgColor: theme.palette.info.light,
      color: theme.palette.info.main,
      icon: (
        <InfoOutlinedIcon
          sx={{ fontSize: "20px", color: theme.palette.info.main }}
        />
      ),
    },
    warning: {
      bgColor: theme.palette.warning.light,
      color: theme.palette.warning.dark || theme.palette.warning.main,
      icon: (
        <WarningAmberOutlinedIcon
          sx={{ fontSize: "20px", color: theme.palette.warning.main }}
        />
      ),
    },
    success: {
      bgColor: theme.palette.success.light,
      color: theme.palette.success.main,
      icon: (
        <GppGoodOutlinedIcon
          sx={{ fontSize: "20px", color: theme.palette.success.main }}
        />
      ),
    },
  };

  const config = severityConfig[severity] || severityConfig.info;

  return (
    <Alert
      icon={icon || config.icon}
      sx={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}20`,
        borderRadius: "8px",
        mb: 2,
        py: 1,
        px: 2,
        display: "flex",
        alignItems: "center",
        "& .MuiAlert-icon": {
          padding: "0px",
          mr: 1.5,
          color: config.color,
          display: "flex",
          alignItems: "center",
        },
        "& .MuiAlert-message": {
          padding: "0px",
          width: "100%",
          color: config.color,
          fontSize: "12.5px",
          fontWeight: 400,
        },
        ...sx,
      }}
    >
      <Box sx={{ width: "100%" }}>
        {message || (
          <>
            Fields marked with <span style={{ fontWeight: 700 }}>*</span> are
            required. GST, PAN and CIN are validated against Indian regulatory
            formats.
          </>
        )}
      </Box>
    </Alert>
  );
};

export default Banner;
