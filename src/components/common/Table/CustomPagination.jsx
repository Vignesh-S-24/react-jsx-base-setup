import React from "react";
import { Box, Typography, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const Pagination = ({
  count = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 20, 50, 100]
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRowsPerPageChange = (option) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange({ target: { value: option } });
    }
    handleMenuClose();
  };

  const start = count === 0 ? 0 : page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, count);
  const totalPages = Math.max(1, Math.ceil(count / rowsPerPage));

  const handlePrevPage = (e) => {
    if (page > 0 && onPageChange) {
      onPageChange(e, page - 1);
    }
  };

  const handleNextPage = (e) => {
    if (page < totalPages - 1 && onPageChange) {
      onPageChange(e, page + 1);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <Typography sx={{ fontSize: '14px', color: 'text.primary', fontWeight: 500 }}>
        Total Count: <Typography component="span" sx={{ color: 'primary.main', fontWeight: 500, cursor: 'pointer' }}>{count}</Typography>
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}>
        {/* Settings and Rows Per Page */}
        <Box
          onClick={handleMenuClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
            py: 1,
            cursor: 'pointer',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            }
          }}
        >
          <SettingsOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: '14px', color: 'text.primary', fontWeight: 500 }}>
            {rowsPerPage} per page
          </Typography>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          disableScrollLock
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 120,
              p: 0.5,
            },
          }}
          MenuListProps={{
            sx: {
              py: 0.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.3,
            },
          }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem
              key={option}
              selected={option === rowsPerPage}
              onClick={() => handleRowsPerPageChange(option)}
              sx={{
                fontSize: "14px",
                borderRadius: 1,
                minHeight: 32,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* Pagination Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="small"
            onClick={handlePrevPage}
            disabled={page === 0}
            sx={{
              color: 'primary.main',
              '&.Mui-disabled': { 
                color: 'primary.main',
                opacity: 0.5 
              }
            }}
          >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </IconButton>

          <Typography sx={{ fontSize: '14px', color: 'text.primary', fontWeight: 500, minWidth: '55px', textAlign: 'center' }}>
            {start} - {end}
          </Typography>

          <IconButton
            size="small"
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            sx={{
              color: 'primary.main',
              '&.Mui-disabled': { 
                color: 'primary.main',
                opacity: 0.5 
              }
            }}
          >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;