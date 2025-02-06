import {
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AuthCardWrapper, AuthWrapper } from 'auth/wrapper';
import { Link } from 'react-router-dom';
import { Logo } from 'ui-component';
import { AuthRegister } from './AuthRegister';

export const RegisterPage = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
      <Grid
        container
        spacing={0}
        derection="column"
        justifyContent="flex-end"
        sx={{ 
          minHeight: "100vh",
          width: "40%",
          margin: 'auto'
        }}
      >
        <Grid size={12}>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh -68px)" }}
          >
            <Grid sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid sx={{ mb: 3 }}>
                    <Link to="#" aria-label="theme logo">
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
                            Registrese
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={{ xs: "center", md: "inherit" }}
                          >
                            Ingrese sus datos para continuar
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={12}>
                    <AuthRegister />
                  </Grid>

                  <Grid size={12}>
                    <Divider />
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    size={12}
                  >
                    <Typography
                      component={Link}
                      to="/login"
                      variant="subtitle1"
                      sx={{ textDecoration: "none" }}
                    >
                      ¿Ya tienes una cuenta?
                    </Typography>
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
