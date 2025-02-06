import {
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { forwardRef, Fragment } from 'react';

const items = [
  {
    id: "0",
    desc: "Torta de chocolarte LB",
    cant: "1",
    imp: "0",
    vltotal: "45.000",
  },
  { id: "1", desc: "Torta", cant: "5", imp: "9", vltotal: "420.000" },
];

export const FacturaSimple = forwardRef((props, ref) => {
  const theme = useTheme();

  const { view, ...prop } = props;

  return (
    <Paper
      ref={ref}
      sx={{
        p: 2,
        cursor: "pointer",
        "&: hover": {
          boxShadow: `0px 4px 10px `,
        },
        display: !view ? 'none': "",
        // "@media print": {
        //   display: "block",
        // },
      }}
      {...prop}
    >
      <Stack alignItems="center">
        <Typography variant="h3" sx={{ mt: 2 }}>
          Title Example
        </Typography>
        <Typography sx={{ mt: 1 }}>Nit: 1234567</Typography>
        <Typography>Dirección: Cra 42 # 130-50</Typography>
        <Typography>Télefono: 3001234567</Typography>
      </Stack>

      <Stack sx={{ mt: 4 }}>
        <Typography variant="subtitle2">
          <strong>Factura de venta N° 1</strong>
        </Typography>
        <Typography variant="subtitle2">Fecha: 20/02/2024</Typography>
        <Typography variant="subtitle2">
          Fecha vencimiento: 21/02/2024
        </Typography>
        <Divider />
        <Typography variant="subtitle2">Nombre Cliente: Cliente POS</Typography>
        <Typography variant="subtitle2">C.C: 1234567890</Typography>
        <Typography variant="subtitle2">Dirección:</Typography>
        <Typography variant="subtitle2">Télefono:</Typography>
        <Typography variant="subtitle2">E-mail:</Typography>
        <Divider />
      </Stack>

      <Grid container spacing={1}>
        <Grid size={5}>
          <Typography variant="subtitle2">
            <strong>Desc</strong>
          </Typography>
        </Grid>
        <Grid size={2} textAlign="end">
          <Typography variant="subtitle2">
            <strong>Cant.</strong>
          </Typography>
        </Grid>
        <Grid size={2} textAlign="end">
          <Typography variant="subtitle2">
            <strong>Imp.</strong>
          </Typography>
        </Grid>
        <Grid size={3} textAlign="end">
          <Typography variant="subtitle2">
            <strong>Vr Total</strong>
          </Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container spacing={1}>
        {items.map((item) => (
          <Fragment key={item.id}>
            <Grid size={5}>
              <Typography variant="subtitle2">{item.desc}</Typography>
            </Grid>
            <Grid size={2} alignContent="center" textAlign="end">
              <Typography variant="subtitle2">{item.cant}</Typography>
            </Grid>
            <Grid size={2} alignContent="center" textAlign="end">
              <Typography variant="subtitle2">{item.imp}</Typography>
            </Grid>
            <Grid size={3} alignContent="center" textAlign="end">
              <Typography variant="subtitle2">{item.vltotal}</Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      <Divider />

      <Grid container spacing={1} size={12}>
        <Grid size={6}>
          <Grid container spacing={0} columns={12}>
            <Grid size={12}>
              <Typography variant="subtitle2">
                <strong>Forma de pago</strong>
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="subtitle2">Efectivo</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Tarjeta</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Electronico</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Credito</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={6}>
          <Grid container spacing={0} columns={12}>
            <Grid size={6}>
              <Typography variant="subtitle2">SubTotal:</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">45.000</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Dcto:</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Impuesto</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="subtitle2">Propina</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">0</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={7} textAlign="end">
          <Typography variant="subtitle2">
            <strong>Total</strong>
          </Typography>
        </Grid>
        <Grid size={5} textAlign="end">
          <Typography variant="subtitle2">$ 100.000</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container spacing={1} columns={12}>
        <Grid size={6}>
          <Grid container spacing={0} columns={12}>
            <Grid size={6}>
              <Typography variant="subtitle2">Recibido</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">50.000</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={6}>
          <Grid container spacing={0} columns={12}>
            <Grid size={6}>
              <Typography variant="subtitle2">Cambio</Typography>
            </Grid>
            <Grid size={6} textAlign="end">
              <Typography variant="subtitle2">5.000</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <Stack component={Grid} container textAlign="center">
        <Typography variant="subtitle2">DISCRIMINACION I.V.A</Typography>
      </Stack>
      <Divider />

      <Grid container spacing={0} columns={12}>
        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">Tarifa</Typography>
        </Grid>
        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">Base</Typography>
        </Grid>
        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">I.V.A</Typography>
        </Grid>

        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">Comercial</Typography>
        </Grid>
        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">45.000</Typography>
        </Grid>
        <Grid size={4} textAlign="center">
          <Typography variant="subtitle2">0</Typography>
        </Grid>
      </Grid>
      <Divider />

      <Stack
        component={Grid}
        container
        textAlign="center"
        sx={{ m: ".5em 0em" }}
      >
        <Typography variant="subtitle2">ERICK GUIOVANNY AYA</Typography>
      </Stack>
      <Divider />
      <Stack component={Grid} container textAlign="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle2">
          <strong>Elaboro</strong>
        </Typography>
      </Stack>

      <Stack sx={{ mt: 4, mb: 2 }}>
        <Typography variant="subtitle2">
          <strong>Vendedor: </strong>Vendedor principal
        </Typography>
        <Typography variant="subtitle2">
          <strong>Forma de Entrega: </strong>Punto
        </Typography>
        <Typography variant="subtitle2">21/02/2024</Typography>
        <Typography variant="subtitle2">12:16:00 PM - 12:16:00 PM</Typography>
        <Typography variant="subtitle2">
          Esta Factura de venta se asimila en sus efectos a la letra de cambio
          (Art. 621 y 774 de C.C.)
        </Typography>
        <Typography variant="subtitle2" textAlign="center">
          *** Gracias Por Su Compra ***
        </Typography>
      </Stack>
    </Paper>
  );
});
