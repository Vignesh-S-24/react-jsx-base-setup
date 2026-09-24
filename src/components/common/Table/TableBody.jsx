import React, { memo, useState } from 'react';
import { TableBody, TableRow, TableCell, Box } from '@mui/material';
import { flexRender } from '@tanstack/react-table';

const MemoizedTableRow = memo(
  ({ row, onRowClick, onCellClick, HoverComponent, showCustomize, isScrolled }) => {
    const [hover, setHover] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleRowClick = e => {
      e.stopPropagation();
      setClicked(true);

      setTimeout(() => {
        setClicked(false);
        if (onRowClick) onRowClick(row.original);
      }, 200);
    };

    return (
      <TableRow
        onClick={onRowClick ? handleRowClick : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          height: 50,
          backgroundColor: clicked ? 'action.selected' : 'transparent',
          transition: 'background-color 0.15s ease, transform 0.1s ease',
          transform: clicked ? 'scale(0.998)' : 'scale(1)',
          '&:hover': {
            backgroundColor: theme => (theme.palette.mode === 'dark' ? '#2a2a3a' : '#f5f5f5'),
          },
          '&:hover .sticky-cell': {
            backgroundColor: theme =>
              theme.palette.mode === 'dark' ? '#2a2a3a !important' : '#f5f5f5 !important',
          },
        }}
      >
        {showCustomize && (
          <TableCell
            className="sticky-cell"
            sx={{
              width: '30px',
              minWidth: '30px',
              maxWidth: '30px',
              p: 0,
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
              position: 'sticky',
              left: 0,
              zIndex: 2,
              backgroundColor: theme => theme.palette.background.paper,
              boxShadow: isScrolled ? '4px 0 8px -2px rgba(0,0,0,0.10)' : 'none',
              transition: 'background-color 0.15s ease, box-shadow 0.2s ease',
            }}
          />
        )}
        {row.getVisibleCells().map(cell => (
          <TableCell
            key={cell.id}
            className={cell.column.id === 'select' ? 'sticky-cell' : ''}
            onClick={
              onCellClick && !['select', 'actions'].includes(cell.column.id)
                ? e => {
                    e.stopPropagation();
                    onCellClick(row.original, cell.column.id);
                  }
                : undefined
            }
            sx={{
              cursor: ['select', 'actions'].includes(cell.column.id) ? 'default' : 'pointer',
              fontSize: { xs: '12px', sm: '14px' },
              color: 'text.secondary',

              maxWidth: cell.column.id === 'select' ? '50px' : 200,
              width: cell.column.id === 'select' ? '50px' : 'auto',
              py: 0.4,
              height: 50,
              transition: 'color 0.15s ease',
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
              ...(cell.column.id === 'select'
                ? {
                    position: 'sticky',
                    left: showCustomize ? '30px' : 0,
                    zIndex: 2,
                    backgroundColor: theme => theme.palette.background.paper,
                    boxShadow: isScrolled ? '4px 0 8px -2px rgba(0,0,0,0.10)' : 'none',
                    transition: 'background-color 0.15s ease, box-shadow 0.2s ease',
                  }
                : {
                    position: 'relative',
                  }),
            }}
            title={(() => {
              const val = cell.getValue();
              if (val && typeof val === 'object' && !React.isValidElement(val)) {
                return val.code || val.symbol || val.name || val.label || JSON.stringify(val);
              }
              return val?.toString() || '';
            })()}
          >
            <Box
              sx={
                ['select', 'actions'].includes(cell.column.id)
                  ? {}
                  : {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                    }
              }
            >
              {(() => {
                const content = flexRender(cell.column.columnDef.cell, cell.getContext());
                if (content && typeof content === 'object' && !React.isValidElement(content)) {
                  return content.code || content.symbol || content.name || content.label || '';
                }
                return content;
              })()}
            </Box>
          </TableCell>
        ))}
        {HoverComponent && (
          <TableCell
            sx={{
              width: '60px',
              minWidth: '60px',
              position: 'relative',
              p: 0,
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
            }}
          >
            {hover && (
              <div
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'auto',
                  zIndex: 10,
                }}
                onClick={e => e.stopPropagation()}
              >
                <HoverComponent row={row} />
              </div>
            )}
          </TableCell>
        )}
      </TableRow>
    );
  }
);

const TableBodyComponent = ({
  table,
  selectedIds,
  onRowClick,
  onCellClick,
  HoverComponent,
  showCustomize,
  isScrolled,
}) => {
  const rows = table.getRowModel().rows;

  return (
    <TableBody>
      {rows.length > 0 ? (
        rows.map(row => (
          <MemoizedTableRow
            key={row.id}
            row={row}
            selectedIds={selectedIds}
            onRowClick={onRowClick}
            onCellClick={onCellClick}
            HoverComponent={HoverComponent}
            showCustomize={showCustomize}
            isScrolled={isScrolled}
          />
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={
              table.getAllColumns().length + (showCustomize ? 1 : 0) + (HoverComponent ? 1 : 0)
            }
            align="center"
            sx={{ py: 2 }}
          >
            No Data Available
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
