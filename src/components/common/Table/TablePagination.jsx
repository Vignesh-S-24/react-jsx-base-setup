import { TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomPagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[10, 20, 50, 100]}
      SelectProps={{
        variant: 'outlined',
        size: 'small',
        sx: {
          height: '36px',
          borderRadius: '10px',
          bgcolor: 'background.paper',
          mx: 1,
          cursor: 'pointer',
          boxShadow: 'none !important',
          outline: 'none !important',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
          '&.Mui-focused': {
            boxShadow: 'none !important',
            outline: 'none !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.divider} !important`,
            borderRadius: '10px !important',
            borderWidth: '1px !important',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.divider} !important`,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.divider} !important`,
            borderWidth: '1px !important',
          },
          '& .MuiSelect-select': {
            py: '0 !important',
            height: '34px !important',
            lineHeight: '34px !important',
            pl: '12px !important',
            pr: '28px !important',
            fontSize: '13px',
            fontWeight: 500,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            outline: 'none !important',
            boxShadow: 'none !important',
          },
          '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent !important',
            outline: 'none !important',
            boxShadow: 'none !important',
          },
          '& .MuiSelect-icon': {
            color: 'text.secondary',
            fontSize: '18px',
            right: '6px',
          },
        },
      }}
      sx={{
        minHeight: 40,
        p: 0,

        // Toolbar
        '& .MuiTablePagination-toolbar': {
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 0,
          gap: 1,
          [theme.breakpoints.down('sm')]: {
            minHeight: 'auto',
            py: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          },
        },

        // Remove default spacer
        '& .MuiTablePagination-spacer': {
          display: 'none',
        },

        // Rows per page label
        '& .MuiTablePagination-selectLabel': {
          margin: 0,
          color: theme.palette.text.secondary,
          fontSize: '13px',
          fontWeight: 400,
        },

        // Select input container
        '& .MuiTablePagination-selectRoot, & .MuiTablePagination-input': {
          margin: '0 8px',
        },

        // "1–10 of 79"
        '& .MuiTablePagination-displayedRows': {
          margin: 0,
          marginLeft: 'auto',
          color: theme.palette.text.primary,
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
        },

        // Pagination buttons container
        '& .MuiTablePagination-actions': {
          marginLeft: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },

        // Previous / Next buttons
        '& .MuiTablePagination-actions button': {
          width: 36,
          height: 36,
          margin: 0,
          padding: 0,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-disabled': {
            color: theme.palette.text.disabled,
            borderColor: theme.palette.divider,
            opacity: 1,
          },
        },

        // Pagination icons
        '& .MuiTablePagination-actions svg': {
          fontSize: 20,
        },
      }}
    />
  );
};

export default CustomPagination;
