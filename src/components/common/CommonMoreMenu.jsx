import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, useTheme, Box, Typography, Divider } from '@mui/material';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CommonMoreMenu = ({
  menuOptions = [],
  value = '',
  onChange,
  icon,
  label = 'More',
  iconView = true,
  sx,
  buttonSx,
  menuSx,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (option) => {
    option?.onClick?.(option.value);
    onChange?.(option.value);
    handleClose();
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          px: label ? 1 : 0.8,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          height: 32,
          width: 'fit-content',
          bgcolor: 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
          },
          ...buttonSx,
          ...sx,
        }}
      >
        {label && <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>{label}</Typography>}
        {icon ? icon : iconView && <ArrowDropDownIcon fontSize="small" />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '6px',
            minWidth: 120,
            boxShadow: (theme) => theme.shadows[3],
            border: (theme) => `1px solid ${theme.palette.divider}`,
            '& .MuiMenu-list': {
              paddingTop: 0.5,
              paddingBottom: 0.5,
            },
            ...menuSx,
          },
        }}
      >
        {menuOptions.map((option, index) => {
          if (option.isDivider) {
            return <Divider key={`divider-${index}`} sx={{ my: 0.5 }} />;
          }

          if (option.isHeader) {
            return (
              <Box key={`header-${index}`} sx={{ px: 2, py: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontWeight: 500, letterSpacing: 0.5 }}
                >
                  {option.label}
                </Typography>
              </Box>
            );
          }

          const isSelected = value === option.value;

          return (
            <MenuItem
              key={option.value || index}
              onClick={() => handleSelect(option)}
              disabled={option.disabled || false}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                borderRadius: '6px',
                color: isSelected ? 'primary.main' : 'text.primary',
                mx: 0.5,
                my: 0.2,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              {option.icon && (
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: 'inherit' }}>
                  {option.icon}
                </ListItemIcon>
              )}

              <Box sx={{ flexGrow: 1 }}>{option.label}</Box>

              {option.sortDirection && (
                <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                  <SouthRoundedIcon
                    fontSize="small"
                    sx={{
                      transform: option.sortDirection === 'asc' ? 'rotate(180deg)' : 'none',
                      color: isSelected ? 'primary.main' : 'text.secondary',
                    }}
                  />
                </ListItemIcon>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default CommonMoreMenu;
