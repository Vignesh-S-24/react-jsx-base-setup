import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import ReusableTable from '../../components/common/Table/ReusableTable';

// ── Mock Data ──────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  Active:    { bg: '#e8f5e9', color: '#2e7d32' },
  Inactive:  { bg: '#fce4ec', color: '#c62828' },
  Pending:   { bg: '#fff8e1', color: '#f57f17' },
  Suspended: { bg: '#ede7f6', color: '#4527a0' },
};

const MOCK_USERS = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee', 'Eva Martinez',
         'Frank Brown', 'Grace Kim', 'Hank Wilson', 'Iris Chen', 'Jack Taylor'][i % 10],
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer'][i % 5],
  status: ['Active', 'Inactive', 'Pending', 'Suspended'][i % 4],
  joined: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }),
  lastLogin: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  }),
}));

// ── Column Definition ──────────────────────────────────────────────────────────
const useColumns = () => {
  return useMemo(() => [
    {
      id: 'name',
      header: 'User',
      accessorKey: 'name',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 32, height: 32,
              fontSize: '0.75rem', fontWeight: 600,
              bgcolor: `hsl(${(row.original.id * 47) % 360}, 60%, 50%)`,
            }}
          >
            {row.original.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500} lineHeight={1.2}>
              {row.original.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.original.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      cell: ({ getValue }) => (
        <Typography variant="body2" color="text.secondary">{getValue()}</Typography>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const val = getValue();
        const { bg, color } = STATUS_COLORS[val] || {};
        return (
          <Chip
            label={val}
            size="small"
            sx={{
              bgcolor: bg, color, fontWeight: 600,
              fontSize: '0.72rem', height: 22, borderRadius: '6px',
            }}
          />
        );
      },
    },
    {
      id: 'joined',
      header: 'Joined',
      accessorKey: 'joined',
      cell: ({ getValue }) => (
        <Typography variant="body2" color="text.secondary">{getValue()}</Typography>
      ),
    },
    {
      id: 'lastLogin',
      header: 'Last Login',
      accessorKey: 'lastLogin',
      cell: ({ getValue }) => (
        <Typography variant="body2" color="text.secondary">{getValue()}</Typography>
      ),
    },
  ], []);
};

export default function Dashboard() {
  const theme = useTheme();
  const columns = useColumns();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = useMemo(
    () => MOCK_USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage],
  );

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Page Header */}
      <Box sx={{px:1.5,py:1.5}}>
        <Typography variant="h5"color="text.primary">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overview of all registered users and their activity.
        </Typography>
      </Box>

        {/* ReusableTable */}
        <ReusableTable
          columns={columns}
          data={paginatedData}
          count={MOCK_USERS.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
  );
}
