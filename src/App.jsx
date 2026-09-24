import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./theme/index";
import Routes from "./routes/Routes";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <ToastContainer position="top-right" />
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
