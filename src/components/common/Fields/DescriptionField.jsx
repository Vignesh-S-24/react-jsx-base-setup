import { TextField, FormLabel } from "@mui/material";

const CommonDescriptionField = ({
  label,
  value,
  onChange,
  name,
  placeholder,
  error,
  helperText,
  width = "100%",
  paddingTop,
  mandatory,
  mt = 1,
  height,
  rows = 4,
  mb = 2,
  sx = {},
  maxLength = 1000,
  disabled,
  inputProps = {},
  ...rest
}) => {
  return (
    <>
      <FormLabel>
        {label}
        {mandatory && <span style={{ color: "red" }}> *</span>}
      </FormLabel>

      <TextField
        multiline
        rows={rows}
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        helperText={helperText}
        sx={{
          width: width,
          mb: mb,
          mt: mt,
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            height: height,
            paddingTop: paddingTop,
            "& fieldset": {
              border: "1px solid #D1D1D1",
            },
          },
          "& .Mui-disabled": {
            backgroundColor: "#f9f9fb",
          },
          "& textarea": {
            resize: "vertical",
            minHeight: "20px",
          },
          ...sx,
        }}
        slotProps={{
          htmlInput: {
            maxLength: maxLength,
            ...inputProps,
          },
        }}
        {...rest}
      />
    </>
  );
};

export default CommonDescriptionField;
