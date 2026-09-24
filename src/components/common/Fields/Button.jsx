import { Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const CommonButton = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  startIcon = <AddIcon sx={{ color: "inherit" }} />,
  disabled = false,
  loading = false,
  fullWidth = false,
  sx = {},
  size = "medium",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      startIcon={!loading ? startIcon : null}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      size={size}
      type="submit"
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "&.Mui-disabled": {
          backgroundColor: "action.disabledBackground",
          color: "text.disabled",
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={18} color="inherit" /> : label}
    </Button>
  );
};

export default CommonButton;
