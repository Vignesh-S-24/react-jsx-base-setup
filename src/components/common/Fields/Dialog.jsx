import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      timeout={{ enter: 500, exit: 300 }}
    />
  );
});

const CommonDialog = ({
  open,
  onClose,
  title = "Dialog Title",
  subTitle = "",
  children,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  maxWidth = "sm",
  fullWidth = true,
  width = 600,
  hideSubmit = false,
  hideCancle = false,
  sx = {},
  disableAnimation = false,
  loading,
  submitDisabled,
  noTitle = false,
  buttonWidth = 90,
  leftActions = "",
  dialogBackgroud = "",
  onMore,
  moreLabel = "Save & New",
  hideMore = true,
  moreDisabled = false,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      slots={{ transition: Transition }}
      // keepMounted
      sx={{
        "& .MuiPaper-root": {
          margin: 0,
          width: width || "auto",
          animation: disableAnimation
            ? "none"
            : open
              ? "bounceIn 0.7s ease-out"
              : "none",
          "@keyframes bounceIn": {
            "0%": { transform: "translateY(100%)" },
            "60%": { transform: "translateY(-15px)" },
            "80%": { transform: "translateY(10px)" },
            "100%": { transform: "translateY(0)" },
          },
        },
        ...sx,
      }}
      {...props}
    >
      {!noTitle && (
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            px: 3,
            pt: 2,
            pb: 1,
            background: dialogBackgroud,
          }}
        >
          {/* Top Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h4">{title}</Typography>

            <IconButton onClick={onClose} size="small" color="error">
              <CloseIcon sx={{ fontSize: 20, color: "error.main" }} />
            </IconButton>
          </Box>

          {/* Subtitle */}
          {subTitle && (
            <Typography
              sx={{
                fontSize: "13px",

                mt: "2px",
              }}
            >
              {subTitle}
            </Typography>
          )}
        </DialogTitle>
      )}
      {/* Content */}
      <DialogContent dividers>{children}</DialogContent>

      <DialogActions
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT (customizable) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>{leftActions}</Box>

        {/* RIGHT (existing buttons) */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {!hideCancle && (
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ minWidth: buttonWidth }}
            >
              {cancelLabel}
            </Button>
          )}

          {!hideMore && (
            <Button
              onClick={onMore}
              disabled={moreDisabled || loading}
              variant="contained"
              sx={{
                minWidth: buttonWidth,
                borderRadius: 2,
                color: "icon.light",
                backgroundColor: "primary.light",
              }}
            >
              {moreLabel}
            </Button>
          )}

          {!hideSubmit && (
            <Button
              onClick={onSubmit}
              disabled={submitDisabled || loading}
              variant="contained"
              type="submit"
              sx={{ minWidth: buttonWidth }}
            >
              {submitLabel}
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
