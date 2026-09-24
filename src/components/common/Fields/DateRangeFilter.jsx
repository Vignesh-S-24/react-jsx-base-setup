import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Popover,
  InputAdornment,
  useTheme,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";

export default function CommonDateRangeFilter({
  options = [],
  value,
  onChange,
  onCustomDateApply,
  customDateRange,
}) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(value);
  const [openCustom, setOpenCustom] = useState(value === "custom");

  const [range, setRange] = useState({
    startDate: customDateRange?.startDate || new Date(),
    endDate: customDateRange?.endDate || new Date(),
    key: "selection",
  });

  const [prevValue, setPrevValue] = useState(value);
  const [prevCustomDateRange, setPrevCustomDateRange] =
    useState(customDateRange);

  if (value !== prevValue || customDateRange !== prevCustomDateRange) {
    setPrevValue(value);
    setPrevCustomDateRange(customDateRange);
    setSelected(value);
    if (value === "custom") {
      setOpenCustom(true);

      if (customDateRange?.startDate) {
        setRange({
          startDate: customDateRange.startDate,
          endDate: customDateRange.endDate,
          key: "selection",
        });
      }
    } else {
      setOpenCustom(false);
    }
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (value !== "custom") {
      setSelected(value);
      setOpenCustom(false);
    }
  };

  const handleSelect = (itemValue) => {
    setSelected(itemValue);

    if (itemValue === "custom") {
      setOpenCustom(true);
    } else {
      setOpenCustom(false);
      onChange(itemValue);
      setAnchorEl(null);
    }
  };

  const handleApply = () => {
    onChange("custom");

    onCustomDateApply?.({
      startDate: range.startDate,
      endDate: range.endDate,
    });

    setAnchorEl(null);
  };

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <>
      {/* SELECT */}
      <Box
        onClick={handleClick}
        sx={{
          height: 40,
          px: 1.5,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          border: "1px solid #DADCE0",
          minWidth: 170,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />

          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            {value === "custom" && customDateRange?.startDate
              ? `${dayjs(customDateRange.startDate).format(
                  "YYYY-MM-DD",
                )} - ${dayjs(customDateRange.endDate).format("YYYY-MM-DD")}`
              : selectedOption?.label}
          </Typography>
        </Box>

        <KeyboardArrowDownRoundedIcon />
      </Box>

      {/* POPOVER */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
              display: "flex",
              border: "1px solid #E0E0E0",
            },
          },
        }}
      >
        {/* LEFT MENU */}
        <Box
          sx={{
            width: 185,
            borderRight: openCustom
              ? `1px solid ${theme.palette.divider}`
              : "none",
            bgcolor: "background.paper",
            py: 1,
            maxHeight: 520,
            overflowY: "auto",
          }}
        >
          {options.map((item) => {
            const isSelected = selected === item.value;

            return (
              <Box
                key={item.value}
                onClick={() => handleSelect(item.value)}
                sx={{
                  mx: 1,
                  mb: 0.2,
                  px: 1.8,
                  py: 0.8,
                  borderRadius: "4px",
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "0.2s",
                  bgcolor: isSelected
                    ? theme.palette.primary.light
                    : "transparent",
                  color: isSelected ? "primary.contrastText" : "text.primary",

                  "&:hover": {
                    bgcolor: isSelected
                      ? theme.palette.primary.main
                      : "primary.light",
                    color: "primary.contrastText",
                  },
                }}
              >
                {item.label}
              </Box>
            );
          })}
        </Box>

        {/* RIGHT PANEL */}
        {openCustom && (
          <Box
            sx={{
              p: 1.5,
              width: 520,
              bgcolor: "background.paper",
              // --- react-date-range dark mode & size overrides ---
              "& .rdrCalendarWrapper": {
                fontSize: "10px !important",
                background: "transparent",
                color: "text.primary",
              },
              "& .rdrMonth": {
                width: "230px !important",
              },
              "& .rdrMonths": {
                gap: "8px",
              },
              "& .rdrMonthName": {
                padding: "0 0 5px 0 !important",
                fontSize: "12px !important",
                fontWeight: "600 !important",
                color: "text.primary",
              },
              "& .rdrWeekDay": {
                fontSize: "10px !important",
                fontWeight: 600,
                height: "22px !important",
                lineHeight: "22px !important",
                color: "text.secondary",
              },
              "& .rdrDay": {
                height: "26px !important",
                color: "text.primary",
              },
              "& .rdrDayNumber span": {
                fontSize: "11px !important",
                color: "text.primary",
              },
              "& .rdrSelected ~ .rdrDayNumber span, & .rdrInRange ~ .rdrDayNumber span, & .rdrStartEdge ~ .rdrDayNumber span, & .rdrEndEdge ~ .rdrDayNumber span":
                {
                  color: "#fff !important",
                },
              "& .rdrDayPassive .rdrDayNumber span": {
                color: "text.secondary",
                opacity: 0.5,
              },
              "& .rdrMonthAndYearWrapper": {
                height: "34px !important",
                paddingTop: "0 !important",
              },
              "& .rdrDateDisplayWrapper": {
                display: "none !important",
              },
              "& .rdrNextPrevButton": {
                margin: "0 4px !important",
                width: "24px !important",
                height: "24px !important",
                background:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#EFF2F7",
              },
              "& .rdrPprevButton i": {
                borderColor: `transparent ${theme.palette.text.primary} transparent transparent !important`,
              },
              "& .rdrNextButton i": {
                borderColor: `transparent transparent transparent ${theme.palette.text.primary} !important`,
              },
              "& .rdrMonthPicker select, & .rdrYearPicker select": {
                fontSize: "11px !important",
                padding: "2px 14px 2px 6px !important",
                color: "text.primary",
              },
              "& .rdrMonthPicker select option, & .rdrYearPicker select option":
                {
                  color: "text.primary",
                  background: theme.palette.background.paper,
                },
              "& .rdrDayToday .rdrDayNumber span:after": {
                background: theme.palette.primary.main,
              },
              "& .rdrDayToday:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span:after":
                {
                  background: "#fff",
                },
            }}
          >
            {/* DATE INPUTS */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                size="small"
                fullWidth
                value={dayjs(range.startDate).format("YYYY-MM-DD")}
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                size="small"
                fullWidth
                value={dayjs(range.endDate).format("YYYY-MM-DD")}
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* CALENDAR */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DateRange
                editableDateInputs
                onChange={(item) => setRange(item.selection)}
                moveRangeOnFirstSelection={false}
                ranges={[range]}
                months={2}
                direction="horizontal"
                rangeColors={[theme.palette.primary.main]}
                showDateDisplay={false}
                showMonthAndYearPickers
              />
            </Box>

            {/* FOOTER */}
            <Box
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1">
                {dayjs(range.startDate).format("YYYY-MM-DD")} -{" "}
                {dayjs(range.endDate).format("YYYY-MM-DD")}
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleApply}
                  sx={{
                    textTransform: "none",
                    borderRadius: "6px",
                    px: 2.5,
                    boxShadow: "none",
                    bgcolor: theme.palette.primary.main,

                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                      boxShadow: "none",
                    },
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Popover>
    </>
  );
}
