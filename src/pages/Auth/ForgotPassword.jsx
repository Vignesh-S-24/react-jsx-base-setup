import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Avatar,
  InputAdornment,
  useTheme,
  alpha,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CommonTextField from "../../components/common/Fields/TextField";
import CommonButton from "../../components/common/Fields/Button";

const ForgotPassword = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 0% 0%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
                     radial-gradient(circle at 100% 100%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 50%)`,
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Decorative ambient background blur */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: "50vw",
          height: "50vw",
          background: theme.palette.primary.main,
          filter: "blur(120px)",
          opacity: 0.08,
          borderRadius: "50%",
          animation: "pulse 10s infinite alternate",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", opacity: 0.05 },
            "100%": { transform: "scale(1.1)", opacity: 0.12 },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "40vw",
          height: "40vw",
          background: theme.palette.secondary.main,
          filter: "blur(100px)",
          opacity: 0.08,
          borderRadius: "50%",
        }}
      />

      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          position: "relative",
          zIndex: 1,
          boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          backdropFilter: "blur(20px)",
          bgcolor: alpha(theme.palette.background.paper, 0.85),
        }}
      >
        {!submitted ? (
          <>
            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.32)}`,
                }}
              >
                <LockResetOutlinedIcon />
              </Avatar>
              <Typography variant="h4" sx={{ color: "text.primary" }}>
                Forgot password?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                No worries, enter your email and we&apos;ll send you a link to
                reset it.
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <CommonTextField
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                mandatory
                autoFocus
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                }
              />

              <CommonButton
                label="Send Reset Link"
                type="submit"
                fullWidth
                size="large"
                loading={loading}
                startIcon={null}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.24)}`,
                  "&:hover": {
                    boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.32)}`,
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s",
                }}
              />
            </Box>
          </>
        ) : (
          <Stack alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: alpha(theme.palette.success.main, 0.15),
                color: theme.palette.success.main,
              }}
            >
              <MarkEmailReadOutlinedIcon />
            </Avatar>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Check your email
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              We&apos;ve sent a password reset link to{" "}
              <Typography component="span" fontWeight={700} color="text.primary">
                {email}
              </Typography>
              .
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Didn&apos;t receive the email? Check your spam folder or{" "}
              <Typography
                component="span"
                variant="body2"
                onClick={() => setSubmitted(false)}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                try another address
              </Typography>
              .
            </Typography>
          </Stack>
        )}

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ mt: 4 }}
        >
          <ArrowBackOutlinedIcon
            fontSize="small"
            sx={{ color: "text.secondary" }}
          />
          <Typography
            component={RouterLink}
            to="/login"
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            Back to sign in
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
