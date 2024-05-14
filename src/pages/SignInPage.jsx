import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";


export default function SignInPage() {
  const [loading, setLoading] = React.useState(false);
  const [scannerOpen, setScannerOpen] = React.useState(false);
  const [, setData] = React.useState("No result");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await axios.post(`http://localhost:3000/api/login`, {
      email: data.get("email"),
      password: data.get("password"),
    });

    const token = res.data.token;

    if (token) {
      localStorage.setItem("token", token);
      navigate("/posts");
      document.location.reload();
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          fullWidth
          onClick={() => setScannerOpen(true)}
        >
          Scan QR
        </Button>
        {!!scannerOpen && (
          <>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  localStorage.setItem('token', result.text)
                  document.location.reload()
                  setData(result?.text);
                }
              }}
              style={{ width: "100%" }}
            />
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              fullWidth
              onClick={() => setScannerOpen(false)}
            >
              Stop Scan qr
            </Button>
          </>
        )}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signUp" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
