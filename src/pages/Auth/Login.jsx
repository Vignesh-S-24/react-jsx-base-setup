import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Alert,
  Avatar,
  InputAdornment,
  useTheme,
  alpha,
  Divider,
  Button,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import CommonTextField from "../../components/common/Fields/TextField";
import CommonButton from "../../components/common/Fields/Button";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "demo-token");
      setLoading(false);
      navigate("/", { replace: true });
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
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: 1040,
          minHeight: 640,
          m: { xs: 2, md: 4 },
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          backdropFilter: "blur(20px)",
          bgcolor: alpha(theme.palette.background.paper, 0.85),
        }}
      >
        {/* Left Side: Branding & Visuals */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Internal graphics */}
          <Box
            sx={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "80%",
              height: "80%",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "50%",
              backdropFilter: "blur(10px)",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 6, width: "100%" }}
            >
              <Avatar
                sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 44, height: 44 }}
              >
                <DiamondOutlinedIcon />
              </Avatar>
              <Typography variant="h6">NEXUS</Typography>
            </Stack>

            <Typography variant="h3" sx={{ mb: 2, lineHeight: 1.1 }}>
              Elevate your <br />
              workflow.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: "90%",
                fontSize: "1.1rem",
              }}
            >
              Experience the ultimate admin dashboard designed to simplify
              management and boost productivity.
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Form */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            p: { xs: 4, sm: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ maxWidth: 400, width: "100%", mx: "auto" }}>
            <Typography variant="h4" sx={{ mb: 1, color: "text.primary" }}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Please enter your details to sign in.
            </Typography>

            {formError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {formError}
              </Alert>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                startIcon={
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    <path d="M1 1h22v22H1z" fill="none"/>
                  </svg>
                }
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  borderColor: alpha(theme.palette.divider, 0.8),
                  color: "text.secondary",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.action.hover, 0.05),
                  },
                }}
              >
                Google
              </Button>
            </Stack>

            <Divider
              sx={{
                mb: 3,
                "&::before, &::after": {
                  borderColor: alpha(theme.palette.divider, 0.5),
                },
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ px: 1 }}
              >
                OR SIGN IN WITH EMAIL
              </Typography>
            </Divider>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <CommonTextField
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                mandatory
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                }
              />

              <CommonTextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                mandatory
                endAdornment={
                  showPassword ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )
                }
                onEndAdornmentClick={() => setShowPassword((prev) => !prev)}
              />

              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mt: -0.5,
                  mb: 4,
                  width: "100%",
                }}
              >
                <Typography
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "all 0.2s",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  Forgot password?
                </Typography>
              </Stack>

              <CommonButton
                label="Sign In"
                type="submit"
                fullWidth
                size="large"
                loading={loading}
                startIcon={null}
                sx={{
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

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 4 }}
            >
              Don&apos;t have an account?{" "}
              <Typography
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
