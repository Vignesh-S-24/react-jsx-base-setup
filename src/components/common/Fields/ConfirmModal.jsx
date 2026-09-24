import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { Divider, CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      timeout={{ enter: 250, exit: 200 }}
    />
  );
});

const getModalStyles = (type, theme) => {
  switch (type) {
    case "success":
      return {
        icon: (
          <CheckCircleOutlineIcon
            sx={{ color: theme.palette.success.main, fontSize: 24 }}
          />
        ),
        iconBg: theme.palette.success.lighter,
        btnBg: theme.palette.success.main,
        btnHover: theme.palette.success.dark,
      };
    case "error":
      return {
        icon: (
          <WarningAmberRoundedIcon
            sx={{ color: theme.palette.error.main, fontSize: 24 }}
          />
        ),
        iconBg: theme.palette.error.lighter,
        btnBg: theme.palette.error.main,
        btnHover: theme.palette.error.dark,
      };
    case "info":
    default:
      return {
        icon: (
          <InfoOutlinedIcon
            sx={{ color: theme.palette.info.main, fontSize: 24 }}
          />
        ),
        iconBg: theme.palette.info.lighter,
        btnBg: theme.palette.info.main,
        btnHover: theme.palette.info.dark,
      };
  }
};

const CommonConfirmModal = ({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info", // 'info', 'success', 'error'
  disableAnimation = false,
  sx,
}) => {
  const theme = useTheme();
  const styles = getModalStyles(type, theme);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ zIndex: 10000, ...sx }}
      slots={{ transition: disableAnimation ? undefined : Transition }}
      slotProps={{
        paper: {
          sx: {
            width: 450,
            maxWidth: "95%",
            overflow: "hidden",
            animation: disableAnimation
              ? "none"
              : open
                ? "fadeSlideIn 0.25s ease-out"
                : "none",

            "@keyframes fadeSlideIn": {
              "0%": {
                transform: "translateY(20px)",
                opacity: 0,
              },
              "100%": {
                transform: "translateY(0)",
                opacity: 1,
              },
            },
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          px: 2.5,
          py: 3,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: styles.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {styles.icon}
        </Box>

        {/* Title & Message */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <DialogContent sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {message}
            </Typography>
          </DialogContent>
        </Box>
      </Box>

      <Divider />

      {/* Footer */}
      <DialogActions
        sx={{
          px: 2.5,
          py: 1.5,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            borderColor: "divider",
            color: "text.primary",
            fontSize: "0.9rem",
            px: 2.2,
            py: 0.6,

            "&:hover": {
              borderColor: "text.disabled",
              backgroundColor: "background.hover",
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          disabled={isLoading}
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: styles.btnBg,
            fontSize: "0.9rem",
            fontWeight: 600,
            px: 2.4,
            py: 0.6,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: styles.btnHover,
              boxShadow: "none",
            },

            "&.Mui-disabled": {
              opacity: 0.7,
              color: "common.white",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
          ) : null}
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonConfirmModal;
