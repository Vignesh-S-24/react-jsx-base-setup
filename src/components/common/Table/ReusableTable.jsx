import React, { useMemo, useState, useRef, useCallback } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableBodyComponent from './TableBody';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
} from '@mui/material';
// import CustomizeColumnsDrawer from './CustomizeColumnsDrawer';
import CustomPagination from './TablePagination';

const TOP_HEIGHT = 54;

const ReusableTable = ({
  columns,
  data,
  isLoading = false,
  selectedIds,
  onRowClick,
  onCellClick,
  skeletonRowCount = 8,
  maxHeight = 'calc(100vh - 170px)',
  sortableColumns = [],
  onSortChange,
  topComponent,
  paginationComponent,
  HoverComponent,
  module,
  viewId,
  refetch,
  // Pagination props
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setIsScrolled(containerRef.current.scrollLeft > 0);
    }
  }, []);
  const columnsMemo = useMemo(() => {
    return (
      columns?.map((col, index) => ({
        ...col,
        id: col.id || col.accessorKey || `column-${index}`,
      })) || []
    );
  }, [columns]);
  // const dataMemo = useMemo(() => data, [data]);
  const dataMemo = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: dataMemo,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
  });

  const showCustomize = !!module && !!viewId;

  const renderSkeleton = () => (
    <TableBody>
      {Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {showCustomize && (
            <TableCell sx={{ py: 0.4, width: '40px' }}>
              <Skeleton width="100%" height={34} variant="text" animation="wave" />
            </TableCell>
          )}
          {(columns.length > 1 ? columns : Array.from({ length: 5 })).map((_, colIndex) => (
            <TableCell key={colIndex} sx={{ py: 0.4 }}>
              <Skeleton width="100%" height={34} variant="text" animation="wave" />
            </TableCell>
          ))}
          {HoverComponent && <TableCell sx={{ py: 0.4, width: '60px' }} />}
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: maxHeight,
        maxHeight,
        overflow: 'hidden',
      }}
    >
      {topComponent && (
        <Box
          sx={{
            zIndex: 3,
            height: TOP_HEIGHT,
            flexShrink: 0,
            p: 0.8,
            bgcolor: 'background.paper',
            borderTop: theme => `1px solid ${theme.palette.divider}`,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
          }}
        >
          {topComponent}
        </Box>
      )}
      <TableContainer
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          position: 'relative',
          borderTop: topComponent ? 'none' : theme => `1px solid ${theme.palette.divider}`,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          '&::-webkit-scrollbar': {
            display: 'block',
            width: '5px',
            height: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: '40px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#bdbdbd',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
      >
        <Table stickyHeader>
          <TableHeader
            table={table}
            sortableColumns={sortableColumns}
            onSortChange={onSortChange}
            topOffset={0}
            onCustomizeClick={() => setDrawerOpen(true)}
            showCustomize={!!module && !!viewId}
            module={module}
            viewId={viewId}
            isScrolled={isScrolled}
            hasHoverComponent={!!HoverComponent}
          />

          {isLoading ? (
            renderSkeleton()
          ) : (
            <TableBodyComponent
              table={table}
              selectedIds={selectedIds}
              onRowClick={onRowClick}
              onCellClick={onCellClick}
              HoverComponent={HoverComponent}
              module={module}
              viewId={viewId}
              showCustomize={!!module && !!viewId}
              isScrolled={isScrolled}
            />
          )}
        </Table>
      </TableContainer>

      {paginationComponent && (
        <Box sx={{ flexShrink: 0, borderTop: theme => `1px solid ${theme.palette.divider}`, px: 1 }}>
          {paginationComponent}
        </Box>
      )}

      {count !== undefined && onPageChange && (
        <Box sx={{ flexShrink: 0, mt: 0.5, px: 1.5 }}>
          <CustomPagination
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </Box>
      )}

      {/* {module && viewId && (
        <CustomizeColumnsDrawer
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          module={module}
          viewId={viewId}
          refetch={refetch}
        />
      )} */}
    </Box>
  );
};

export default ReusableTable;
