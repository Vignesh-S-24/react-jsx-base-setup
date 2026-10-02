import React, { lazy } from "react";

const ProductVariantsList = lazy(() => import('../pages/Inventory/ProductVariantsList'));
const Adjustments = lazy(() => import('../pages/Inventory/Adjustments'));
const Contacts = lazy(() => import('../pages/Sales/Contacts'));
const SalesOrders = lazy(() => import('../pages/Sales/SalesOrders'));
const Invoices = lazy(() => import('../pages/Sales/Invoices'));
const RecurringInvoices = lazy(() => import('../pages/Sales/RecurringInvoices'));
const DeliveryChallans = lazy(() => import('../pages/Sales/DeliveryChallans'));
const PaymentsReceived = lazy(() => import('../pages/Sales/PaymentsReceived'));
const CreditNotes = lazy(() => import('../pages/Sales/CreditNotes'));
const Vendors = lazy(() => import('../pages/Purchases/Vendors'));
const Expenses = lazy(() => import('../pages/Purchases/Expenses'));
const PurchaseOrders = lazy(() => import('../pages/Purchases/PurchaseOrders'));
const Bills = lazy(() => import('../pages/Purchases/Bills'));
const PaymentsMade = lazy(() => import('../pages/Purchases/PaymentsMade'));
const VendorCredits = lazy(() => import('../pages/Purchases/VendorCredits'));
const Projects = lazy(() => import('../pages/TimeTracking/Projects'));
const AllTimeEntries = lazy(() => import('../pages/TimeTracking/AllTimeEntries'));
const Banking = lazy(() => import('../pages/Banking/Banking'));
const Journals = lazy(() => import('../pages/Accountant/Journals'));
const BulkUpdateAccounts = lazy(() => import('../pages/Accountant/BulkUpdateAccounts'));
const ChartOfAccounts = lazy(() => import('../pages/Accountant/ChartOfAccounts'));
const TransactionLock = lazy(() => import('../pages/Accountant/TransactionLock'));
const Reports = lazy(() => import('../pages/Reports/Reports'));
const Documents = lazy(() => import('../pages/Documents/Documents'));
const ZohoPayments = lazy(() => import('../pages/Apps/ZohoPayments'));
const MoreFeatures = lazy(() => import('../pages/Features/MoreFeatures'));

export const inventoryRoutes = [
  { path: 'inventory/product/variantslist', element: <ProductVariantsList /> },
  { path: 'inventory/adjustments', element: <Adjustments /> },
];

export const salesRoutes = [
  { path: 'contacts', element: <Contacts /> },
  { path: 'salesorders', element: <SalesOrders /> },
  { path: 'invoices', element: <Invoices /> },
  { path: 'recurringinvoices', element: <RecurringInvoices /> },
  { path: 'deliverychallans', element: <DeliveryChallans /> },
  { path: 'paymentsreceived', element: <PaymentsReceived /> },
  { path: 'creditnotes', element: <CreditNotes /> },
];

export const purchasesRoutes = [
  { path: 'vendors', element: <Vendors /> },
  { path: 'expenses', element: <Expenses /> },
  { path: 'purchaseorders', element: <PurchaseOrders /> },
  { path: 'bills', element: <Bills /> },
  { path: 'paymentsmade', element: <PaymentsMade /> },
  { path: 'vendorcredits', element: <VendorCredits /> },
];

export const timesheetRoutes = [
  { path: 'timesheet/projects', element: <Projects /> },
  { path: 'timesheet/alltimeentries', element: <AllTimeEntries /> },
];

export const accountantRoutes = [
  { path: 'accountant/journals', element: <Journals /> },
  { path: 'accountant/bulkupdateaccounts', element: <BulkUpdateAccounts /> },
  { path: 'accountant/chartofaccounts', element: <ChartOfAccounts /> },
  { path: 'accountant/transactionlock', element: <TransactionLock /> },
];

export const otherRoutes = [
  { path: 'banking', element: <Banking /> },
  { path: 'reports', element: <Reports /> },
  { path: 'documents', element: <Documents /> },
  { path: 'payments', element: <ZohoPayments /> },
  { path: 'more-features', element: <MoreFeatures /> },
];
