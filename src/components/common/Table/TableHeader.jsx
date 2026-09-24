import React, { useState } from 'react';
import { TableHead, TableRow, TableCell, Box, IconButton, Tooltip } from '@mui/material';
import { flexRender } from '@tanstack/react-table';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import TuneIcon from '@mui/icons-material/Tune';

const TableHeader = ({
  table,
  sortableColumns = [],
  onSortChange,
  topOffset = 0,
  onCustomizeClick,
  showCustomize = false,
  isScrolled = false,
  hasHoverComponent = false,
}) => {
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const handleSortClick = (columnId, ascending = null) => {
    let newAscending = true;

    if (ascending !== null) {
      newAscending = ascending;
    } else if (sortedColumn === columnId) {
      newAscending = !sortAscending;
    }

    setSortedColumn(columnId);
    setSortAscending(newAscending);
    onSortChange?.(columnId, newAscending ? 'asc' : 'desc');
  };

  return (
    <TableHead>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {showCustomize && (
            <TableCell
              sx={{
                top: topOffset,
                width: '30px',
                minWidth: '30px',
                maxWidth: '30px',
                p: 0,
                textAlign: 'center',
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                position: 'sticky',
                left: 0,
                zIndex: 4,
                bgcolor: 'background.muted',
                boxShadow: isScrolled ? '4px 0 8px -2px rgba(0,0,0,0.15)' : 'none',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <Tooltip title="Customize Columns">
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    onCustomizeClick();
                  }}
                  sx={{
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'primary.lighter' },
                  }}
                >
                  <TuneIcon fontSize="small" sx={{ fontSize: '18px', color: 'primary.main' }} />
                </IconButton>
              </Tooltip>
            </TableCell>
          )}
          {headerGroup.headers.map(header => {
            const columnId = header.column.id;
            const isSortable = sortableColumns.includes(columnId);
            const isActive = sortedColumn === columnId;

            return (
              <TableCell
                key={header.id}
                sx={{
                  top: topOffset,
                  bgcolor: 'background.muted',
                  fontSize: '13px',
                  color: theme => (theme.palette.mode === 'dark' ? 'text.secondary' : 'grey.800'),
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  height: '40px',
                  p: 0.1,
                  borderBottom: theme => `1px solid ${theme.palette.divider}`,
                  textTransform: 'uppercase',
                  cursor: isSortable ? 'pointer' : 'default',
                  ...(columnId === 'select' && {
                    pl: 2,
                    width: '50px',
                    minWidth: '50px',
                    maxWidth: '50px',
                    position: 'sticky',
                    left: showCustomize ? '30px' : 0,
                    zIndex: 4,
                    boxShadow: isScrolled ? '4px 0 8px -2px rgba(0,0,0,0.15)' : 'none',
                    transition: 'box-shadow 0.2s ease',
                  }),
                }}
                onClick={() => isSortable && handleSortClick(columnId)}
              >
                {header.isPlaceholder ? null : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      ml: columnId === 'select' ? 0 : 1.5,
                    }}
                  >
                    {(() => {
                      const content = flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      );
                      if (
                        content &&
                        typeof content === 'object' &&
                        !React.isValidElement(content)
                      ) {
                        return content.name || content.label || content.title || '';
                      }
                      return content;
                    })()}
                    {isSortable && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 0 }}>
                        <KeyboardArrowUpRoundedIcon
                          fontSize="small"
                          sx={{
                            color: isActive && sortAscending ? 'primary.main' : 'grey.400',
                            cursor: 'pointer',
                            mb: '-7px',
                          }}
                          onClick={() => handleSortClick(columnId, true)}
                        />
                        <KeyboardArrowDownRoundedIcon
                          fontSize="small"
                          sx={{
                            color: isActive && !sortAscending ? 'primary.main' : 'grey.400',
                            cursor: 'pointer',
                            mt: '-5px',
                          }}
                          onClick={() => handleSortClick(columnId, false)}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              </TableCell>
            );
          })}
          {hasHoverComponent && (
            <TableCell
              sx={{
                bgcolor: 'background.muted',
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                width: '60px',
                minWidth: '60px',
                p: 0,
              }}
            />
          )}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
