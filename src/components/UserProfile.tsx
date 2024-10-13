import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Paper, Stack } from "@mui/material";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        maxWidth: 500,
        margin: "auto",
        marginTop: 8,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" color="primary" gutterBottom>
          Hoş geldin, {user?.name}!
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email}
        </Typography>
        <Typography variant="body1">
          <strong>Kullanıcı ID:</strong> {user?.sub}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          fullWidth
        >
          Çıkış Yap
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => (window.location.href = "/marvel-dashboard")} // Marvel Dashboard'a yönlendirme
        >
          Marvel App Dashboard
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserProfile;
