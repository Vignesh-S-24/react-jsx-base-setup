import { useState } from "react";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Notification from "./Notification";

const MainLayout = () => {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <CssBaseline />
      <Box sx={{ flexShrink: 0, position: "sticky", top: 0, zIndex: theme.zIndex.appBar }}>
        <Header
          onMenuClick={toggleSidebar}
          onNotificationClick={() => setNotificationOpen((prev) => !prev)}
        />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0, overflow: "hidden", position: "relative" }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: theme.palette.background.default,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>

        <Notification
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default MainLayout;
