import {
  Divider,
  Grid2 as Grid,
  MenuItem,
  Select,
  Typography,
  Link as MuiLink,
  useTheme,
  FormGroup,
  Box,
  Button,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { CustomField, CustomLabel } from 'components';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MainCard } from 'ui-component';

const data = [
  { title: 'Pendiente', value: 'pending' },
  { title: 'En proceso', value: 'in proccess' },
  { title: 'Entregado', value: 'delivered' },
  { title: 'Enviado', value: 'sent' },
];

const dataInvoice = [
  {
    fac: 1,
    user: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    direction: 'New York, USA',
    date: '12/10/2021',
    state: 'pending',
    product: 'Product 1',
    quantity: 1,
    discount: 5,
  },
];

const initialValues = {
  fac: 0,
  user: null,
  name: '',
  email: '',
  phone: '',
  direction: '',
  date: new Date(),
  state: null,
  product: null,
  quantity: 0,
  discount: 0,
};

export const CreateInvoicePage = () => {
  const theme = useTheme();
  const [select, setSelect] = useState(0);

  const selectClient = ({ target }) => {
    setSelect(target.value);
  };

  const handleChange = ({ target }) => {
    setSelect(target.value);
  };

  const onSubmit = async (values) => {
    // console.log('Valores enviados:', values);

    try {
      const { data } = await axios.get('http://localhost:3001/invoice');
      const invoice = data;
      const lastInvoice = invoice[invoice.length - 1];

      const newInvoice = {
        id: lastInvoice ? lastInvoice.id + 1 : 1, // Incrementar el ID si ya existen facturas
        fac: `FAC-${(lastInvoice ? lastInvoice.id + 1 : 1)
          .toString()
          .padStart(3, '0')}`, // Generar número de factura
        date: values.date,
        customer: {
          id: values.user,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.direction,
        },
        items: [
          {
            id: values.product,
            name: 'Product 1',
            price: 150,
            quantity: values.quantity,
          },
        ],
        discount: values.discount,
        status: values.state,
      };

      const response = await axios.post(
        'http://localhost:3001/invoice',
        newInvoice
      );
      console.log('Datos enviados:', response.data);
    } catch (error) {
      console.error('Error al sobrescribir datos:', error);
    }
  };

  return (
    <>
      <MainCard>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Crear Factura
        </Typography>
        <Divider />

        <Grid container spacing={2} sx={{ mt: 1, mb: 1 }}>
          <Grid size={12}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, handleChange, errors, touched, setFieldValue }) => (
                <Form>
                  <Grid spacing={2} columns={12}>
                    <Grid size={12}>
                      <Grid container spacing={2} columns={12}>
                        <Grid size={4} sx={{ height: 100 }}>
                          <CustomField
                            type="textfield"
                            textfield={{
                              size: 'small',
                              name: 'fac',
                              id: 'fac',
                              value: values.fac,
                              onChange: handleChange,
                              error: errors.fac && touched.fac,
                              helperText: errors.fac,
                            }}
                            label={{
                              title: 'Numero de factura',
                              sx: { mb: '5px' },
                            }}
                          />
                        </Grid>

                        <Grid
                          size={5}
                          sx={{
                            display: 'flex',
                            height: 110,
                          }}
                        >
                          <FormGroup sx={{ p: 0, m: 0 }}>
                            <CustomLabel
                              title="Seleccione un usuario"
                              sx={{ mb: '5px' }}
                            />
                            <Select
                              size="small"
                              id="lorem"
                              name="user"
                              value={values.user ?? ''}
                              onChange={handleChange}
                              sx={{ width: 180, mr: 0 }}
                              displayEmpty
                            >
                              <MenuItem value="">
                                Seleccione un usuario
                              </MenuItem>
                              <MenuItem value={1}>Example 1</MenuItem>
                              <MenuItem value={2}>Example 2</MenuItem>
                              <MenuItem value={3}>Example 3</MenuItem>
                              <MenuItem value={4}>Example 4</MenuItem>
                            </Select>
                            {/* <FormHelperText>Error</FormHelperText> */}
                          </FormGroup>

                          <MuiLink
                            component={RouterLink}
                            to={'#'}
                            variant="button"
                            underline="none"
                            sx={{
                              ...theme.typography.subtitle2,
                              ...theme.typography.button,
                              background: theme.palette.secondary.light,
                              color: theme.palette.secondary.dark,
                              p: '8px',
                              height: '2.9em',
                              transition: 'all .2s ease-in-out',
                              mt: 2.9,
                              '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                              },
                            }}
                          >
                            Nuevo Cliente
                          </MuiLink>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={12} sx={{ m: '10px 0px' }}>
                      <Divider />
                    </Grid>

                    <Grid size={12}>
                      <Grid container spacing={2} columns={12}>
                        <Grid size={4}>
                          <CustomField
                            type="textfield"
                            textfield={{
                              name: 'name',
                              value: values.name,
                              onChange: handleChange,
                              id: 'name',
                              error: errors.name && touched.name,
                              helperText: errors.name,
                            }}
                            label={{
                              title: 'Nombre cliente *',
                            }}
                          />
                        </Grid>
                        <Grid size={4}>
                          <CustomField
                            type="textfield"
                            textfield={{
                              name: 'email',
                              value: values.email,
                              onChange: handleChange,
                              error: errors.email && touched.email,
                              helperText: errors.email,
                            }}
                            label={{
                              title: 'Correo Cliente',
                            }}
                          />
                        </Grid>
                        <Grid size={4}>
                          <CustomField
                            type="textfield"
                            textfield={{
                              name: 'phone',
                              value: values.phone,
                              onChange: handleChange,
                              error: errors.phone && touched.phone,
                              helperText: errors.phone,
                            }}
                            label={{
                              title: 'Celular Cliente',
                            }}
                          />
                        </Grid>
                        <Grid size={12}>
                          <CustomField
                            type="textfield"
                            textfield={{
                              name: 'direction',
                              value: values.direction,
                              onChange: handleChange,
                              error: errors.direction && touched.direction,
                              helperText: errors.direction,
                            }}
                            label={{
                              title: 'Dirección',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={12} sx={{ m: '10px 0px' }}>
                      <Divider />
                    </Grid>

                    <Grid size={12}>
                      <Grid container spacing={2} columns={12}>
                        <Grid size={6}>
                          <CustomField
                            type="date"
                            date={{
                              format: 'DD/MM/YYYY',
                              name: 'date',
                              value: values.date,
                              onChange: (value) => setFieldValue('date', value),
                            }}
                            label={{
                              title: 'Fecha Factura',
                            }}
                          />
                        </Grid>
                        <Grid size={6}>
                          <CustomField
                            type="select"
                            select={{
                              name: 'state',
                              value: values.state ?? '',
                              onChange: handleChange,
                              data,
                            }}
                            label={{
                              title: 'Estado',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={12} sx={{ m: '10px 0px' }}>
                      <Divider />
                    </Grid>

                    <Grid size={12}>
                      <Grid container spacing={2} columns={12}>
                        <Grid size={4}>
                          <CustomField
                            type="select"
                            select={{
                              value: values.product ?? '',
                              onChange: handleChange,
                              name: 'product',
                              error: errors.product && touched.product,
                              // helperText: errors.product,
                            }}
                            label={{
                              title: 'Producto',
                            }}
                          />
                        </Grid>
                        <Grid size={4}>
                          <CustomField
                            label={{
                              title: 'Cantidad',
                            }}
                            textfield={{
                              type: 'number',
                              value: values.quantity,
                              onChange: handleChange,
                              name: 'quantity',
                              error: errors.quantity && touched.quantity,
                              helperText: errors.quantity,
                            }}
                          />
                        </Grid>
                        <Grid size={4}>
                          <CustomField
                            label={{
                              title: 'Descuento',
                            }}
                            textfield={{
                              type: 'number',
                              value: values.discount,
                              onChange: handleChange,
                              name: 'discount',
                              error: errors.discount && touched.discount,
                              helperText: errors.discount,
                            }}
                          />
                        </Grid>
                        <Grid size={12} sx={{ m: '1em 0' }}>
                          <Stack
                            spacing={1}
                            direction="row"
                            alignItems="end"
                            justifyContent="end"
                          >
                            <Button variant="outlined" color="error">
                              Cancelar
                            </Button>
                            <Button
                              variant="outlined"
                              color="success"
                              type="submit"
                              // disabled={isSubmitting}
                            >
                              Añadir
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={12} sx={{ m: '10px 0px' }}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>

          <Grid size={12}>
            <Grid container spacing={2} columns={12}>
              <Grid size={12}>
                <Box
                  alignContent="flex-end"
                  justifyContent="end"
                  sx={{
                    border: `1px solid ${
                      theme.palette.mode == 'dark' ? '#545b71' : '#c4c4c4'
                    } `,
                    height: 176,
                    width: '100%',
                    display: 'flex', // Cambia a flex
                    justifyContent: 'flex-end', // Alinea a la derecha
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ width: '30%', display: 'block', height: '100%' }}>
                    <Grid container>
                      <Grid size={7}>
                        <Typography variant="body1" sx={{ m: 1 }}>
                          Sub Total:
                        </Typography>
                      </Grid>
                      <Grid size={5} textAlign="end">
                        <Typography variant="body1" sx={{ m: 1 }}>
                          $0
                        </Typography>
                      </Grid>
                      <Grid size={7}>
                        <Typography variant="body1" sx={{ m: 1 }}>
                          Tax (10%):
                        </Typography>
                      </Grid>
                      <Grid size={5} textAlign="end">
                        <Typography variant="body1" sx={{ m: 1 }}>
                          $0
                        </Typography>
                      </Grid>
                      <Grid size={7}>
                        <Typography variant="body1" sx={{ m: 1 }}>
                          Descuento (5%):
                        </Typography>
                      </Grid>
                      <Grid size={5} textAlign="end">
                        <Typography variant="body1" sx={{ m: 1 }}>
                          $0
                        </Typography>
                      </Grid>
                      <Grid size={12} sx={{ m: '10px 0px' }}>
                        <Divider />
                      </Grid>
                      <Grid size={5}>
                        <Typography variant="body1" sx={{ m: 1 }}>
                          Total:
                        </Typography>
                      </Grid>
                      <Grid size={7} textAlign="end">
                        <Typography variant="body1" sx={{ m: 1 }}>
                          $0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};
