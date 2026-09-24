import { Box, useTheme } from "@mui/material";

const BillingCycleToggle = ({
  cycles = [],
  selectedCycleId,
  onCycleChange,
  getCycleId = (cycle) =>
    cycle._id || cycle.id || cycle.billing_cycle_id || cycle.billingCycle,
  getCycleLabel = (cycle) =>
    cycle.billingCycleName ||
    cycle.label ||
    cycle.billing_cycle_name ||
    cycle.billingCycle,
  checkIsSelected = (cycle, selectedId) => {
    const id = getCycleId(cycle);
    return id === selectedId;
  },
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "30px",
        p: 0.5,
        width: "max-content",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {cycles.map((cycle, index) => {
        const id = getCycleId(cycle) || `cycle-${index}`;
        const label = getCycleLabel(cycle);
        const isSelected = checkIsSelected(cycle, selectedCycleId);

        return (
          <Box
            key={id}
            onClick={() => {
              if (!isSelected && onCycleChange) {
                onCycleChange(cycle);
              }
            }}
            sx={{
              px: 2.5,
              py: 0.75,
              borderRadius: "30px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              fontWeight: isSelected ? 600 : 500,
              backgroundColor: isSelected
                ? `${theme.palette.primary.main}15`
                : "transparent",
              color: isSelected ? "primary.main" : "text.secondary",
              transition: "all 0.2s",
              textTransform: "capitalize",
              boxShadow: "none",
            }}
          >
            {label?.toLowerCase().includes("year")
              ? "Yearly · Save 17%"
              : label}
          </Box>
        );
      })}
    </Box>
  );
};

export default BillingCycleToggle;
