import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Paper, Stack } from "@mui/material";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        padding: 4, 
        maxWidth: 500, 
        margin: "auto", 
        marginTop: 10, 
        borderRadius: 3, 
        backgroundColor: "#fafafa" 
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" color="secondary" gutterBottom>
          Giriş Yap
        </Typography>
        <Typography variant="body1" textAlign="center">
          Uygulamamıza erişmek için lütfen giriş yapın.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={() => loginWithRedirect()} 
          sx={{ width: '100%', paddingY: 1.5, borderRadius: 2 }}
        >
          Giriş Yap
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
