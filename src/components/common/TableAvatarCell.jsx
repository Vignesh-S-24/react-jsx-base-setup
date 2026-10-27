import { Avatar, Box, Typography } from "@mui/material";

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
    return (
      parts[0].charAt(0) + parts[1].charAt(0)
    ).toUpperCase();
  }

  // Single Name -> First Letter Only
  return parts[0].charAt(0).toUpperCase();
};

const TableAvatarCell = ({
  primaryText,
  secondaryText,
  avatarText,
  tempText,
}) => {
  const ensureString = (val) => {
    if (val && typeof val === "object") {
      return (
        val.name ||
        val.title ||
        val.symbol ||
        val.code ||
        "-"
      );
    }

    return val;
  };

  const safePrimary = ensureString(primaryText);
  const safeSecondary = ensureString(secondaryText);
  const temp = ensureString(tempText);

  const initials = avatarText
    ? getInitials(avatarText)
    : getInitials(safePrimary);

  const backgroundColor =
    getColorFromInitials(initials);

  const textColor =
    getTextColorFromBackground(initials);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        minWidth: 0,
      }}
    >
      <Avatar
        sx={{
          bgcolor: backgroundColor,
          color: textColor,
          fontSize: "13px",
          width: 32,
          height: 32,
          flexShrink: 0,
          textTransform: "uppercase",
        }}
      >
        {initials}
      </Avatar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "14px",
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

export default TableAvatarCell;
