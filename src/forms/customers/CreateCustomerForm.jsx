import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { CustomField, VerticalTabs } from 'components';
import { Form, Formik } from 'formik';

const example = [
  { id: 0, title: 'Energía solar' },
  { id: 1, title: 'Hidrógeno' },
  { id: 2, title: 'Energía eólica' },
  { id: 3, title: 'Energía de los mares' },
  { id: 4, title: 'Energía a partir de residuos' },
];

export const CreateCustomerForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        lastName: '',
        sexo: 0,
      }}
    >
      {({ handleChange }) => (
        <Form>
          <VerticalTabs dataTabs={example}>
            <Grid container spacing={2}>
              <img
                src="https://www.minenergia.gov.co/media/media/energia-solar.svg"
                alt="Energía solar"
                width={100}
              />
            </Grid>
            <Grid container spacing={2}>
              
              <img
                src="https://www.minenergia.gov.co/media/media/hidrogeno-01.svg"
                alt="hidrogeno-01"
                width={100}
              />
              <Typography
                sx={{ bgcolor: '#c4c4c4', width: '100%', display: 'block' }}
              >
                El hidrógeno es un elemento ligero y limpio que se usa como
                combustible y para almacenar energía, sin generar emisiones de
                gases contaminantes. Existen tres tipos: Hidrógeno gris: Se
                produce a partir de combustibles fósiles sin capturar el
                carbono. Hidrógeno azul: Similar al gris, pero con captura y
                almacenamiento de carbono. Hidrógeno verde: Se produce a partir
                de energías renovables, siendo el más limpio.
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              <img
                src="https://www.minenergia.gov.co/media/media/energia_eolica.svg"
                alt="hidrogeno-01"
                width={100}
              />
            </Grid>
            <Grid container spacing={2}>
              <img
                src="https://www.minenergia.gov.co/media/media/energia_mares.svg"
                alt="hidrogeno-01"
                width={100}
              />
            </Grid>
            <Grid container spacing={2}>
              <img
                src="https://www.minenergia.gov.co/media/media/energia_residuos-01.svg"
                alt="hidrogeno-01"
                width={100}
              />
              <Box component="div"></Box>
            </Grid>
          </VerticalTabs>
        </Form>
      )}
    </Formik>
  );
};
