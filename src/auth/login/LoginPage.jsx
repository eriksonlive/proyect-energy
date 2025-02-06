import { Divider, Grid2 as Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { AuthCardWrapper, AuthWrapper } from 'auth/wrapper';
import { Link } from 'react-router-dom';
import { Logo } from 'ui-component';
import { AuthLogin } from './AuthLogin';

const userName = {
  user: "erikson",
  pass: "1234",
};

export const LoginPage = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid
        container
        spacing={2}
        columns={12}
        justifyContent="flex-end"
        sx={{minHeight: "100vh", width: '40%', margin: 'auto'}}
      >
        <Grid size={12}>
          <Grid
            container
            spacing={0}
            columns={12}
            justifyContent="center"
            alignContent="center"
            sx={{ minHeight: "calc(100vh -68px)",  }}
          >
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  columns={12}
                >
                  <Grid sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid size={12}>
                    <Grid
                      container
                      direction={{ xs: "column-reverse", md: "row" }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color="secondary.main"
                            gutterBottom
                            variant={downMD ? "h3" : "h2"}
                          >
                            Hola, Bienvenido de vuelta
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit'}}>
                            Ingrese sus credenciales para continuar
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={12}>
                    <AuthLogin />
                  </Grid>

                  <Grid size={12}>
                    <Divider />
                  </Grid>

                  <Grid size={12}>
                    <Grid container direction="column" alignItems="center" size={12}>
                      <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none'}}>
                        No tienes una cuenta?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};