import { Avatar, Box, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Typography, TextField } from "@mui/material";
import logo from "../images/logo.png";
import bg from "../images/eny.png";
import noprofile from "../images/no-profile.png";

export default function PostsPage() {
  const [qrImage, setQrImage] = React.useState("");
  const [user, setUser] = React.useState(undefined);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    const parsedJwt = parseJwt(token);

    if (parsedJwt.user_id || parsedJwt.userId) {
      axios
        .post("https://qr-auth-backend.vercel.app/qr/generate", {
          userId: parsedJwt.user_id || parsedJwt.userId || "",
        })
        .then((res) => {
          setQrImage(res.data.dataImage);
        });
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    const parsedJwt = parseJwt(token);

    if (parsedJwt.email) {
      axios
        .post("https://qr-auth-backend.vercel.app/user", {
          email: parsedJwt.email || "",
        })
        .then((res) => {
          setUser(res.data.user);
        });
    }
  }, []);
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {!!user && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
            <Box
              boxShadow="8px 8px 16px 4px rgba(0,0,0,0.5)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              width='80%'
              maxWidth={400}
              m={2}
              p={2}
              borderRadius={5}
              bgcolor="white"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                <img src={logo} alt="logo" height={80} width={80} />
              </Box>
              <Typography variant="h4" gutterBottom>
                Profile
              </Typography>
              <Avatar src={noprofile} sx={{ width: 100, height: 100 }} />

              <TextField
                label="Имя"
                variant="outlined"
                fullWidth
                value={user.first_name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Фамилия"
                variant="outlined"
                fullWidth
                value={user.last_name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={user.email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("token");
                  document.location.reload();
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign out
              </Button>
            </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
            width={300}
            borderRadius={5}
            bgcolor="#ffffff2e"
            boxShadow="8px 8px 16px 4px rgba(0,0,0,0.5)"
          >
            <Box p={2} borderRadius={2}>
              <img src={qrImage} height={200} width={200} alt="qr" />
            </Box>
            <Box
              position="absolute"
              width={20}
              height={20}
              bottom={12.5}
              left="50%"
              bgcolor="#151515"
              zIndex={1}
              sx={{ transform: "translateX(-50%) rotate(45deg)" }}
            />
            <Typography
              width="100%"
              borderRadius={2}
              position="relative"
              zIndex={2}
              variant="body1"
              fontWeight={500}
              textAlign="center"
              bgcolor="#151515"
              color="#fff"
            >
              SCAN IT!
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
