import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CustomField } from 'components';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimateButton } from 'ui-component';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

export const AuthRegister = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [strength, setStrength] = useState(0);
  const [lavel, setLavel] = useState();
  const navigate = useNavigate();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLavel(strengthColor(temp));
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid size={12}>
          <AnimateButton>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {}}
              size="large"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                  alt="Google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Registrar con Google
            </Button>
          </AnimateButton>
        </Grid>

        <Grid size={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]} !important`,
                fontWeight: 500,
                // borderRadius: `${customizar}px`
              }}
              disableRipple
              disabled
            >
              O
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>

        <Grid size={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Registrese con su correo
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          name: "",
          lastName: "",
          email: "",
          password: "",
          checked: false,
        }}
        validate={(values) => {
          let errors = {};
          !values.name
            ? (errors.name = "Ingresa tu Nombre")
            : !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name) &&
              (errors.name = "El nombre solo puede contener letras y espacios");

          !values.lastName
            ? (errors.lastName = "Ingresa tu Apellido")
            : !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName) &&
              (errors.lastName = "El apellido solo puede contener letras y espacios");

          !values.email
            ? (errors.email = "Ingresa un correo valido")
            : !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email) &&
              (errors.email = "El correo solo puede contener letras, numeros, puntos, guiones y guiones bajos");

          !values.password && (errors.password = "Ingresa una contraseña");

          return errors;
        }}
        onSubmit={(values, {resetForm}) => {
          resetForm();
          // console.log(values);
          navigate('/login');
        }}
      >
        {({ errors, values, handleChange, handleBlur, isSubmitting, touched }) => (
          <Form {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomField
                  type="auth"
                  textfield={{
                    label: "Nombre",
                    name: "name",
                    value: values.name,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    error: touched.name && errors.name,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <CustomField
                  type="auth"
                  textfield={{
                    label: "Apellido",
                    name: "lastName",
                    value: values.lastName,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    error: touched.lastName && errors.lastName,
                  }}
                />
              </Grid>
            </Grid>
            <CustomField
              type="auth"
              textfield={{
                label: "Correo",
                type: "email",
                name: "email",
                value: values.email,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.email && errors.email,
              }}
            />

            <CustomField
              type="auth"
              textfield={{
                type: "password",
                label: "Contraseña",
                name: "password",
                value: values.password,
                onChange: (props) => {
                  handleChange(props);
                  changePassword(props.target.value);
                },
                onBlur: handleBlur,
                error: touched.password && errors.password,
              }}
            />

            {strength !== 0 && values.password && (
              <FormControl
                fullWidth
                sx={{
                  opacity: strength !== 0 ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                  visibility: strength !== 0 ? "visible" : "hidden",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid>
                      <Box
                        sx={{
                          backgroundColor: lavel?.color,
                          transition: "background-color 0.5s ease-in-out",
                          width: 85,
                          height: 8,
                          borderRadius: "7px",
                        }}
                      />
                    </Grid>

                    <Grid>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {lavel?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ ml: 1 }}
            >
              <Grid>
                <Field name="checked">
                  {({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label={
                        <Typography variant="subtitle1">
                          Aceptar &nbsp;
                          <Typography
                            variant="subtitle1"
                            component={Link}
                            to="#"
                          >
                            Terminos y Condiciones
                          </Typography>
                        </Typography>
                      }
                    />
                  )}
                </Field>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Registrar
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
