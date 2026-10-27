import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Badge, IconButton, Stack } from '@mui/material';
import CommonCheckbox from '../../components/common/Fields/Checkbox';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ReusableTable from '../../components/common/Table/ReusableTable';
import TableAvatarCell from '../../components/common/TableAvatarCell';
import DropdownMenu from '../../components/common/DropdownMenu';
import ActionBar from '../../components/common/ActionBar';
import ContactInlineFilter from '../../components/common/ContactInlineFilter';
import CommonSearchBar from '../../components/common/Fields/SearchBar';
import StatusBadge from '../../components/common/Fields/StatusChip';
import CommonButton from '../../components/common/Fields/Button';
import CommonNestedMenu from '../../components/common/CommonNestedMenu';

export const mockContactsData = [
  { id: '1', customerName: 'Dharani', email: 'dharanijayan004@gmail.com', status: 'Active', companyName: 'dj', phone: '+917358987445', country: '-', unusedCredits: '₹0' },
  { id: '2', customerName: 'Uthes', email: 'rave5speed@gmail.com', status: 'Active', companyName: 'NDE', phone: '+919789796506', country: 'India', unusedCredits: '₹0' },
  { id: '3', customerName: 'Priya Sharma', email: 'sharmapriya@zohomail.in', status: 'Inactive', companyName: 'SkybridgeInfotech Pvt Ltd', phone: '+916898747667', country: 'India', unusedCredits: '₹400' },
  { id: '4', customerName: 'Sathish Testings', email: 'sathisharc78@gmail.com', status: 'Active', companyName: 'tesing tech', phone: '+918987876767', country: 'India', unusedCredits: '₹130' },
  { id: '5', customerName: 'Henry B', email: 'henry@yahoo.com', status: 'Inactive', companyName: 'Bluewave Technologies P...', phone: '+919876543239', country: 'India', unusedCredits: '₹0' },
  { id: '6', customerName: 'Klijhugytfrdes B', email: 'iudfs@gmail.com', status: 'Active', companyName: 'lijhkurdfs', phone: '+919876543234', country: 'India', unusedCredits: '₹0' },
  { id: '7', customerName: 'Boopathi', email: 'boopathiperiyasamy2@g...', status: 'Active', companyName: 'laaxin', phone: '+919024255221', country: '-', unusedCredits: '₹0' },
  { id: '8', customerName: 'Arun', email: 'adarunkumar464@gmail....', status: 'Active', companyName: 'Arun Tech', phone: '+919898767656', country: 'India', unusedCredits: '₹3000' },
  { id: '9', customerName: 'Vishwa', email: 'vishwa56432@gmail.com', status: 'Active', companyName: 'laaxin Tech', phone: '+919360332579', country: 'India', unusedCredits: '₹0' },
  { id: '10', customerName: 'Qwertfeds B', email: 'dyuewhfwh@gmail.com', status: 'Inactive', companyName: 'wfwfwre', phone: '+919876543345', country: 'India', unusedCredits: '₹0' },
];

export const mockFilterFields = [
  { name: 'customerName', label: 'Customer Name', operators: [{ name: 'Contains', value: 'contains' }, { name: 'Equals', value: 'equals' }] },
  { name: 'email', label: 'Email', operators: [{ name: 'Contains', value: 'contains' }] },
  { name: 'status', label: 'Status', operators: [{ name: 'Equals', value: 'equals', type: 'select' }], value: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] }
];

export const viewOptions = [
  { id: 'all', label: 'All Customers', group: 'public' },
  { id: 'active', label: 'Active Customers', group: 'public' },
  { id: 'inactive', label: 'Inactive Customers', group: 'public' }
];

