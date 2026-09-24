import { useRef } from "react";
import {
  TextField,
  FormLabel,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";

const CommonTextField = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  startAdornment,
  endAdornment,
  onEndAdornmentClick,
  error,
  width = "100%",
  height = 40,
  helperText,
  sx,
  mandatory = false,
  mt = 1,
  mb = 2,
  disabled = false,
  autoFocus = false,
  noLabel = false,
  maxLength = 500,
  type,
  loading = false,
  ...rest
}) => {
  const anchorRef = useRef(null);

  return (
    <Box sx={{ width }}>
      {/* Label */}
      {!noLabel && (
        <FormLabel>
          {label}
          {mandatory && <span style={{ color: "red" }}> *</span>}
        </FormLabel>
      )}

      {/* TextField */}
      <TextField
        fullWidth
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        autoComplete="off"
        disabled={disabled}
        autoFocus={autoFocus}
        inputRef={anchorRef}
        sx={{
          width,
          mt,
          mb,
          ...(noLabel
            ? {
                "&& input": {
                  p: 0,
                },
                "&& .MuiOutlinedInput-root": {
                  height,
                  p: 0,
                  transition: "none",
                  "& fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused": {
                    borderColor: "none",
                    boxShadow: "none",
                  },
                  "&:active": {
                    borderColor: "none",
                    boxShadow: "none",
                  },
                },
              }
            : {
                "& .MuiOutlinedInput-root": {
                  height: rest.multiline ? "auto" : height,
                  borderRadius: "6px",
                },
              }),
          "& input[type=number]": {
            "-moz-appearance": "textfield",
            "-webkit-appearance": "none",
            appearance: "none",
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            display: "none",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            display: "none",
          },
          ...sx,
        }}
        slotProps={{
          htmlInput: {
            ...(rest.inputProps || {}),
            maxLength: maxLength,
          },
          input: {
            ...(startAdornment && {
              startAdornment: (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
            }),
            ...((endAdornment || loading) && {
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : onEndAdornmentClick ? (
                    <IconButton
                      onClick={() => onEndAdornmentClick(value)}
                      edge="end"
                      size="small"
                    >
                      {endAdornment}
                    </IconButton>
                  ) : (
                    endAdornment
                  )}
                </InputAdornment>
              ),
            }),
          },
        }}
        {...rest}
      />
    </Box>
  );
};

export default CommonTextField;
