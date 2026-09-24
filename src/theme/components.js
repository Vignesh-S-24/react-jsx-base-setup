// NDE Mail style guide: radii sm 4 / md 8 / lg 12 / xl 16, fields 36px (large 44px),
// buttons 9px 18px / 600, signal-coloured messages.
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: { WebkitFontSmoothing: "antialiased" },
    },
  },

  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 600,
        padding: "9px 18px",
        lineHeight: "20px",
      },
      sizeSmall: { padding: "5px 12px" },
      sizeLarge: { padding: "11px 22px" },
      outlined: ({ theme }) => ({
        color: theme.palette.text.primary,
        borderColor: theme.palette.border.norm,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          borderColor: theme.palette.border.norm,
          backgroundColor: theme.palette.action.hover,
        },
      }),
      text: { "&:hover": { backgroundColor: "rgba(39, 128, 237, 0.08)" } },
      containedPrimary: { "&.Mui-disabled": { opacity: 1 } },
    },
  },

  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }),
    },
  },

  MuiTextField: {
    defaultProps: { size: "small" },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        minHeight: 36,
        backgroundColor: theme.palette.background.paper,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.border.field,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.border.norm,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
          borderWidth: 1,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.background.default,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.background.default,
          },
        },
      }),
      input: { padding: "7px 12px" },
      inputSizeSmall: { padding: "7px 12px" },
    },
  },

  MuiInputLabel: {
    styleOverrides: { root: { fontSize: 14 } },
  },

  MuiFormHelperText: {
    styleOverrides: { root: { fontSize: 12, marginLeft: 0, marginTop: 6 } },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.border.field,
        "&.Mui-checked": { color: theme.palette.primary.main },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.border.field,
        "&.Mui-checked": { color: theme.palette.primary.main },
      }),
    },
  },

  MuiSwitch: {
    styleOverrides: {
      switchBase: ({ theme }) => ({
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
        },
      }),
      track: ({ theme }) => ({
        backgroundColor: theme.palette.background.strong,
        opacity: 1,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: { root: { borderRadius: 8, backgroundImage: "none" } },
  },

  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        border: `1px solid ${theme.palette.border.weak}`,
        boxShadow: "none",
      }),
    },
  },

  MuiDialog: {
    styleOverrides: { paper: { borderRadius: 16 } },
  },

  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 5, fontSize: 12, height: 22 },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: { borderRadius: 10, fontSize: 14, alignItems: "flex-start" },
      standardError: { backgroundColor: "#fdecef", color: "#8f1d31" },
      standardWarning: { backgroundColor: "#fff4e5", color: "#8a5300" },
      standardSuccess: { backgroundColor: "#e6f6f1", color: "#0d6b53" },
      standardInfo: { backgroundColor: "#e6f4fb", color: "#155f7e" },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: { borderRadius: 6, fontSize: 12 },
    },
  },

  MuiTab: {
    styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
  },

  MuiBadge: {
    styleOverrides: {
      badge: { fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9 },
    },
  },
};

export default components;