const Contacts = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showInlineFilter, setShowInlineFilter] = useState(false);
  const [customFilters, setCustomFilters] = useState([]);
  const [selectedView, setSelectedView] = useState('all');

  const filteredData = useMemo(() => {
    let data = mockContactsData;
    
    if (selectedView === 'active') data = data.filter(d => d.status === 'Active');
    if (selectedView === 'inactive') data = data.filter(d => d.status === 'Inactive');

    if (searchTerm) {
      data = data.filter(d => 
        d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (customFilters.length > 0) {
      data = data.filter(item => {
        return customFilters.every(filter => {
          const itemVal = item[filter.field]?.toLowerCase() || '';
          const filterVal = filter.value?.toLowerCase() || '';
          if (filter.operator === 'contains') return itemVal.includes(filterVal);
          if (filter.operator === 'equals') return itemVal === filterVal;
          return true;
        });
      });
    }

    return data;
  }, [searchTerm, selectedView, customFilters]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length && filteredData.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(d => d.id));
    }
  };

  const toggleCheckbox = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRowClick = (row) => {
    const contact = row.original || row;
    navigate(`/contacts/${contact.id}`);
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: () => (
          <CommonCheckbox
            mr={0}
            checked={selectedIds.length === filteredData.length && filteredData.length > 0}
            indeterminate={selectedIds.length > 0 && selectedIds.length < filteredData.length}
            onChange={toggleSelectAll}
            sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }}
          />
        ),
        cell: ({ row }) => (
          <Box onClick={e => e.stopPropagation()}>
            <CommonCheckbox
              mr={0}
              checked={selectedIds.includes(row.original.id)}
              onChange={() => toggleCheckbox(row.original.id)}
              sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }}
            />
          </Box>
        ),
      },
      {
        accessorKey: 'customerName',
        header: 'CUSTOMER NAME',
        cell: (info) => {
          const val = info.getValue() || '';
          return (
            <TableAvatarCell primaryText={val} />
          );
        },
      },
      { accessorKey: 'email', header: 'EMAIL' },
      {
        accessorKey: 'status',
        header: 'STATUS',
        cell: (info) => {
           const val = info.getValue();
           return <StatusBadge status={val} size="small" />;
        }
      },
      { accessorKey: 'companyName', header: 'COMPANY NAME' },
      { accessorKey: 'phone', header: 'PHONE' },
      { accessorKey: 'country', header: 'COUNTRY' },
      { accessorKey: 'unusedCredits', header: 'UNUSED CREDITS' },
    ],
    [filteredData.length, selectedIds]
  );

  const contactMenuActions = useMemo(
    () => [
      {
        label: 'Sort by',
        value: 'sort_by',
        children: [
          { label: 'Customer Name', value: 'customerName', onClick: () => console.log('Sort by Customer Name') },
          { label: 'Company Name', value: 'companyName', onClick: () => console.log('Sort by Company Name') },
          { label: 'Created Time', value: 'createdTime', onClick: () => console.log('Sort by Created Time') },
        ],
      },
      {
        label: 'Import Customers',
        value: 'import',
        onClick: () => console.log('Import Customers'),
      },
      {
        label: 'Export Customers',
        value: 'export',
        onClick: () => console.log('Export Customers'),
      },
      {
        label: 'Customer Preferences',
        value: 'preferences',
        onClick: () => console.log('Customer Preferences'),
      },
      {
        label: 'Refresh List',
        value: 'refresh',
        onClick: () => console.log('Refresh List'),
      },
    ],
    []
  );

  const handleInlineFilterApply = (rules) => {
    setCustomFilters(rules);
  };

  const topComponent = (
    <Stack direction="row" spacing={2} alignItems="center">
      <CommonSearchBar
        placeholder="Search Customers"
        value={searchTerm}
        onChange={setSearchTerm}
        width={250}
        mt={0}
        mb={0}
      />
    </Stack>
  );

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box display="flex" width="100%" sx={{ height: 'calc(100vh - 120px)' }}>
        
        {/* Left Filter Pane */}
        <Box
          sx={{
            width: showInlineFilter ? 300 : 0,
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            borderRight: showInlineFilter ? '1px solid #eee' : 'none',
            flexShrink: 0,
            mr: showInlineFilter ? 2 : 0,
          }}
        >
          {showInlineFilter && (
            <ContactInlineFilter
              initialRules={customFilters}
              onClose={() => setShowInlineFilter(false)}
              onApply={handleInlineFilterApply}
              fields={mockFilterFields}
            />
          )}
        </Box>

        {/* Main Content Pane */}
        <Box flex={1} overflow="hidden" display="flex" flexDirection="column">
          {selectedIds.length > 0 ? (
            <Box sx={{ mx: 0.5, mt: 0.5}}>
              <ActionBar
                selectedCount={selectedIds.length}
                actions={[
                  { label: 'Mark as Active', onClick: () => console.log('Active', selectedIds) },
                  { label: 'Mark as Inactive', onClick: () => console.log('Inactive', selectedIds) },
                  { label: 'Bulk Delete', onClick: () => console.log('Delete', selectedIds) },
                ]}
                onClose={() => setSelectedIds([])}
              />
            </Box>
            
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                p: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  gap: 2,
                  minWidth: 0,
                }}
              >
                {!showInlineFilter && (
                  <Badge
                    variant="dot"
                    color="error"
                    invisible={!customFilters?.length}
                    sx={{ flexShrink: 0 }}
                  >
                    <IconButton
                      onClick={() => setShowInlineFilter(true)}
                      size="small"
                      sx={{ bgcolor: 'primary.extraLight', width: 32, height: 32 }}
                    >
                      <FilterListRoundedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    </IconButton>
                  </Badge>
                )}

                <Box
                  sx={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    '& > *': {
                      display: 'inline-flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  }}
                >
                  <DropdownMenu
                    options={viewOptions}
                    selectedKey={selectedView}
                    onChange={setSelectedView}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CommonButton
                  label="New Customer"
                  onClick={() => console.log('New Customer clicked')}
                />
                <CommonNestedMenu items={contactMenuActions} />
              </Box>
            </Box>
          )}

          <Box>
            <ReusableTable
              columns={columns}
              data={filteredData}
              selectedIds={selectedIds}
              onRowClick={handleRowClick}
              topComponent={topComponent}
            />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Contacts;
