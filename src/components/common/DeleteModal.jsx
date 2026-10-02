import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Divider } from "@mui/material";

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

const CommonDeleteModal = ({
  open,
  onClose,
  onConfirmDelete,
  deleting,
  itemType = "",
  title,
  disableAnimation = false,
  warningMessage = "Are you sure you want to delete",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={disableAnimation ? undefined : Transition}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          width: 450,
          maxWidth: "95%",
          overflow: "hidden",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.12)",
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
        {/* Warning Icon */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "#FEF2F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <WarningAmberRoundedIcon
            sx={{
              color: "#DC2626",
              fontSize: 24,
            }}
          />
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
            Delete {title}
          </Typography>

          <DialogContent sx={{ p: 0 }}>
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#4B5563",
                lineHeight: 1.6,
              }}
            >
              {warningMessage}{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 500,
                  color: "text.primary",
                  textTransform: "capitalize",
                }}
              >
                {itemType}
              </Box>{" "}
              ? 
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
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            borderColor: "#D1D5DB",
            color: "#374151",
            fontSize: "0.9rem",
            px: 2.2,
            py: 0.6,

            "&:hover": {
              borderColor: "#9CA3AF",
              backgroundColor: "#F9FAFB",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          disabled={deleting}
          onClick={onConfirmDelete}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#FF0000",
            fontSize: "0.9rem",
            fontWeight: 600,
            px: 2.4,
            py: 0.6,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#DC2626",
              boxShadow: "none",
            },

            "&.Mui-disabled": {
              backgroundColor: "#FCA5A5",
              color: "#fff",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDeleteModal;