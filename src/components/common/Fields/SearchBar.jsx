import React, { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";

const CommonSearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  sx,
  mb = 1,
  mt = 1,
  height = 40,
  autoFocus = false,
  debounceDelay = 500,
  width = "100%",
  startAdornment = undefined,
  InputProps = {},
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setInternalValue(value || "");
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internalValue !== (value || "")) {
        onChange?.(internalValue);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [internalValue, debounceDelay, onChange, value]);

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
    if (onClear) onClear();
  };

  const inputRef = React.useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      const timeout = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [autoFocus]);

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      autoComplete="off"
      fullWidth
      inputRef={inputRef}
      slotProps={{
        htmlInput: {
          "data-no-dirty": true,
        },
        input: {
          startAdornment:
            startAdornment !== undefined ? (
              startAdornment
            ) : (
              <InputAdornment position="start" sx={{ mr: 0.5 }}>
                <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              </InputAdornment>
            ),
          endAdornment: internalValue ? (
            <InputAdornment position="end">
              <CloseRoundedIcon
                sx={{
                  fontSize: 18,
                  cursor: "pointer",
                  color: "error.main",
                  // '&:hover': { color: 'error.main' },
                }}
                onClick={handleClear}
              />
            </InputAdornment>
          ) : null,
          ...InputProps,
        },
      }}
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          height,
          mb,
          mt,
          borderRadius: "8px",
          backgroundColor: "background.paper",
          fontSize: "13px",
          "& fieldset": {
            borderColor: "divider",
          },
          "&:hover fieldset": {
            borderColor: "text.disabled",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          },
        },
        "& .MuiOutlinedInput-input": {
          py: 0,
          fontSize: "13px",
        },
        ...sx,
      }}

      {...props}
    />
  );
};

export default CommonSearchBar;
