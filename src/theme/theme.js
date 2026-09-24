import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";
import typography from "./typography";
import components from "./components";

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  components,
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  components,
  shape: { borderRadius: 8 },
});

export const createAppTheme = (mode) => {
  return mode === "light" ? lightTheme : darkTheme;
};
