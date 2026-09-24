import { Typography } from "@mui/material";

const MandatoryFormLabel = ({ label, mandatory }) => {
  return (
    <Typography sx={{ marginBottom: "10px", textTransform: "capitalize" }}>
      {label}
      <span style={{ color: "red" }}>{mandatory && "*"}</span>
    </Typography>
  );
};

export default MandatoryFormLabel;
