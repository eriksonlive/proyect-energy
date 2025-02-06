import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2 as Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CustomField } from 'components';
import { Customization } from 'layout/custom';
import { AnimateButton } from 'ui-component';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router';

export const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid size={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            onClick={() => {}}
            size="large"
            variant="outlined"
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
            Ingresa con Google
          </Button>
        </AnimateButton>
      </Grid>

      <Grid size={12}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
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
              borderRadius: `${Customization.borderRadius}px`,
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
          <Typography variant="subtitle1">Ingresar con el correo</Typography>
        </Box>
      </Grid>

      <Formik
        initialValues={{
          user: "",
          password: "",
          checked: false,
        }}
        validate={(values) => {
          let errors = {};

          !values.user
            ? (errors.user = "Ingresa un correo valido")
            : !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.user) &&
              (errors.user ="El correo solo puede contener letras, numeros, puntos, guiones y guiones bajos");

          !values.password && (errors.password = "Ingresa una contraseña");

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          // console.log(values);
          navigate('/');
        }}
      >
        {({
          errors,
          values,
          handleChange,
          handleBlur,
          touched,
          isSubmitting,
        }) => (
          <Form {...others}>
            <CustomField
              type="auth"
              textfield={{
                type: "email",
                label: "Correo",
                name: "user",
                value: values.user,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.user && errors.user,
              }}
            />

            <CustomField
              type="auth"
              textfield={{
                label: "Contraseña",
                type: "password",
                name: "password",
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur,
                error: touched.password && errors.password,
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Field name="checked">
                {({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        color="primary"
                        checked={field.value}
                      />
                    }
                    label="Recuerdame"
                  />
                )}
              </Field>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Olvidaste la contraseña?
              </Typography>
            </Stack>

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
                  Ingresar
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};