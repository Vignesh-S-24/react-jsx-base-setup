
import { useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommonMoreMenu from "./CommonMoreMenu";

const MAX_VISIBLE_ACTIONS = 4;

const ActionBar = ({
  actions = [],
  selectedCount = 0,
  onClose,
  showEsc = true,
  forceMenu = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const displayMenu = isMobile || forceMenu;

  const effectiveActions = useMemo(() => {
    if (
      actions.length === 1 &&
      actions[0].menuItems &&
      actions[0].menuItems.length > 0
    ) {
      return actions[0].menuItems;
    }
    return actions;
  }, [actions]);

  const handleClick = (action) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.menuItems && action.menuItems.length > 0) {
      action.menuItems[0].onClick?.();
    }
  };

  const visibleActions = displayMenu
    ? []
    : effectiveActions.slice(0, MAX_VISIBLE_ACTIONS);

  const hiddenActions = displayMenu
    ? effectiveActions
    : effectiveActions.slice(MAX_VISIBLE_ACTIONS);

  const menuOptions = hiddenActions.map((action, index) => ({
    label: action.label,
    value: index.toString(),
  }));

  const handleMenuChange = (value) => {
    const action = hiddenActions[parseInt(value, 10)];
    if (action) {
      handleClick(action);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        p: 1,
        border: "1px solid",
        borderColor: "#D9D9D9",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        mb: 1,
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          flex: 1,
          minWidth: 0,
        }}
      >
        {displayMenu ? (
          <CommonMoreMenu
            label="Bulk Actions"
            menuOptions={menuOptions}
            onChange={handleMenuChange}
          />
        ) : (
          <>
            {visibleActions.map((action, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => handleClick(action)}
                sx={{
                  borderRadius: "8px",
                  border: "1px solid #D6D6D6",
                  bgcolor: "background.muted",
                  color: "text.secondary",
                  fontSize: "14px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "background.muted",
                    borderColor: "divider",
                    boxShadow: "none",
                  },
                }}
              >
                {action.label}
              </Button>
            ))}

            {hiddenActions.length > 0 && (
              <CommonMoreMenu
                label={<MoreHorizIcon />}
                menuOptions={menuOptions}
                onChange={handleMenuChange}
                iconView={false}
              />
            )}
          </>
        )}

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              minWidth: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: "#EBF3FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0066FF",
              fontSize: "14px",
              fontWeight: 500,
              px: 0.5,
            }}
          >
            {selectedCount}
          </Box>

          <Typography
            variant="body2"
            noWrap
            sx={{
              flexShrink: 0,
              color: "text.primary",
              fontSize: "14px",
            }}
          >
            Selected
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      {showEsc && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon sx={{ color: "#D32F2F", fontSize: 20 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ActionBar;