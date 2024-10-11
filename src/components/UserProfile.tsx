import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Paper } from "@mui/material";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth0();

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
      <Typography variant="h5" gutterBottom>
        Hoş geldin, {user?.name}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user?.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Kullanıcı ID: {user?.sub}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } }) 
          }
        fullWidth
      >
        Çıkış Yap
      </Button>
    </Paper>
  );
};

export default UserProfile;
