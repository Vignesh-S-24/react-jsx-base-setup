import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropdownMenu from './DropdownMenu';

const ListFilterHeader = ({ title = 'All Invoices', onNewClick, onMoreActionsClick }) => {
  const [selectedView, setSelectedView] = useState('all');

  const viewOptions = [
    { id: 'all', label: title, group: 'public' },
    { id: 'favorites', label: 'Favorites', group: 'public' }
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
      <Box  sx={{ flexGrow: 1 }}>
        <DropdownMenu
          options={viewOptions}
          selectedKey={selectedView}
          onChange={setSelectedView}
        />
      </Box>

      <Box  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box  sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onNewClick}
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, textTransform: 'none' }}
          >
            New
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, minWidth: '40px', px: 1, borderLeft: '1px solid rgba(255,255,255,0.2)' }}
          >
            <KeyboardArrowDownIcon />
          </Button>
        </Box>

        <Box>
          <IconButton
            onClick={onMoreActionsClick}
            sx={{ bgcolor: 'action.hover', borderRadius: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ListFilterHeader;
