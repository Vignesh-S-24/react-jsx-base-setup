import { Avatar, Box, Typography, useTheme } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const getColorFromInitials = (text) => {
  const colors = [
    "#E3F2FD",
    "#F3E5F5",
    "#E8F5E9",
    "#FFF3E0",
    "#FFEBEE",
    "#F1F8E9",
    "#EFEBE9",
    "#ECEFF1",
  ];

  if (!text) return colors[0];

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const getTextColorFromBackground = (text) => {
  const textColor = [
    "#1976D2",
    "#7B1FA2",
    "#388E3C",
    "#F57C00",
    "#D32F2F",
    "#689F38",
    "#5D4037",
    "#455A64",
  ];

  if (!text) return textColor[0];

  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  return textColor[Math.abs(hash) % textColor.length];
};

const getInitials = (name = "") => {
  if (!name) return "?";

  const parts = name.trim().split(" ");

  // First Name + Last Name
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  // Single Name -> First Letter Only
  return parts[0].charAt(0).toUpperCase();
};

const NDETableAvatarCell = ({
  primaryText,
  secondaryText,
  avatarText,
  tempText,
  src,
  isSuperAdmin = false,
}) => {
  const theme = useTheme();
  const ensureString = (val) => {
    if (val && typeof val === "object") {
      return val.name || val.title || val.symbol || val.code || "-";
    }

    return val;
  };

  const safePrimary = ensureString(primaryText);
  const safeSecondary = ensureString(secondaryText);
  const temp = ensureString(tempText);

  const initials = avatarText
    ? getInitials(avatarText)
    : getInitials(safePrimary);

  const backgroundColor = getColorFromInitials(initials);

  const textColor = getTextColorFromBackground(initials);

  const avatarEl = (
    <Avatar
      src={src}
      sx={{
        bgcolor: backgroundColor,
        color: textColor,
        fontSize: "14px",
        width: 36,
        height: 36,
        flexShrink: 0,
        textTransform: "uppercase",
      }}
    >
      {initials}
    </Avatar>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        minWidth: 0,
      }}
    >
      {isSuperAdmin ? (
        <Box
          sx={{ position: "relative", display: "inline-flex", flexShrink: 0 }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              padding: "2px",
              display: "inline-flex",
              boxShadow: "0 0 0 0px transparent",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                background: theme.palette.background.paper,
                padding: "2px",
                display: "inline-flex",
              }}
            >
              {avatarEl}
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 4px rgba(245,158,11,0.5)",
              border: `1.5px solid ${theme.palette.background.paper}`,
            }}
          >
            <WorkspacePremiumIcon
              sx={{ fontSize: "10px", color: "background.paper" }}
            />
          </Box>
        </Box>
      ) : (
        avatarEl
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Typography
          className="nde-primary-text"
          title={safePrimary || ""}
          sx={{
            color: "primary.main",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.2,
            textTransform: "capitalize",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 120,
          }}
        >
          {safePrimary || "-"}
        </Typography>

        {safeSecondary && (
          <Typography
            sx={{
              fontSize: "11px",
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              mt: 0.3,
            }}
          >
            {safeSecondary}
          </Typography>
        )}

        {temp && (
          <Typography
            sx={{
              fontSize: "12px",
              color: "text.secondary",
              letterSpacing: "0.4px",
            }}
          >
            {temp}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default NDETableAvatarCell;
