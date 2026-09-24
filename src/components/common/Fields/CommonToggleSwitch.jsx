import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(() => ({
  width: 36,
  height: 20,
  padding: 0,
  display: "flex",

  "& .MuiSwitch-switchBase": {
    padding: 2,
    margin: 0,

    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#ffffff",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#3CB043",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: "width 200ms",
  },

  "& .MuiSwitch-track": {
    borderRadius: 10,
    opacity: 1,
    backgroundColor: "#9CD3BF",
    boxSizing: "border-box",
  },
}));

const CommonToggleSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  label = "",
  sx = {},
}) => {
  return (
    <FormControlLabel
      sx={{
        ml: 0,
        ...sx,
      }}
      control={
        <AntSwitch checked={checked} onChange={onChange} disabled={disabled} />
      }
      label={<Typography sx={{ fontSize: "13px", ml: 1 }}>{label}</Typography>}
    />
  );
};

export default CommonToggleSwitch;
