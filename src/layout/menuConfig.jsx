import React from 'react';
import {
  IconHome,
  IconProduct,
  IconItems,
  IconSales,
  IconPurchased,
  IconAccountant,
  IconReport,
  IconWorkflow,
  IconMail
} from './menuIcons';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AppsIcon from '@mui/icons-material/Apps';
import WidgetsIcon from '@mui/icons-material/Widgets';

export const menuItems = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: <IconHome />,
    activePaths: ['/dashboard'],
    expandable: false,
  },
  {
    text: 'Items',
    path: '/items',
    icon: <IconItems />,
    activePaths: ['/items'],
    expandable: true,
    subItems: [
      { label: 'Items', path: '/inventory/product/variantslist', activePaths: ['/inventory/product/variantslist'], addPath: '/inventory/product/product-creation' },
    ]
  },
  {
    text: 'Inventory',
    path: '/inventory',
    icon: <IconProduct />,
    activePaths: ['/inventory'],
    expandable: true,
    subItems: [
      { label: 'Inventory Adjustments', path: '/inventory/adjustments', activePaths: ['/inventory/adjustments'], addPath: '/inventory/adjustments/new' },
    ]
  },
  {
    text: 'Sales',
    path: '/sales',
    icon: <IconSales />,
    activePaths: ['/sales'],
    expandable: true,
    subItems: [
      { label: 'Customers', path: '/contacts', activePaths: ['/contacts'], addPath: '/contacts/new' },
      { label: 'Sales Orders', path: '/salesorders', activePaths: ['/salesorders'], addPath: '/salesorders/new' },
      { label: 'Invoices', path: '/invoices', activePaths: ['/invoices'], addPath: '/invoices/new' },
      { label: 'Recurring Invoices', path: '/recurringinvoices', activePaths: ['/recurringinvoices'], addPath: '/recurringinvoices/new' },
      { label: 'Delivery Challans', path: '/deliverychallans', activePaths: ['/deliverychallans'], addPath: '/deliverychallans/new' },
      { label: 'Payments Received', path: '/paymentsreceived', activePaths: ['/paymentsreceived'], addPath: '/paymentsreceived/new' },
      { label: 'Credit Notes', path: '/creditnotes', activePaths: ['/creditnotes'], addPath: '/creditnotes/new' },
    ]
  },
  {
    text: 'Purchases',
    path: '/purchases',
    icon: <IconPurchased />,
    activePaths: ['/purchases'],
    expandable: true,
    subItems: [
      { label: 'Vendors', path: '/vendors', activePaths: ['/vendors'], addPath: '/vendors/new' },
      { label: 'Expenses', path: '/expenses', activePaths: ['/expenses'], addPath: '/expenses/new' },
      { label: 'Purchase Orders', path: '/purchaseorders', activePaths: ['/purchaseorders'], addPath: '/purchaseorders/new' },
      { label: 'Bills', path: '/bills', activePaths: ['/bills'], addPath: '/bills/new' },
      { label: 'Payments Made', path: '/paymentsmade', activePaths: ['/paymentsmade'], addPath: '/paymentsmade/new' },
      { label: 'Vendor Credits', path: '/vendorcredits', activePaths: ['/vendorcredits'], addPath: '/vendorcredits/new' },
    ]
  },
  {
    text: 'Time Tracking',
    path: '/time-tracking',
    icon: <IconWorkflow />,
    activePaths: ['/time-tracking'],
    expandable: true,
    subItems: [
      { label: 'Projects', path: '/timesheet/projects', activePaths: ['/timesheet/projects'] },
      { label: 'Timesheet', path: '/timesheet/alltimeentries', activePaths: ['/timesheet/alltimeentries'], addPath: '/timesheet/new' },
    ]
  },
  { type: 'divider' },
  {
    text: 'Banking',
    path: '/banking',
    icon: <AccountBalanceIcon sx={{ fontSize: 22 }} />,
    activePaths: ['/banking'],
    expandable: false,
  },
  {
    text: 'Accountant',
    path: '/accountant',
    icon: <IconAccountant />,
    activePaths: ['/accountant'],
    expandable: true,
    subItems: [
      { label: 'Manual Journals', path: '/accountant/journals', activePaths: ['/accountant/journals'], addPath: '/accountant/journals/new' },
      { label: 'Bulk Update', path: '/accountant/bulkupdateaccounts', activePaths: ['/accountant/bulkupdateaccounts'] },
      { label: 'Chart of Accounts', path: '/accountant/chartofaccounts', activePaths: ['/accountant/chartofaccounts'] },
      { label: 'Transaction Locking', path: '/accountant/transactionlock', activePaths: ['/accountant/transactionlock'] },
    ]
  },
  {
    text: 'Reports',
    path: '/reports',
    icon: <IconReport />,
    activePaths: ['/reports'],
    expandable: false,
  },
  {
    text: 'Documents',
    path: '/documents',
    icon: <IconMail />,
    activePaths: ['/documents'],
    expandable: false,
  },
  { type: 'divider' },
  { type: 'header', label: 'Apps' },
  {
    text: 'Zoho Payments',
    path: '/payments',
    icon: <AppsIcon sx={{ fontSize: 22 }} />,
    activePaths: ['/payments'],
    expandable: false,
  },
  { type: 'divider' },
  {
    text: 'More Features',
    path: '/more-features',
    icon: <WidgetsIcon sx={{ fontSize: 22 }} />,
    activePaths: ['/more-features'],
    expandable: false,
  },
];
