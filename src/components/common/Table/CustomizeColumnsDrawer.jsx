import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CommonDrawer from '../NdeDrawer';
import CommonCheckbox from '../Fields/NdeCheckbox';
import CommonSearchBar from '../Fields/NdeSearchBar';
import {
  useCustomerFiltersHeader,
  useUpdateCustomViewHeaders,
} from '../../../hooks/customView/useCustomViewHooks';

const CustomizeColumnsDrawer = ({ open, onClose, module, viewId, refetch }) => {
  // const { data: availableFields } = useAvailableFields(module);
  const updateHeaders = useUpdateCustomViewHeaders();

  const { data: availableFields } = useCustomerFiltersHeader(module, viewId, {
    enabled: open,
  });

  const [search, setSearch] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const resetToInitial = () => {
    if (availableFields) {
      const initial =
        availableFields?.data?.map(f => ({
          field_id: f._id,
          label: f.label,
          is_pinned: f.is_pinned || false,
          selected: f.is_mandatory ? true : f.is_visible || false,
          is_mandatory: f.is_mandatory || false,
          display_order: f.display_order || 0,
          sort_direction: f.sort_direction || null,
        })) || [];

      initial.sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return (a.display_order || 0) - (b.display_order || 0);
      });

      setSelectedFields(initial);
    }
  };

  useEffect(() => {
    resetToInitial();
  }, [availableFields]);

  const filteredFields = useMemo(() => {
    return selectedFields.filter(f => f.label.toLowerCase().includes(search.toLowerCase()));
  }, [selectedFields, search]);

  const handleToggleField = fieldId => {
    setSelectedFields(prev =>
      prev.map(f =>
        f.field_id === fieldId && !f.is_mandatory ? { ...f, selected: !f.selected } : f
      )
    );
  };

  const handleTogglePin = fieldId => {
    setSelectedFields(prev => {
      const fieldIndex = prev.findIndex(f => f.field_id === fieldId);
      if (fieldIndex === -1) return prev;

      const field = prev[fieldIndex];
      const pinnedCount = prev.filter(f => f.is_pinned).length;

      if (!field.is_pinned && pinnedCount >= 3) {
        return prev;
      }

      const newIsPinned = !field.is_pinned;
      const updatedItem = {
        ...field,
        is_pinned: newIsPinned,
        selected: newIsPinned ? true : field.selected, // Auto-select if pinning
      };

      let newFields = [...prev];
      newFields.splice(fieldIndex, 1);

      if (newIsPinned) {
        // Move to the very top
        newFields.unshift(updatedItem);
      } else {
        // Move to the start of the available section (after pinned)
        const insertIndex = newFields.findIndex(f => !f.is_pinned);
        if (insertIndex === -1) {
          newFields.push(updatedItem);
        } else {
          newFields.splice(insertIndex, 0, updatedItem);
        }
      }

      return newFields;
    });
  };

  const handleDragStart = index => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = index => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const items = Array.from(selectedFields);
    const draggedItem = filteredFields[draggedIndex];
    const targetItem = filteredFields[index];

    if (!draggedItem || !targetItem || draggedItem.is_pinned || targetItem.is_pinned) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const fromIndex = items.findIndex(f => f.field_id === draggedItem.field_id);
    const toIndex = items.findIndex(f => f.field_id === targetItem.field_id);

    if (fromIndex !== -1 && toIndex !== -1) {
      const [reorderedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, reorderedItem);
      setSelectedFields(items);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = () => {
    const payload = {
      selectedFields: selectedFields
        .filter(f => f.selected)
        .map((f, index) => ({
          field_id: f.field_id,
          is_pinned: f.is_pinned,
          is_visible: f.selected,
          display_order: index + 1,
          sort_direction: f.sort_direction,
          is_mandatory: f.is_mandatory,
        })),
    };

    updateHeaders.mutate(
      { viewId, data: payload, module },
      {
        onSuccess: () => {
          refetch?.();
          onClose();
        },
      }
    );
  };

  const selectedCount = selectedFields.filter(f => f.selected).length;
  const totalCount = selectedFields.length;

  const handleCancel = () => {
    resetToInitial();
    onClose();
  };

  const actions = [
    {
      label: 'Cancel',
      onClick: handleCancel,
      variant: 'outlined',
      color: 'inherit',
    },
    {
      label: 'Save',
      onClick: handleSave,
      variant: 'contained',
      color: 'primary',
      loading: updateHeaders.isLoading,
    },
  ];

  return (
    <CommonDrawer
      open={open}
      onClose={onClose}
      title="Customize Columns"
      actions={actions}
      width={400}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {selectedCount} of {totalCount} Selected
        </Typography>
      </Box>

      <CommonSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch('')}
        placeholder="Search Columns"
        sx={{ mb: 2 }}
        mt={0}
      />

      <List sx={{ pt: 0 }}>
        {(() => {
          const pinnedCount = filteredFields.filter(f => f.is_pinned).length;
          return filteredFields.map((field, index) => {
            const isFirstPinned =
              field.is_pinned && (index === 0 || !filteredFields[index - 1].is_pinned);
            const isFirstAvailable =
              !field.is_pinned && (index === 0 || filteredFields[index - 1].is_pinned);

            return (
              <React.Fragment key={field.field_id}>
                {isFirstPinned && (
                  <Box sx={{ ml: 1, mb: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        display: 'block',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Pinned Columns
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      You can pin up to 3 columns at a time
                    </Typography>
                  </Box>
                )}
                {isFirstAvailable && (
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 1,
                      mb: 1,
                      mt: index === 0 ? 0 : 2,
                      display: 'block',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Available Columns
                  </Typography>
                )}
                <ListItem
                  key={field.field_id}
                  disablePadding
                  draggable={!search && !field.is_pinned}
                  onDragStart={e => {
                    if (field.is_pinned) {
                      e.preventDefault();
                      return;
                    }
                    handleDragStart(index);
                  }}
                  onDragOver={e => {
                    if (field.is_pinned) return;
                    handleDragOver(e, index);
                  }}
                  onDragEnd={handleDragEnd}
                  onDrop={() => handleDrop(index)}
                  sx={{
                    mb: 1,
                    bgcolor: draggedIndex === index ? 'action.hover' : 'background.paper',
                    border: '1px solid',
                    borderColor:
                      dragOverIndex === index && !field.is_pinned ? 'primary.main' : 'divider',
                    height: '34px',
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    opacity: draggedIndex === index ? 0.5 : 1,
                    transform:
                      dragOverIndex === index && !field.is_pinned ? 'translateY(-2px)' : 'none',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      '& .pin-action-button': { opacity: 1 },
                    },
                    cursor: search || field.is_pinned ? 'default' : 'grab',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      ml: 1,
                      cursor: search || field.is_pinned ? 'default' : 'grab',
                    }}
                  >
                    {/* {!field.is_pinned && ( */}
                    <DragIndicatorIcon fontSize="small" color={search ? 'disabled' : 'action'} />
                    {/* )} */}
                  </ListItemIcon>

                  {field.is_mandatory ? (
                    <Tooltip
                      title="This is a mandatory field, you cannot remove it."
                      arrow
                      placement="top"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LockIcon
                          sx={{ fontSize: 16, color: 'text.disabled', ml: -0.3, mr: 1.5 }}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <CommonCheckbox
                      checked={field.selected}
                      onChange={() => handleToggleField(field.field_id)}
                      sx={{ mr: 0.5 }}
                      inputProps={{ 'data-no-dirty': true }}
                    />
                  )}

                  <ListItemText
                    primary={field.label}
                    primaryTypographyProps={{
                      variant: 'body1',
                    }}
                  />

                  <IconButton
                    size="small"
                    className="pin-action-button"
                    onClick={() => handleTogglePin(field.field_id)}
                    disabled={!field.is_pinned && pinnedCount >= 3}
                    sx={{
                      mr: 1,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      color: field.is_pinned ? 'primary.main' : 'text.disabled',
                      '&.Mui-disabled': {
                        color: 'action.disabled',
                        opacity: 0.1,
                      },
                    }}
                    title={field.is_pinned ? 'Unpin Column' : 'Pin Column'}
                  >
                    {field.is_pinned ? (
                      <PushPinIcon sx={{ fontSize: 18, transform: 'rotate(45deg)' }} />
                    ) : (
                      <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </ListItem>
              </React.Fragment>
            );
          });
        })()}
      </List>
    </CommonDrawer>
  );
};

export default CustomizeColumnsDrawer;
