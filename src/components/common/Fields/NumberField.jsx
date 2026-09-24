import { TextField, FormLabel, Box } from "@mui/material";

const CommonNumberField = ({
  mandatory = false,
  label,
  value,
  onChange,
  name,
  placeholder,
  error = false,
  helperText = "",
  width = "100%",
  height = 40,
  min = 0,
  max,
  step = 1,
  mt = 1,
  mb = 2,
  sx,
  ...props
}) => {
  return (
    <Box>
      {/* Label */}
      {label && (
        <FormLabel>
          {label}
          {mandatory && <span style={{ color: "red" }}> *</span>}
        </FormLabel>
      )}

      {/* Number Field */}
      <TextField
        type="number"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        slotProps={{ htmlInput: { min, max, step } }}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e" || e.key === "E") {
            e.preventDefault();
          }
          if (props.onKeyDown) {
            props.onKeyDown(e);
          }
        }}
        sx={{
          width: width,
          mt,
          mb,
          "& .MuiOutlinedInput-root": {
            height,
            borderRadius: "6px",
            "& fieldset": { border: "1px solid #D1D1D1" },
            "&.Mui-disabled": {
              backgroundColor: "#EBEBEF",
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#D1D1DB",
            },
          },
          ...sx,
        }}
        {...props}
      />
    </Box>
  );
};

export default CommonNumberField;
