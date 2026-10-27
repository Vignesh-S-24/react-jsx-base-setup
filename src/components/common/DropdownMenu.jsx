import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Popover,
  MenuItem,
  IconButton,
  Divider,
  useTheme,
  Skeleton,
  MenuList,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CommonSearchBar from "./Fields/SearchBar";
import CommonTabs from "./Fields/Tabs";
import CommonDeleteModal from "./DeleteModal";

const DropdownMenu = ({
  options = [],
  selectedKey,
  onChange,
  footerAction,
  width = 260,
  maxHeight = 300,
  onEdit,
  onDelete,
  onFavoriteToggle,
  favorites = [],
  deleting = false,
}) => {

  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [actionItem, setActionItem] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const open = Boolean(anchorEl);
  const actionOpen = Boolean(actionAnchor);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setActiveTab(0);
    setSearch("");
  };

  const selectedLabel = useMemo(() => {
    if (!selectedKey || !options?.length) return "";

    const selectedItem = options.find(
      (o) => String(o.id) === String(selectedKey)
    );

    return selectedItem?.label || "";
  }, [options, selectedKey]);



  const filteredOptions = useMemo(() => {
    let filtered = options;

    if (search) {
      filtered = filtered.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (activeTab === 1) {
      filtered = filtered.filter((o) => favorites.includes(o.id));
    }

    return filtered;
  }, [options, search, activeTab, favorites]);

  const grouped = {
    created: filteredOptions.filter((o) => o.group === "created"),
    public: filteredOptions.filter((o) => o.group === "public"),
  };

  const handleActionMenu = (e, item) => {
    e.stopPropagation();
    setActionAnchor(e.currentTarget);
    setActionItem(item);
  };

  const closeActionMenu = () => {
    setActionAnchor(null);
    setActionItem(null);
  };

  const handleFavoriteClick = (e, itemId) => {
    e.stopPropagation();
    onFavoriteToggle?.(itemId);
  };

  const tabs = [
    { label: "All views", value: 0 },
    { label: "Favorites", value: 1 },
  ];

  useEffect(() => {
    const exists = options.some((o) => String(o.id) === String(selectedKey));

    if (!exists && options.length) {
      const publicOptions = options.filter((o) => o.group === "public");
      const allOption = publicOptions.find((o) =>
        o.label.toLowerCase().startsWith("all")
      );

      if (allOption) {
        onChange?.(allOption.id);
      } else if (publicOptions.length > 0) {
        onChange?.(publicOptions[0].id);
      } else {
        onChange?.(options[0].id);
      }
    }
  }, [options, selectedKey, onChange]);


  return (
    <>
      {/* Trigger */}
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: 0.5,
          cursor: "pointer",
        }}
      >
        {!selectedLabel ? (
          <Skeleton variant="text" width={150} height={36} animation="wave" />
        ) : (
          <Typography
            variant="h4"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 180,
            }}
          >
            {selectedLabel}
          </Typography>
        )}
        <KeyboardArrowDownRoundedIcon
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.2s",
            color: "primary.main",
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            width,
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[10],
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <CommonSearchBar
            size="small"
            placeholder="Search Views"
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
            mb={0}
            mt={0}
            height={34}
          />
        </Box>

        <Divider />

        {/* Tabs */}
        <Box >
          <CommonTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            mt={0}
          />
        </Box>

        {/* List */}
        <Box sx={{ flex: 1, overflowY: "auto", maxHeight }}>
          {filteredOptions.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4,
                px: 2,
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Typography color="text.secondary" fontSize={14}>
                {activeTab === 1
                  ? "No favorite views found"
                  : search
                    ? "No views match your search"
                    : "No views available"}
              </Typography>
            </Box>
          ) : (
            ["created", "public"].map((section) =>
              grouped[section]?.length ? (
                <Box key={section}>
                  <Typography
                    fontSize={13}
                    color="text.secondary"

                    sx={{
                      backgroundColor: "primary.extraLight",
                      padding: "4px 8px",
                      borderRadius: "3px",
                      mx: 1,
                      px: 1,
                      py: 0.5,
                      mt: 0.6,
                      mb: 0.6

                    }}
                  >
                    {section === "created"
                      ? "Created by me"
                      : "Public Views"}
                  </Typography>

                  <MenuList disablePadding>
                  {grouped[section].map((item) => (
                    <MenuItem
                      key={item.id}
                      selected={selectedKey === item.id}
                      onClick={() => {
                        onChange?.(item.id);
                        handleClose();
                      }}
                      sx={{
                        borderRadius: 1,
                        height: 34,
                        my: 0.3,
                        mx: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        position: "relative",
                        "&.Mui-selected": {
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          "& .MuiTypography-root": {
                            color: "primary.contrastText",
                            fontWeight: 600,
                          },
                          "& .MuiIconButton-root, & .MuiSvgIcon-root": {
                            color: "primary.contrastText !important",
                          },
                          "& .favorite-icon": {
                            opacity: 1,
                          },
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            "& .MuiTypography-root": {
                              color: "primary.contrastText",
                            },
                            "& .MuiIconButton-root, & .MuiSvgIcon-root": {
                              color: "primary.contrastText !important",
                            },
                            "& .favorite-icon": {
                              opacity: 1,
                            },
                          },
                        },
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                          "& .MuiTypography-root": {
                            color: "primary.contrastText",
                          },
                          "& .MuiIconButton-root, & .MuiSvgIcon-root": {
                            color: "primary.contrastText !important",
                          },
                          "& .favorite-icon": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", overflow: "hidden" }}>
                        <Box
                          className="favorite-icon"
                          onClick={(e) => handleFavoriteClick(e, item.id)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            opacity: favorites.includes(item.id) ? 1 : 0,
                            transition: "opacity 0.2s",
                          }}
                        >
                          {favorites.includes(item.id) ? (
                            <StarRoundedIcon
                              sx={{
                                fontSize: 18,
                                color: "#FFB800",
                              }}
                            />
                          ) : (
                            <StarBorderRoundedIcon
                              sx={{
                                fontSize: 18,
                                color: "inherit",
                              }}
                            />
                          )}
                        </Box>

                        <Typography fontSize={14}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 124,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                      {section === "created" && (
                        <IconButton
                          size="small"
                          onClick={(e) => handleActionMenu(e, item)}
                          sx={{
                            opacity: 0.6,
                            "&:hover": { opacity: 1 }
                          }}
                        >
                          <MoreVertRoundedIcon fontSize="small" />
                        </IconButton>
                      )}
                    </MenuItem>
                  ))}
                  </MenuList>
                </Box>
              ) : null
            )
          )}
        </Box>

        {/* Footer */}
        {footerAction && (
          <>
            <Divider />
            <Box p={1}>
              <MenuList disablePadding>
              <MenuItem
                onClick={() => {
                  footerAction.onClick?.();
                  handleClose();
                }}
                sx={{
                  borderRadius: 2,
                  mt: -0.5,
                  mb: -0.5,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                {footerAction.icon}
                <Typography
                  fontSize={14}
                  color="primary.main"
                  ml={1}
                >
                  {footerAction.label}
                </Typography>
              </MenuItem>
              </MenuList>
            </Box>
          </>
        )}
      </Popover>

      {/* Action Menu Popover */}
      <Popover
        open={actionOpen}
        anchorEl={actionAnchor}
        onClose={closeActionMenu}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[3],
            backgroundColor: "background.paper",
          },
        }}
      >
        <MenuList>
        <MenuItem
          onClick={() => {
            onEdit?.(actionItem);
            closeActionMenu();
          }}
          sx={{ fontSize: 14 }}
        >
          Edit
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            onClone?.(actionItem);
            closeActionMenu();
          }}
          sx={{ fontSize: 14 }}
        >
          Clone
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            setDeleteModalOpen(true);
            setActionAnchor(null);
          }}
          sx={{ color: "error.main", fontSize: 14 }}
        >
          Delete
        </MenuItem>
        </MenuList>
      </Popover>

      <CommonDeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setActionItem(null);
        }}
        onConfirmDelete={() => {
          onDelete?.(actionItem);
          setDeleteModalOpen(false);
          setActionItem(null);
        }}
        deleting={deleting}
        title="View"
        itemType={actionItem?.label}
      />
    </>
  );
};

export default DropdownMenu;