import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Portal,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  PersonOutlined as PersonOutlineIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
} from '@mui/icons-material';
import { mockContactsData } from '../pages/Sales/Contacts';

const DEFAULT_CATEGORIES = [
  { label: 'Customers', value: 'customers' },
  { label: 'Items', value: 'items' },
  { label: 'Banking', value: 'banking' },
  { label: 'Transaction Rules', value: 'transaction_rules' },
  { label: 'Sales Orders', value: 'sales_orders' },
  { label: 'Delivery Challans', value: 'delivery_challans' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Credit Notes', value: 'credit_notes' },
  { label: 'Vendors', value: 'vendors' },
];

const MOCK_INVOICES = [
  { id: '1', invoiceNumber: 'INV-00001', customerName: 'Dharani', amount: '₹12,500', status: 'Paid' },
  { id: '2', invoiceNumber: 'INV-00002', customerName: 'Uthes', amount: '₹45,000', status: 'Pending' },
  { id: '3', invoiceNumber: 'INV-00003', customerName: 'Priya Sharma', amount: '₹8,900', status: 'Overdue' },
  { id: '4', invoiceNumber: 'INV-00004', customerName: 'Sathish Testings', amount: '₹3,400', status: 'Paid' },
];

export default function GlobalSearch({
  placeholder,
  categories = DEFAULT_CATEGORIES,
  selectedCategory = 'customers',
  onCategoryChange,
  width = 360,
  sx = {},
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const searchBoxRef = useRef(null);
  const activeInputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(selectedCategory);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [searchRect, setSearchRect] = useState(null);

  const categoryMenuOpen = Boolean(categoryAnchorEl);
  const selectedCategoryLabel = categories.find((c) => c.value === category)?.label;
  const defaultPlaceholderText =
    placeholder || (selectedCategoryLabel ? `Search ${selectedCategoryLabel}...` : 'Search...');

  const headerText = theme.palette.header?.text || '#ffffff';
  const headerTextMuted = theme.palette.header?.mutedText || 'rgba(255, 255, 255, 0.6)';
  const headerSearchBg = theme.palette.header?.searchBg || '#333850';
  const headerSearchBorder = theme.palette.header?.searchBorder || '#6c718a';

  const updateRect = () => {
    if (searchBoxRef.current) {
      const rect = searchBoxRef.current.getBoundingClientRect();
      setSearchRect(rect);
    }
  };

  const handleOpenSearch = () => {
    updateRect();
    setIsOpen(true);
  };

  const handleCloseSearch = () => {
    setIsOpen(false);
    setCategoryAnchorEl(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleOpenSearch();
      } else if (e.key === 'Escape' && isOpen) {
        handleCloseSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus active input when modal opens
  useEffect(() => {
    if (isOpen) {
      updateRect();
      const timer = setTimeout(() => {
        activeInputRef.current?.focus();
      }, 50);

      const onResize = () => updateRect();
      window.addEventListener('resize', onResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', onResize);
      };
    }
  }, [isOpen]);

  const handleCategoryOpen = (e) => {
    e.stopPropagation();
    setCategoryAnchorEl(e.currentTarget);
  };

  const handleCategorySelect = (catValue) => {
    setCategory(catValue);
    onCategoryChange?.(catValue);
    setCategoryAnchorEl(null);
    activeInputRef.current?.focus();
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    if (searchTerm) {
      setSearchTerm('');
      activeInputRef.current?.focus();
    } else {
      handleCloseSearch();
    }
  };

  const activeCategoryLabel =
    categories.find((c) => c.value === category)?.label || 'All';

  // Filter contacts and invoices based on searchTerm
  const query = searchTerm.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (query.length < 3) return { contacts: [], invoices: [] };

    let contacts = [];
    let invoices = [];

    if (category === 'all' || category === 'customers') {
      contacts = mockContactsData.filter(
        (c) =>
          c.customerName?.toLowerCase().includes(query) ||
          c.email?.toLowerCase().includes(query) ||
          c.companyName?.toLowerCase().includes(query) ||
          c.phone?.includes(query)
      );
    }

    if (category === 'all' || category === 'invoices') {
      invoices = MOCK_INVOICES.filter(
        (inv) =>
          inv.invoiceNumber?.toLowerCase().includes(query) ||
          inv.customerName?.toLowerCase().includes(query)
      );
    }

    return { contacts, invoices };
  }, [query, category]);

  const totalResults = searchResults.contacts.length + searchResults.invoices.length;

  const handleSelectContact = (contact) => {
    handleCloseSearch();
    navigate(`/contacts/${contact.id}`);
  };

  const handleSelectInvoice = (invoice) => {
    handleCloseSearch();
    navigate('/sales/invoices');
  };

  return (
    <>
      <Box
        ref={searchBoxRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: headerSearchBg,
          border: `1px solid ${headerSearchBorder}`,
          borderRadius: '8px',
          height: 34,
          px: 1.2,
          width,
          boxSizing: 'border-box',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            filter: 'brightness(1.1)',
          },
          ...sx,
        }}
      >
        {/* Search Icon + Down Arrow on the left (clickable for category menu) */}
        <Box
          onClick={handleCategoryOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            cursor: 'pointer',
            borderRadius: 1,
            px: 0.4,
            py: 0.2,
            transition: 'background-color 0.15s'
          }}
        >
          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 18 }} />
          <KeyboardArrowDownIcon
            sx={{
              color: '#2196f3',
              fontSize: 17,
              ml: 0.2,
              transform: categoryMenuOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </Box>

        {/* Vertical Divider */}
        <Box
          sx={{
            width: '1px',
            height: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            mx: 1,
            flexShrink: 0,
          }}
        />

        {/* Placeholder / Search text (clicking opens search modal) */}
        <Typography
          onClick={handleOpenSearch}
          sx={{
            color: searchTerm ? headerText : 'rgba(255, 255, 255, 0.45)',
            flex: 1,
            fontSize: '0.85rem',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'pointer',
          }}
        >
          {searchTerm || defaultPlaceholderText}
        </Typography>
      </Box>

      {isOpen && (
        <Portal>
          <Box
            onClick={handleCloseSearch}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              zIndex: 1300,
              cursor: 'default',
            }}
          />

          <Box
            sx={{
              position: 'fixed',
              top: searchRect?.top ?? 9,
              left: searchRect?.left ?? 260,
              width: searchRect?.width ?? width ?? 360,
              zIndex: 1301,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #1976d2',
                borderRadius: '6px',
                height: 34,
                px: 1.2,
                width: '100%',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)',
                boxSizing: 'border-box',
              }}
            >
              {/* Category dropdown trigger with Search Icon */}
              <Box
                onClick={handleCategoryOpen}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  borderRadius: 1,
                  px: 0.4,
                  py: 0.2,
                  userSelect: 'none',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              >
                <SearchIcon sx={{ color: '#64748b', fontSize: 18 }} />
                <KeyboardArrowDownIcon
                  sx={{
                    color: '#64748b',
                    fontSize: 16,
                    ml: 0.2,
                    transform: categoryMenuOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </Box>

              {/* Vertical divider */}
              <Box
                sx={{
                  width: '1px',
                  height: '18px',
                  backgroundColor: '#e2e8f0',
                  mx: 1,
                  flexShrink: 0,
                }}
              />

              {/* Real Input */}
              <InputBase
                inputRef={activeInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                autoFocus
                sx={{
                  color: '#1e293b',
                  flex: 1,
                  height: '100%',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  '& .MuiInputBase-input': {
                    py: 0,
                    height: '100%',
                  },
                  '& ::placeholder': { color: '#94a3b8', opacity: 1 },
                }}
              />

              {/* Red Close "X" Button (Matches screenshot) */}
              <IconButton
                size="small"
                onClick={handleClearClick}
                sx={{
                  p: 0.3,
                  ml: 0.5,
                  color: '#e53935',
                  '&:hover': {
                    backgroundColor: 'rgba(229, 57, 53, 0.08)',
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>

            {/* Dropdown Result Box (Directly below the search input) */}
            <Paper
              elevation={6}
              sx={{
                mt: 1,
                width: 440,
                maxWidth: 'calc(100vw - 32px)',
                backgroundColor: '#ffffff',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
                overflow: 'hidden',
              }}
            >
              {query.length < 3 ? (
                <Box sx={{ py: 1.5, px: 2 }}>
                  <Typography
                    sx={{
                      color: '#64748b',
                      fontSize: '0.85rem',
                      userSelect: 'none',
                    }}
                  >
                    Enter more characters to search
                  </Typography>
                </Box>
              ) : totalResults === 0 ? (
                <Box sx={{ p: 2.5, textAlign: 'center' }}>
                  <Typography sx={{ color: '#1e293b', fontSize: '0.9rem', fontWeight: 600 }}>
                    No results found for "{searchTerm}"
                  </Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.8rem', mt: 0.5 }}>
                    Try searching for another name, email, or invoice number.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ maxHeight: 380, overflowY: 'auto', p: 0.5 }}>
                  {searchResults.contacts.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          display: 'block',
                          color: '#64748b',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          letterSpacing: 0.5,
                        }}
                      >
                        CUSTOMERS ({searchResults.contacts.length})
                      </Typography>
                      <List dense disablePadding>
                        {searchResults.contacts.map((contact) => (
                          <ListItem key={contact.id} disablePadding>
                            <ListItemButton
                              onClick={() => handleSelectContact(contact)}
                              sx={{
                                borderRadius: 1.5,
                                mx: 0.5,
                                my: 0.2,
                                py: 0.8,
                                '&:hover': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 34, color: 'primary.main' }}>
                                <PersonOutlineIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                      sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                      }}
                                    >
                                      {contact.customerName}
                                    </Typography>
                                    {contact.companyName && (
                                      <Typography
                                        sx={{
                                          fontSize: '0.8rem',
                                          color: '#64748b',
                                        }}
                                      >
                                        • {contact.companyName}
                                      </Typography>
                                    )}
                                    <Chip
                                      label={contact.status}
                                      size="small"
                                      sx={{
                                        height: 18,
                                        fontSize: '0.65rem',
                                        fontWeight: 600,
                                        ml: 'auto',
                                        backgroundColor:
                                          contact.status === 'Active'
                                            ? 'rgba(46, 125, 50, 0.12)'
                                            : 'rgba(158, 158, 158, 0.15)',
                                        color:
                                          contact.status === 'Active'
                                            ? 'success.dark'
                                            : 'text.secondary',
                                      }}
                                    />
                                  </Box>
                                }
                                secondary={contact.email}
                                secondaryTypographyProps={{
                                  fontSize: '0.75rem',
                                  color: '#64748b',
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Divider between sections if both exist */}
                  {searchResults.contacts.length > 0 && searchResults.invoices.length > 0 && (
                    <Divider sx={{ my: 0.8 }} />
                  )}

                  {/* Invoices Section */}
                  {searchResults.invoices.length > 0 && (
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          display: 'block',
                          color: '#64748b',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          letterSpacing: 0.5,
                        }}
                      >
                        INVOICES ({searchResults.invoices.length})
                      </Typography>
                      <List dense disablePadding>
                        {searchResults.invoices.map((inv) => (
                          <ListItem key={inv.id} disablePadding>
                            <ListItemButton
                              onClick={() => handleSelectInvoice(inv)}
                              sx={{
                                borderRadius: 1.5,
                                mx: 0.5,
                                my: 0.2,
                                py: 0.8,
                                '&:hover': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 34, color: '#f59e0b' }}>
                                <ReceiptOutlinedIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                      sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                      }}
                                    >
                                      {inv.invoiceNumber}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#64748b' }}>
                                      ({inv.customerName})
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#1e293b',
                                        ml: 'auto',
                                      }}
                                    >
                                      {inv.amount}
                                    </Typography>
                                  </Box>
                                }
                                secondary={`Status: ${inv.status}`}
                                secondaryTypographyProps={{
                                  fontSize: '0.75rem',
                                  color: '#64748b',
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </Box>

        </Portal>
      )}

      {/* ── Category Dropdown Menu (matching screenshot) ── */}
      <Menu
        anchorEl={categoryAnchorEl}
        open={categoryMenuOpen}
        onClose={() => setCategoryAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 0.8,
            width: 250,
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
            p: 0.6,
            maxHeight: 400,
            overflowY: 'auto',
            zIndex: 1400,
            '& .MuiList-root': {
              p: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {categories.map((cat) => {
          const isSelected = cat.value === category;
          return (
            <MenuItem
              key={cat.value}
              selected={isSelected}
              onClick={(e) => {
                e.stopPropagation();
                handleCategorySelect(cat.value);
              }}
              sx={{
                py: 0.9,
                px: 1.5,
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? '#ffffff !important' : '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.3,
                transition: 'all 0.15s ease',
                '&:hover': {
                  backgroundColor: isSelected ? '#2563eb !important' : '#f1f5f9',
                },
                '&.Mui-selected': {
                  backgroundColor: '#3b82f6 !important',
                  color: '#ffffff !important',
                  '&:hover': {
                    backgroundColor: '#2563eb !important',
                  },
                },
              }}
            >
              <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                {cat.label}
              </Typography>
              {isSelected && (
                <CheckIcon sx={{ fontSize: 18, color: '#ffffff', ml: 1 }} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
