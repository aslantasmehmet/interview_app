import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Paper } from "@mui/material";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
      <Typography variant="h5" gutterBottom>
        Giriş Yap
      </Typography>
      <Typography variant="body1" paragraph>
        Uygulamamıza erişmek için lütfen giriş yapın.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => loginWithRedirect()} fullWidth>
        Giriş Yap
      </Button>
    </Paper>
  );
};

export default Login;
