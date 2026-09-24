import { useState, useMemo } from "react";
import {
  TextField,
  Box,
  FormLabel,
  Select,
  MenuItem,
  InputBase,
  Paper,
  ListSubheader,
} from "@mui/material";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { validatePhoneBasedRegion } from "../../../utils/MobileNoValidator";

const PhoneNumberField = ({
  mandatory = false,
  label,
  value = { code: "IN", number: "" },
  onChange,
  placeholder = "Enter mobile number",
  error = false,
  helperText = "",
  name = "phone_number",
  disabled = false,
  width = "100%",
  sx,
  initialCode = "IN",
  mb = 2,
  mt = 1,
  ...rest
}) => {
  const countryOptions = useMemo(() => {
    return getCountries().map((code) => ({
      value: code,
      name: new Intl.DisplayNames(["en"], { type: "region" }).of(code),
      callingCode: `+${getCountryCallingCode(code)}`,
    }));
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(
    countryOptions.find((c) => c.value === initialCode) || countryOptions[0],
  );
  const [numberValue, setNumberValue] = useState(value?.number || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  if (value?.number !== prevValue?.number || value?.code !== prevValue?.code) {
    setPrevValue(value);
    setNumberValue(value?.number || "");
    if (value?.code) {
      const found = countryOptions.find(
        (c) => c.value === value.code || c.callingCode === value.code,
      );
      if (found) setSelectedCountry(found);
    }
  }
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleNumberChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setNumberValue(onlyNums);
    onChange?.({
      code: selectedCountry.callingCode,
      number: onlyNums,
    });
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const newCountry = countryOptions.find((c) => c.value === countryCode);
    setSelectedCountry(newCountry);
    setNumberValue("");
    onChange?.({
      code: newCountry.callingCode,
      number: "",
    });
    setOpen(false); // close dropdown after selection
    setSearchTerm(""); // clear search
    setFocusedIndex(0);
  };

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    return countryOptions.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.callingCode.includes(searchTerm),
    );
  }, [countryOptions, searchTerm]);

  return (
    <Box sx={{ width }}>
      {label && (
        <FormLabel sx={{ mb: 0.5, display: "block" }}>
          {label}
          {mandatory && <span style={{ color: "red" }}> *</span>}
        </FormLabel>
      )}

      <Box sx={{ display: "flex" }}>
        {/* Country Select with Searchable Dropdown */}
        <Select
          value={selectedCountry?.value || ""}
          onChange={handleCountryChange}
          disabled={disabled}
          open={open}
          onOpen={() => {
            setOpen(true);
            if (selectedCountry) {
              const idx = countryOptions.findIndex(
                (c) => c.value === selectedCountry.value,
              );
              setFocusedIndex(idx >= 0 ? idx : -1);
            } else {
              setFocusedIndex(-1);
            }
          }}
          onClose={() => {
            setOpen(false);
            setSearchTerm("");
            setFocusedIndex(0);
          }}
          displayEmpty
          renderValue={(value) => {
            const country = countryOptions.find((c) => c.value === value);
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <img
                  src={`https://flagcdn.com/w20/${country?.value.toLowerCase()}.png`}
                  width={18}
                  height={14}
                  style={{ borderRadius: 2 }}
                  alt={country?.value}
                />

                <span>{country?.callingCode}</span>
              </Box>
            );
          }}
          sx={{
            width: 100,
            height: 40,
            mt,
            borderRadius: "6px 0 0 6px",
            "& .MuiOutlinedInput-root": {
              height: 40,
              borderRadius: "6px 0 0 6px",
            },
          }}
          MenuProps={{
            autoFocus: false,
            slotProps: {
              paper: {
                sx: { maxHeight: 200 },
              },
            },
            anchorOrigin: { vertical: "bottom", horizontal: "left" },
            transformOrigin: { vertical: "top", horizontal: "left" },
          }}
        >
          <ListSubheader
            sx={{
              bgcolor: "background.paper",
              position: "sticky",
              top: -2,
              zIndex: 1,
              mt: -1,
            }}
          >
            <Paper elevation={0}>
              <InputBase
                placeholder="Search country..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFocusedIndex(0);
                }}
                fullWidth
                autoFocus
                sx={{
                  px: 1,
                  py: 0.5,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  mt: 1.5,
                }}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setFocusedIndex((prev) =>
                      prev < filteredCountries.length - 1 ? prev + 1 : prev,
                    );
                    return;
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                    return;
                  }
                  if (
                    e.key === "Enter" &&
                    filteredCountries.length > 0 &&
                    focusedIndex >= 0
                  ) {
                    e.preventDefault();
                    handleCountryChange({
                      target: { value: filteredCountries[focusedIndex].value },
                    });
                  }
                }}
              />
            </Paper>
          </ListSubheader>

          {filteredCountries.map((country, index) => {
            const isFocused = index === focusedIndex;
            return (
              <MenuItem
                key={country.value}
                value={country.value}
                onMouseEnter={() => setFocusedIndex(index)}
                sx={{
                  ...(isFocused && {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: 1,
                    mx: 1,
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }),
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                    width={20}
                    height={14}
                    style={{ borderRadius: 2 }}
                    alt={country.value}
                  />
                  <span>{country.callingCode}</span> – {country.name}
                </Box>
              </MenuItem>
            );
          })}

          {filteredCountries.length === 0 && (
            <MenuItem disabled>No countries found</MenuItem>
          )}
        </Select>

        {/* Phone number input */}
        <TextField
          {...rest}
          name={name}
          placeholder={placeholder}
          fullWidth
          size="small"
          disabled={disabled}
          value={numberValue}
          onChange={handleNumberChange}
          error={
            error ||
            (numberValue.length > 0 &&
              !validatePhoneBasedRegion(
                numberValue,
                selectedCountry.callingCode,
              ))
          }
          helperText={
            helperText ||
            (numberValue.length > 0 &&
            !validatePhoneBasedRegion(numberValue, selectedCountry.callingCode)
              ? "Invalid phone number"
              : "")
          }
          slotProps={{
            htmlInput: {
              ...(rest.slotProps?.htmlInput || {}),
              inputMode: "numeric",
              pattern: "[0-9]*",
            },
          }}
          sx={{
            mt,
            "& .MuiOutlinedInput-root": {
              height: 40,
              borderRadius: "0 6px 6px 0",
            },
            mb,
            ...sx,
          }}
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberField;
