import { Box, Typography } from "@mui/material";

const SIGNAL_RECIPES = {
  success: {
    bg: "var(--color-success-lighter)",
    text: "var(--color-success-darker)",
    dot: "var(--color-success-main)",
  },
  warning: {
    bg: "var(--color-warning-lighter)",
    text: "var(--color-warning-darker)",
    dot: "var(--color-warning-main)",
  },
  danger: {
    bg: "var(--color-error-lighter)",
    text: "var(--color-error-darker)",
    dot: "var(--color-error-main)",
  },
  info: {
    bg: "var(--color-info-lighter)",
    text: "var(--color-info-darker)",
    dot: "var(--color-info-main)",
  },
  neutral: {
    bg: "var(--color-chip-neutral-bg)",
    text: "var(--color-text-muted)",
    dot: "var(--color-border-hover)",
  },
  accent: {
    bg: "color-mix(in srgb, var(--color-chart-6) 18%, var(--color-bg-paper))",
    text: "var(--color-chart-6)",
    dot: "var(--color-chart-6)",
  },
  primary: {
    bg: "var(--color-primary-lighter, rgba(25, 118, 210, 0.1))",
    text: "primary.dark",
    dot: "primary.main",
  },
};

const statusColors = {
  active: SIGNAL_RECIPES.success,
  success: SIGNAL_RECIPES.success,
  verified: SIGNAL_RECIPES.success,
  paid: SIGNAL_RECIPES.success,
  approved: SIGNAL_RECIPES.success,
  authorized: SIGNAL_RECIPES.success,
  completed: SIGNAL_RECIPES.success,
  credit: SIGNAL_RECIPES.success,
  accepted: SIGNAL_RECIPES.success,

  suspended: SIGNAL_RECIPES.danger,
  suspend: SIGNAL_RECIPES.danger,
  void: SIGNAL_RECIPES.danger,
  failed: SIGNAL_RECIPES.danger,
  deleted: SIGNAL_RECIPES.danger,
  overdue: SIGNAL_RECIPES.danger,
  expired: SIGNAL_RECIPES.danger,
  debit: SIGNAL_RECIPES.danger,

  pending: SIGNAL_RECIPES.warning,
  pending_verification: SIGNAL_RECIPES.warning,
  not_verified: SIGNAL_RECIPES.warning,
  unverified: SIGNAL_RECIPES.warning,
  partially_paid: SIGNAL_RECIPES.warning,
  refunded: SIGNAL_RECIPES.warning,
  partially_refunded: SIGNAL_RECIPES.warning,
  pending_approval: SIGNAL_RECIPES.warning,
  grace_period: SIGNAL_RECIPES.danger,

  open: SIGNAL_RECIPES.info,
  trial: SIGNAL_RECIPES.info,
  trail: SIGNAL_RECIPES.info,
  sent: SIGNAL_RECIPES.info,
  viewed: SIGNAL_RECIPES.info,

  inactive: SIGNAL_RECIPES.neutral,
  cancelled: SIGNAL_RECIPES.neutral,
  draft: SIGNAL_RECIPES.neutral,
  written_off: SIGNAL_RECIPES.neutral,

  paused: SIGNAL_RECIPES.accent,

  purchase: SIGNAL_RECIPES.primary,
  register: SIGNAL_RECIPES.primary,
  renewal: SIGNAL_RECIPES.primary,
  upgrade: SIGNAL_RECIPES.primary,
  addon_add: SIGNAL_RECIPES.primary,
  addon_renew: SIGNAL_RECIPES.primary,
  seat_add: SIGNAL_RECIPES.primary,

  downgrade: SIGNAL_RECIPES.warning,
  seat_remove: SIGNAL_RECIPES.warning,

  plan_change: SIGNAL_RECIPES.info,
};

const NDEStatusBadge = ({ status, size = "medium", label, sx, ...props }) => {
  const getSafeStatus = (val) => {
    if (val && typeof val === "object") {
      return val.name || val.title || val.symbol || val.code || "Unknown";
    }
    return val;
  };

  const safeStatus = getSafeStatus(status);
  const current =
    statusColors[safeStatus?.toLowerCase()] || statusColors.inactive;

  const isSmall = size === "small";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: isSmall ? 1 : 2.5,
        py: isSmall ? 0.15 : 0.5,
        borderRadius: 9,
        bgcolor: current.bg,
        gap: isSmall ? 0.5 : 0.75,
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: isSmall ? 5 : 6,
          height: isSmall ? 5 : 6,
          borderRadius: "50%",
          bgcolor: current.dot,
        }}
      />

      <Typography
        sx={{
          fontSize: isSmall ? "10.5px" : "12px",
          fontWeight: 600,
          color: current.text,
          textTransform: "capitalize",
          lineHeight: 1.2,
        }}
      >
        {label ||
          (safeStatus === "grace_period"
            ? "Expired"
            : typeof safeStatus === "string"
              ? safeStatus.replace(/_/g, " ")
              : safeStatus) ||
          "Unknown"}
      </Typography>
    </Box>
  );
};

export default NDEStatusBadge;
