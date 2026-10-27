import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Button,
  Badge,
  IconButton,
  Skeleton,
  useTheme,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

import { CommonCheckbox } from './Fields';
import CommonSearchBar from './Fields/SearchBar';
import ActionBar from './ActionBar';
import DropdownMenu from './DropdownMenu';
import Pagination from './Table/CustomPagination';
import StatusBadge from './Fields/StatusChip';


const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return [
    String(d.getDate()).padStart(2, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    d.getFullYear(),
  ].join('/');
};


export const SidebarListItem = React.memo(function SidebarListItem({
  item,
  contact, 
  isSelected,
  isChecked,
  onSelect,
  onCheck,
  theme: themeProp,

  title: titleProp,
  subtitle: subtitleProp,
  amount: amountProp,
  date: dateProp,
  status: statusProp,
  tag: tagProp,
  showCheckbox = true,
}) {
  const currentTheme = useTheme();
  const theme = themeProp || currentTheme;
  const data = contact || item || {};

  const title =
    titleProp !== undefined
      ? typeof titleProp === 'function' ? titleProp(data) : titleProp
      : data.customerName || data.user || data.name || data.title || data.invoiceNumber || data.orderNumber || '-';

  const amount =
    amountProp !== undefined
      ? typeof amountProp === 'function' ? amountProp(data) : amountProp
      : data.unusedCredits || data.amount || data.total || '';

  const subtitle =
    subtitleProp !== undefined
      ? typeof subtitleProp === 'function' ? subtitleProp(data) : subtitleProp
      : data.PaymentNo || data.companyName || data.email || data.code || '';

  const rawDate =
    dateProp !== undefined
      ? typeof dateProp === 'function' ? dateProp(data) : dateProp
      : data.payment_date || data.date || data.createdAt || data.invoice_date || null;
  const dateFormatted = rawDate ? formatDate(rawDate) : '';

  const status =
    statusProp !== undefined
      ? typeof statusProp === 'function' ? statusProp(data) : statusProp
      : data.status?.name || data.status;

  const tag =
    tagProp !== undefined
      ? typeof tagProp === 'function' ? tagProp(data) : tagProp
      : data.phone || data.paymentModes?.name || data.paymentModes || data.type || '';

  return (
    <React.Fragment key={data.id || data._id}>
      <ListItem
        onClick={onSelect}
        sx={{
          cursor: 'pointer',
          borderBottom: '1px solid #E9E9F8',
          borderRight: isSelected
            ? `3px solid ${theme.palette.primary.main}`
            : 'none',
          backgroundColor: isSelected ? 'background.default' : 'transparent',
          '&:hover': {
            backgroundColor: 'background.default',
          },
          flexDirection: 'column',
          alignItems: 'flex-start',
          py: 0.5,
          px: 1.5,
        }}
      >
        {/* Row 1: Checkbox + Title + Amount */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          {showCheckbox && (
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CommonCheckbox
                checked={isChecked}
                onChange={onCheck}
                onClick={(e) => e.stopPropagation()}
                mr={0}
              />
            </ListItemIcon>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: 0,
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                maxWidth: 190,
                fontSize: 14,
                fontWeight: isSelected ? 600 : 500,
                color: 'primary.main',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
              }}
            >
              {title}
            </Typography>

            {amount && (
              <Typography
                variant="body2"
                sx={{ fontSize: '0.8rem', whiteSpace: 'nowrap', color: 'text.secondary' }}
              >
                {amount}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Row 2: Subtitle • Date */}
        {(subtitle || dateFormatted) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              pl: showCheckbox ? 4.5 : 0,
              mt: -0.5,
              width: '100%',
            }}
          >
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: 13,
                  color: 'text.secondary',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {subtitle}
              </Typography>
            )}

            {subtitle && dateFormatted && (
              <Typography sx={{ fontSize: 12, color: '#B3B3C3' }}>
                •
              </Typography>
            )}

            {dateFormatted && (
              <Typography variant="body2" sx={{ fontSize: 12, color: 'text.secondary' }}>
                {dateFormatted}
              </Typography>
            )}
          </Box>
        )}

        {/* Row 3: Status Badge + Tag / Phone */}
        {(status || tag) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pl: showCheckbox ? 4.5 : 0,
              width: '100%',
              gap: 1,
              mt: 0.5,
            }}
          >
            {status ? (
              typeof status === 'string' ? (
                <StatusBadge status={status} size="small" />
              ) : (
                status
              )
            ) : (
              <Box />
            )}

            {tag && (
              <Typography
                variant="body2"
                sx={{ fontSize: 12, color: 'text.secondary', textTransform: 'capitalize', whiteSpace: 'nowrap' }}
              >
                {tag}
              </Typography>
            )}
          </Box>
        )}
      </ListItem>
      <Divider />
    </React.Fragment>
  );
});


