import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const CommonTabs = ({
  tabs,
  mt = 2,
  onTabChange,
  activeTab,
  value,
  currentTab: propTab,
}) => {
  const isControlled =
    typeof value === "number" ||
    typeof activeTab === "number" ||
    typeof propTab === "number";
  const controlledValue =
    typeof value === "number"
      ? value
      : typeof activeTab === "number"
        ? activeTab
        : typeof propTab === "number"
          ? propTab
          : 0;

  const [internalTab, setInternalTab] = useState(0);
  const currentTab = isControlled ? controlledValue : internalTab;

  const handleChange = (event, newValue) => {
    if (!isControlled) {
      setInternalTab(newValue);
    }
    if (onTabChange) onTabChange(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "nowrap",
          position: "sticky",
          top: 0,
          zIndex: 9,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            slotProps={{
              indicator: {
                children: <span className="MuiTabs-indicatorSpan" />,
              },
            }}
            sx={{
              minHeight: 40,

              "& .MuiTabs-flexContainer": {
                flexWrap: "nowrap",
                padding: 0,
              },

              "& .MuiTabs-scroller": {
                padding: 0,
              },

              "& .MuiTab-root": {
                textTransform: "none",
                color: "grey.600",
                whiteSpace: "nowrap",
                minWidth: 0,
                px: 2,
                py: 0,
                minHeight: 36,
                fontSize: "14px",

                "&.Mui-selected": { color: "primary.main" },
              },

              "& .MuiTabs-scrollButtons.Mui-disabled": {
                width: 0,
                opacity: 0,
              },

              "& .MuiTabs-indicator": {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
                height: 3,
              },

              "& .MuiTabs-indicatorSpan": {
                maxWidth: 40,
                width: "100%",
                backgroundColor: "primary.main",
                borderRadius: "3px",
                marginTop: "0.5px",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} disableRipple />
            ))}
          </Tabs>
        </Box>
      </Box>

      <Box sx={{ mt: mt }}>
        {/* eslint-disable-next-line security/detect-object-injection */}
        {tabs[currentTab]?.component}
      </Box>
    </Box>
  );
};

export default CommonTabs;
