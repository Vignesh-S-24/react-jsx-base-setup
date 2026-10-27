import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  useTheme,
} from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import CommonLeftSidebarDetails from '../../components/common/CommonLeftSidebarDetails';
import ContactInlineFilter from '../../components/common/ContactInlineFilter';
import DetailsHeader from '../../components/common/DetailsHeader';
import CommonMoreMenu from '../../components/common/CommonMoreMenu';
import { mockContactsData, mockFilterFields, viewOptions } from './Contacts';

const ContactDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedView, setSelectedView] = useState('all');
  const [showInlineFilter, setShowInlineFilter] = useState(false);
  const [customFilters, setCustomFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filteredContacts = useMemo(() => {
    let list = mockContactsData;

    if (selectedView === 'active') list = list.filter((d) => d.status === 'Active');
    if (selectedView === 'inactive') list = list.filter((d) => d.status === 'Inactive');

    if (searchTerm) {
      list = list.filter(
        (d) =>
          d.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (customFilters.length > 0) {
      list = list.filter((item) =>
        customFilters.every((filter) => {
          const itemVal = item[filter.field]?.toLowerCase() || '';
          const filterVal = filter.value?.toLowerCase() || '';
          if (filter.operator === 'contains') return itemVal.includes(filterVal);
          if (filter.operator === 'equals') return itemVal === filterVal;
          return true;
        })
      );
    }

    return list;
  }, [selectedView, searchTerm, customFilters]);

  const selectedContact = useMemo(() => {
    if (!id) return filteredContacts[0] || null;
    return mockContactsData.find((c) => String(c.id) === String(id)) || null;
  }, [id, filteredContacts]);

  const contactMoreActions = useMemo(
    () => [
      {
        label: 'Clone Customer',
        value: 'clone',
        onClick: () => console.log('Clone customer', selectedContact),
      },
      {
        label: 'Send Email',
        value: 'send_email',
        onClick: () => console.log('Send email to', selectedContact?.email),
      },
      {
        label: 'Mark as Active',
        value: 'active',
        onClick: () => console.log('Mark as active', selectedContact),
      },
      {
        label: 'Mark as Inactive',
        value: 'inactive',
        onClick: () => console.log('Mark as inactive', selectedContact),
      },
      { isDivider: true },
      {
        label: 'Print Details',
        value: 'print',
        onClick: () => window.print(),
      },
    ],
    [selectedContact]
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length && filteredContacts.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((d) => d.id));
    }
  };

  const toggleCheckbox = (contactId) => {
    setSelectedIds((prev) =>
      prev.includes(contactId) ? prev.filter((i) => i !== contactId) : [...prev, contactId]
    );
  };

  const handleClose = () => {
    navigate('/contacts');
  };

  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 50px)', display: 'flex' }}>
      {/* Optional Left Filter Drawer */}
      {showInlineFilter && (
        <Box
          sx={{
            width: 300,
            height: '100%',
            overflow: 'hidden',
            borderRight: '1px solid #EBEBEF',
            flexShrink: 0,
          }}
        >
          <ContactInlineFilter
            initialRules={customFilters}
            onClose={() => setShowInlineFilter(false)}
            onApply={(rules) => setCustomFilters(rules)}
            fields={mockFilterFields}
          />
        </Box>
      )}

      {/* Common Left Sidebar Details */}
      <CommonLeftSidebarDetails
        title="Customers"
        width={350}
        items={filteredContacts}
        emptyTitle="No Customers Available"
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onSelectAll={toggleSelectAll}
        bulkActions={[
          { label: 'Mark as Active', onClick: () => console.log('Active', selectedIds) },
          { label: 'Mark as Inactive', onClick: () => console.log('Inactive', selectedIds) },
          { label: 'Bulk Delete', onClick: () => console.log('Delete', selectedIds) },
        ]}
        customFilters={customFilters}
        onSearchFilterClick={() => setShowInlineFilter((prev) => !prev)}
        filterOptions={viewOptions}
        selectedFilter={selectedView}
        onFilterChange={setSelectedView}
        search={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search customers"
        onNew={() => console.log('New Customer clicked')}
        totalDocs={filteredContacts.length}
        page={page}
        limit={limit}
        onPageChange={(_, newPage) => setPage(newPage + 1)}
        onRowsPerPageChange={(e) => setLimit(Number(e.target.value))}
        selectedId={id}
        onSelectItem={(contact) => navigate(`/contacts/${contact.id}`)}
        onCheckItem={(contactId) => toggleCheckbox(contactId)}
      />

      {/* Right Details Panel */}
      <Box
        sx={{
          flex: 1,
          height: '100%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        {!selectedContact ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body1">Select a customer to view details</Typography>
          </Box>
        ) : (
          <>
            {/* Header */}
            <DetailsHeader
              title={selectedContact.customerName}
              status={selectedContact.status}
              email={selectedContact.email}
              phone={selectedContact.phone}
              role={selectedContact.companyName}
              onEdit={() => console.log('Edit customer', selectedContact)}
              onDelete={() => console.log('Delete customer', selectedContact)}
              onClose={handleClose}
              extraActions={
                <CommonMoreMenu
                  label="More"
                  menuOptions={contactMoreActions}
                />
              }
            />

            {/* Tabs */}
            <Box sx={{ borderBottom: '1px solid #EBEBEF', px: 2, bgcolor: 'background.paper' }}>
              <Tabs
                value={activeTab}
                onChange={(_, val) => setActiveTab(val)}
                sx={{
                  minHeight: 44,
                  '& .MuiTab-root': {
                    minHeight: 44,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '14px',
                    px: 2,
                  },
                }}
              >
                <Tab label="Overview" />
                <Tab label="Transactions" />
                <Tab label="Mails" />
                <Tab label="Statement" />
              </Tabs>
            </Box>

            {/* Tab Panels */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
              {activeTab === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 900 }}>
                  {/* Metric Cards */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, borderColor: '#EBEBEF', bgcolor: 'background.default' }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        UNUSED CREDITS
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 600, color: 'primary.main' }}>
                        {selectedContact.unusedCredits || '₹0'}
                      </Typography>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, borderColor: '#EBEBEF', bgcolor: 'background.default' }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        OUTSTANDING RECEIVABLES
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 600, color: 'text.primary' }}>
                        ₹0.00
                      </Typography>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, borderColor: '#EBEBEF', bgcolor: 'background.default' }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        PAYMENT TERMS
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 600, color: 'text.primary' }}>
                        Due On Receipt
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Info Paper */}
                  <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: '#EBEBEF' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Contact Information
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', width: 120 }}>
                          Email:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'primary.main' }}>
                          {selectedContact.email || '-'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PhoneOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', width: 120 }}>
                          Phone:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedContact.phone || '-'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <BusinessOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', width: 120 }}>
                          Company:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedContact.companyName || '-'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 20, textAlign: 'center', color: 'text.secondary', fontSize: 13 }}>📍</Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', width: 120 }}>
                          Country:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {selectedContact.country || '-'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              )}

              {activeTab === 1 && (
                <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">No transactions recorded for this customer yet.</Typography>
                </Box>
              )}

              {activeTab === 2 && (
                <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">No emails recorded.</Typography>
                </Box>
              )}

              {activeTab === 3 && (
                <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
                  <Typography variant="body2">Customer statement is up to date.</Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContactDetails;