const DefaultSkeletonList = ({ count = 6 }) => (
  <List disablePadding>
    {Array.from({ length: count }).map((_, index) => (
      <React.Fragment key={index}>
        <ListItem
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: 1.5,
            px: 1.5,
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1.5 }}>
            <Skeleton variant="rounded" width={20} height={20} sx={{ borderRadius: 1 }} />
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Skeleton width="45%" height={20} />
              <Skeleton width="25%" height={18} />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 4, width: '100%' }}>
            <Skeleton width="30%" height={16} />
            <Skeleton width="5%" height={16} />
            <Skeleton width="25%" height={16} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pl: 4,
              width: '100%',
            }}
          >
            <Skeleton width="20%" height={16} />
            <Skeleton width="30%" height={16} />
          </Box>
        </ListItem>
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

const CommonLeftSidebarDetails = ({
  // Data & List
  items = [],
  isLoading = false,
  selectedId,
  onSelectItem,
  onCheckItem,
  renderItem,
  renderSkeleton,
  skeletonCount = 6,
  emptyTitle = 'No Items Available',
  emptySubtitle = 'Try adjusting your search or filter',
  renderEmpty,

  // Item field mapping overrides (when using default built-in SidebarListItem)
  itemProps = {},

  // Selection & Bulk
  selectedIds = [],
  setSelectedIds,
  onSelectAll,
  allSelected: allSelectedProp,
  someSelected: someSelectedProp,
  bulkActions,
  onBulkDelete,
  renderActionBar,

  // Top Filter & Actions Header
  hideHeader = false,
  showFilterButton = true,
  customFilters = [],
  onSearchFilterClick,
  filterOptions = [],
  selectedFilter,
  onFilterChange,
  favorites = [],
  onFavoriteToggle,
  onEditFilter,
  onDeleteFilter,
  footerAction,
  dropdownWidth = 230,
  showNewButton = true,
  onNew,
  newButtonIcon = <AddIcon fontSize="small" />,
  newButtonSx,
  renderHeader,

  // Search
  showSearch = true,
  search = '',
  onSearchChange,
  onSearchClear,
  searchPlaceholder = 'Search...',
  searchProps = {},

  // Sub-header / Select All Bar
  showSelectAll = true,
  title = '',
  titleRight,
  renderSubHeader,

  // Pagination
  totalDocs,
  page = 1,
  limit = 10,
  onPageChange,
  onRowsPerPageChange,
  showPagination,
  renderPagination,

  // Layout & Container Styling
  width = 350,
  sx = {},
}) => {
  const theme = useTheme();
  const isBulkMode = selectedIds.length > 0;

  const allSelected = useMemo(() => {
    if (typeof allSelectedProp === 'boolean') return allSelectedProp;
    return items.length > 0 && selectedIds.length === items.length;
  }, [allSelectedProp, items.length, selectedIds.length]);

  const someSelected = useMemo(() => {
    if (typeof someSelectedProp === 'boolean') return someSelectedProp;
    return selectedIds.length > 0 && selectedIds.length < items.length;
  }, [someSelectedProp, items.length, selectedIds.length]);

  const defaultBulkActions = useMemo(() => {
    if (bulkActions) return bulkActions;
    if (onBulkDelete) {
      return [
        {
          label: 'Bulk Delete',
          color: 'error',
          onClick: onBulkDelete,
        },
      ];
    }
    return [];
  }, [bulkActions, onBulkDelete]);

  const shouldShowPagination = useMemo(() => {
    if (typeof showPagination === 'boolean') return showPagination;
    const count = typeof totalDocs === 'number' ? totalDocs : 0;
    return count > (limit || 10);
  }, [showPagination, totalDocs, limit]);

  const handleSearchClear = () => {
    if (onSearchClear) {
      onSearchClear();
    } else if (onSearchChange) {
      onSearchChange('');
    }
  };

  return (
    <Box
      sx={{
        width: typeof width === 'object' ? width : { xs: '100%', lg: width },
        minWidth: 0,
        borderRight: { lg: '1px solid #EBEBEF' },
        borderBottom: { xs: '1px solid #EBEBEF', lg: 'none' },
        flexShrink: 0,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        minHeight: 0,
        ...sx,
      }}
    >
      {/* 1. Header (Bulk Mode vs Filter/Search Header) */}
      {!hideHeader && (
        <>
          {isBulkMode ? (
            renderActionBar ? (
              renderActionBar({
                selectedCount: selectedIds.length,
                onClose: () => setSelectedIds?.([]),
                actions: defaultBulkActions,
              })
            ) : (
              <Box sx={{ mx:0.5,mt:1, borderBottom: '1px solid #EBEBEF' }}>
                <ActionBar
                  selectedCount={selectedIds.length}
                  onClose={() => setSelectedIds?.([])}
                  actions={defaultBulkActions}
                  forceMenu={true}
                />
              </Box>
            )
          ) : renderHeader ? (
            renderHeader()
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid #EBEBEF',
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {showFilterButton && (
                    <Badge
                      variant="dot"
                      color="error"
                      invisible={!customFilters?.length}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: 9,
                          height: 8,
                          minWidth: 8,
                          padding: '0 4px',
                        },
                      }}
                    >
                      <IconButton
                        onClick={onSearchFilterClick}
                        size="small"
                        sx={{
                          bgcolor: 'primary.extraLight',
                          width: 32,
                          height: 32,
                          '&:hover': {
                            bgcolor: 'primary.extraLight',
                          },
                        }}
                      >
                        <FilterListRoundedIcon
                          sx={{ color: 'primary.main', fontSize: 20 }}
                        />
                      </IconButton>
                    </Badge>
                  )}

                  {filterOptions?.length > 0 && (
                    <DropdownMenu
                      options={filterOptions}
                      selectedKey={selectedFilter}
                      onChange={onFilterChange}
                      favorites={favorites}
                      onFavoriteToggle={onFavoriteToggle}
                      width={dropdownWidth}
                      footerAction={footerAction}
                      onEdit={onEditFilter}
                      onDelete={onDeleteFilter}
                    />
                  )}
                </Box>

                {showNewButton && onNew && (
                  <Button
                    onClick={onNew}
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: 32,
                      width: 32,
                      height: 32,
                      borderRadius: '6px',
                      backgroundColor: 'primary.main',
                      textTransform: 'none',
                      color: 'primary.contrastText',
                      p: 0,
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        boxShadow: 'none',
                      },
                      ...newButtonSx,
                    }}
                  >
                    {newButtonIcon}
                  </Button>
                )}
              </Box>

              {showSearch && (
                <Box sx={{pt:1}}>
                  <CommonSearchBar
                    value={search}
                    onChange={onSearchChange}
                    onClear={handleSearchClear}
                    placeholder={searchPlaceholder}
                    height={40}
                    mt={0}
                    mb={0}
                    {...searchProps}
                  />
                </Box>
              )}
            </Box>
          )}
        </>
      )}

      {/* 2. Sub-Header / Select All Bar */}
      {showSelectAll && (
        <>
          {renderSubHeader ? (
            renderSubHeader({
              allSelected,
              someSelected,
              onSelectAll,
              title,
              titleRight,
            })
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'background.muted',
                px: 1.5,
                py: 0.5,
                flexShrink: 0,
                borderBottom: '1px solid #E9E9F8',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0 }}>
                {onSelectAll && (
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CommonCheckbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={onSelectAll}
                      mr={0}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </ListItemIcon>
                )}

                {title && (
                  <Typography
                    sx={{
                      flexGrow: 1,
                      textTransform: 'uppercase',
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {title}
                  </Typography>
                )}
              </Box>

              {titleRight && <Box>{titleRight}</Box>}
            </Box>
          )}
        </>
      )}

      {/* 3. Items List Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <List disablePadding>
          {isLoading ? (
            renderSkeleton ? (
              renderSkeleton()
            ) : (
              <DefaultSkeletonList count={skeletonCount} />
            )
          ) : items.length === 0 ? (
            renderEmpty ? (
              renderEmpty()
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 10,
                  px: 2,
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                <Typography variant="body2">{emptyTitle}</Typography>
                {(search || customFilters?.length > 0) && (
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    {emptySubtitle}
                  </Typography>
                )}
              </Box>
            )
          ) : renderItem ? (
            items.map((item, index) => {
              const itemId = item._id || item.id;
              const isSelected = selectedId !== undefined ? String(selectedId) === String(itemId) : selectedIds?.includes(itemId);
              const isChecked = selectedIds?.includes(itemId);

              return renderItem(item, index, {
                isSelected,
                isChecked,
                onSelect: onSelectItem ? () => onSelectItem(item) : undefined,
                onCheck: onCheckItem ? () => onCheckItem(itemId) : undefined,
              });
            })
          ) : (
            // Default built-in SidebarListItem rendering when renderItem is not provided
            items.map((item) => {
              const itemId = item._id || item.id;
              const isSelected = selectedId !== undefined ? String(selectedId) === String(itemId) : selectedIds?.includes(itemId);
              const isChecked = selectedIds?.includes(itemId);

              return (
                <SidebarListItem
                  key={itemId}
                  item={item}
                  isSelected={isSelected}
                  isChecked={isChecked}
                  theme={theme}
                  onSelect={onSelectItem ? () => onSelectItem(item) : undefined}
                  onCheck={onCheckItem ? () => onCheckItem(itemId) : undefined}
                  {...itemProps}
                />
              );
            })
          )}
        </List>
      </Box>

      {/* 4. Bottom Pagination */}
      {shouldShowPagination && (
        <>
          {renderPagination ? (
            renderPagination({
              totalDocs,
              page,
              limit,
              onPageChange,
              onRowsPerPageChange,
            })
          ) : (
            <Box
              sx={{
                p: 1,
                borderTop: '1px solid #EBEBEF',
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box',
                flexShrink: 0,
                '& .MuiTypography-root': { fontSize: 12 },
                '& .MuiButtonBase-root': { padding: '4px' },
              }}
            >
              <Pagination
                count={totalDocs || 0}
                page={Math.max(0, page - 1)}
                rowsPerPage={limit}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CommonLeftSidebarDetails;
