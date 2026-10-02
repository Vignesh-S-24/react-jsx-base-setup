import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Popover,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
  IconButton,
  alpha,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { menuItems } from './menuConfig';
import { IconChevronDown, IconChevronUp, IconCollapse } from './menuIcons';

export default function Sidebar() {
  const theme = useTheme();

  const [expandedItem, setExpandedItem] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverItems, setPopoverItems] = useState([]);
  const [popoverTitle, setPopoverTitle] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const isMobileOrTablet = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    setCollapsed(isMobileOrTablet);
  }, [isMobileOrTablet]);

  const isActive = (path, activePaths) => {
    if (activePaths && activePaths.length > 0) {
      return activePaths.some(
        p => location.pathname === p || location.pathname.startsWith(p + '/')
      );
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  useEffect(() => {
    const activeParent = menuItems.find(
      item => item.expandable && item.subItems?.some(sub => isActive(sub.path, sub.activePaths))
    );
    if (activeParent) setExpandedItem(activeParent.text);
  }, [location.pathname]);

  const handleToggle = text => setExpandedItem(prev => (prev === text ? '' : text));

  const handleNavigation = path => {
    if (location.pathname === path) return;
    navigate(path);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverItems([]);
  };

  const handleCollapseToggle = () => {
    if (!collapsed) setExpandedItem('');
    setCollapsed(prev => !prev);
  };

  const activeBgColor = theme.palette.primary.main;
  const activeTextColor = theme.palette.primary.contrastText;

  const sidebarBg = theme.palette.sidebar.bg;
  const sidebarHover = theme.palette.sidebar.hover;
  const sidebarDivider = theme.palette.sidebar.divider;
  const defaultTextColor = theme.palette.sidebar.text;
  const mutedTextColor = theme.palette.sidebar.mutedText;


  const renderMenu = () => (
    <Box
      sx={{
        width: collapsed ? 80 : 240,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        backgroundColor: sidebarBg,
        borderRight: `1px solid ${sidebarDivider}`,
      }}
    >

      {/* ── Scrollable Menu ── */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          pt: 1
        }}
      >
        <List sx={{ width: '100%', px: collapsed ? 1 : 1 }}>
          {menuItems.map((item, index) => {
            if (item.type === 'divider') {
              return <Divider key={index} sx={{ my: 1, borderColor: sidebarDivider }} />;
            }
            if (item.type === 'header') {
              if (collapsed) return null;
              return (
                <Typography
                  key={index}
                  variant="overline"
                  sx={{ px: 2, pt: 1, pb: 0.5, color: mutedTextColor, fontWeight: 600, letterSpacing: 1, display: 'block', lineHeight: 1 }}
                >
                  {item.label}
                </Typography>
              );
            }

            const visibleSubItems = item.subItems || [];

            if (item.expandable && visibleSubItems.length === 0) {
              return null;
            }

            const hasActiveChild = item.expandable && visibleSubItems?.some(sub => isActive(sub.path, sub.activePaths));
            const parentActive = hasActiveChild || (!item.expandable && isActive(item.path, item.activePaths));

            const themedIcon = item.icon ? React.cloneElement(item.icon, {
              size: collapsed ? 20 : 18,
            }) : null;

            return (
              <React.Fragment key={item.text || index}>
                {collapsed ? (
                  /* ── Collapsed Item ── */
                  <Box
                    onClick={e => {
                      if (item.expandable) {
                        setAnchorEl(e.currentTarget);
                        setPopoverItems(visibleSubItems || []);
                        setPopoverTitle(item.text);
                      } else {
                        handleNavigation(item.path);
                      }
                    }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                      mb: 0.5,
                      py: 1,
                      px: 0.5,
                      cursor: 'pointer',
                      borderRadius: 1,
                      color: parentActive ? activeTextColor : defaultTextColor,
                      backgroundColor: parentActive ? activeBgColor : 'transparent',
                      '&:hover': { backgroundColor: parentActive ? activeBgColor : sidebarHover },
                    }}
                  >
                    {themedIcon}
                   <Box
                      sx={{
                        width: '100%',
                        minWidth: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          color: parentActive ? activeTextColor : defaultTextColor,
                          mt: 0.5,
                          textAlign: 'center',
                          lineHeight: 1.2,
                          width: '100%',
                          minWidth: 0,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                    {item.expandable && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          width: 0,
                          height: 0,
                          borderLeft: '6px solid transparent',
                          borderBottom: `6px solid ${defaultTextColor}`,
                          opacity: 0.6,
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  /* ── Expanded Item ── */
                  (() => {
                    const isExpandedActive = item.expandable && parentActive && expandedItem === item.text;
                    const isSolidActive = parentActive && !isExpandedActive;

                    return (
                      <>
                        <ListItemButton
                          onClick={() => {
                            if (item.expandable) handleToggle(item.text);
                            else handleNavigation(item.path);
                          }}
                          sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            py: 0.5,
                            px: 2,
                            color: isSolidActive ? activeTextColor : defaultTextColor,
                            backgroundColor: isSolidActive ? activeBgColor : (isExpandedActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent'),
                            '&:hover': { backgroundColor: isSolidActive ? activeBgColor : alpha(theme.palette.primary.main, 0.12) },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36, color: isSolidActive ? activeTextColor : defaultTextColor }}>
                            {themedIcon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontSize: '0.9rem',
                                  fontWeight: parentActive ? 600 : 500,
                                  color: isSolidActive ? activeTextColor : defaultTextColor,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                },
                              },
                            }}
                          />
                          {item.expandable && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {expandedItem === item.text ? (
                                <IconChevronUp size={16} color={isSolidActive ? activeTextColor : defaultTextColor} />
                              ) : (
                                <IconChevronDown size={16} color={isSolidActive ? activeTextColor : defaultTextColor} />
                              )}
                            </Box>
                          )}
                        </ListItemButton>

                    {/* Sub Items */}
                    {item.expandable && (
                      <Collapse in={expandedItem === item.text} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ mb: 1 }}>
                          {visibleSubItems.map(sub => {
                            const active = isActive(sub.path, sub.activePaths);
                            return (
                              <ListItemButton
                                key={sub.label}
                                onClick={() => handleNavigation(sub.path)}
                                sx={{
                                  pl: 6.5,
                                  py: 0.5,
                                  mb: 0.5,
                                  borderRadius: 1,
                                  position: 'relative',
                                  color: active ? activeTextColor : defaultTextColor,
                                  backgroundColor: active ? activeBgColor : 'transparent',
                                  '&:hover': { backgroundColor: active ? activeBgColor : alpha(theme.palette.primary.main, 0.08) },
                                  '&:hover .add-icon-btn': {
                                    opacity: 1,
                                  },
                                }}
                              >
                              <ListItemText
                                primary={sub.label}
                                sx={{
                                  m: 0,
                                  minWidth: 0,
                                  flex: 1,
                                  overflow: 'hidden',
                                  pr: sub.addPath ? 4.5 : 0,
                                }}
                                slotProps={{
                                  primary: {
                                    sx: {
                                      display: 'block',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontWeight: 500,
                                    },
                                  },
                                }}
                              />
                                {sub.addPath && (
                                  <IconButton
                                    className="add-icon-btn"
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNavigation(sub.addPath);
                                    }}
                                    sx={{
                                      opacity: 0,
                                      transition: 'opacity 0.2s, background-color 0.2s',
                                      p: 0.4,
                                      position: 'absolute',
                                      right: 8,
                                      borderRadius: 1,
                                      color: active ? activeTextColor : theme.palette.primary.main,
                                      backgroundColor: active ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.primary.main, 0.1),
                                      '&:hover': {
                                        backgroundColor: active ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.primary.main, 0.2),
                                      }
                                    }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="12" height="12" fill="currentColor">
                                      <path d="M416 226H286V96c0-16.6-13.4-30-30-30s-30 13.4-30 30v130H96c-16.6 0-30 13.4-30 30s13.4 30 30 30h130v130c0 16.6 13.4 30 30 30s30-13.4 30-30V286h130c16.6 0 30-13.4 30-30s-13.4-30-30-30"/>
                                    </svg>
                                  </IconButton>
                                )}
                              </ListItemButton>
                            );
                          })}
                        </List>
                      </Collapse>
                    )}
                  </>
                  );
                })()
                )}
              </React.Fragment>
            );
          })}
        </List>

        {/* ── Collapsed Popover ── */}
       <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                // borderRadius: 2,
                minWidth: 200,
                ml: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.24)',
                border: `1px solid ${sidebarDivider}`,
                bgcolor: sidebarBg,
              },
            },
          }}
        >
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: mutedTextColor,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {popoverTitle}
            </Typography>
          </Box>

          <List dense sx={{ px: 1, pb: 1 }}>
            {popoverItems.map((sub) => {
              const active = isActive(sub.path, sub.activePaths);

              return (
                <ListItemButton
                  key={sub.label}
                  onClick={() => {
                    handleNavigation(sub.path);
                    handlePopoverClose();
                  }}
                  sx={{
                    borderRadius: 1,
                    mb: 0.25,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: active ? activeBgColor : 'transparent',
                    '&:hover': {
                      bgcolor: active ? activeBgColor : sidebarHover,
                    },
                  }}
                >
                  <ListItemText
                    primary={sub.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: active ? activeTextColor : defaultTextColor,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Popover>
      </Box>

      {/* ── Expand/Collapse Footer ── */}
      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-end',
          color: defaultTextColor,
          // borderTop: `1px solid ${sidebarDivider}`,
          // backgroundColor: alpha(theme.palette.primary.main, 0.14),
          //   p: 0.75,
          //   '&:hover': {
          //     backgroundColor: alpha(theme.palette.primary.main, 0.22),
          //   }
        }}
      >
        <IconButton
          onClick={handleCollapseToggle}
          size="small"
          sx={{
            color: defaultTextColor,
          }}
        >
          <Box sx={{
            display: 'flex',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}>
            <IconCollapse size={18} />
          </Box>
        </IconButton>
      </Box>
    </Box>
  );

  return renderMenu();
}
