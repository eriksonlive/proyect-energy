import { Grid2 as Grid, Typography } from '@mui/material';
import { VerticalTabs } from 'components';

const tabs = [
  { id: 0, title: 'Energía solar' },
  { id: 1, title: 'Hidrógeno' },
  { id: 2, title: 'Energía eólica' },
  { id: 3, title: 'Energía de los mares' },
  { id: 4, title: 'Energía a partir de residuos' },
];

export const CreateCustomerForm = () => {
  return (
    <VerticalTabs dataTabs={tabs} sx={{ border: 'solid red 1px' }}>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#b39ddb' }}>
            Energía solar
          </Typography>
        </Grid>

        <Grid size={4}>
          <img
            src="https://www.minenergia.gov.co/media/media/energia-solar.svg"
            alt="hidrogeno-01"
            style={{ maxWidth: '80%' }}
          />
        </Grid>

        {/* Texto */}
        <Grid size={8}>
          <Typography
            sx={{ color: '#050404', p: 2, borderRadius: 2, fontSize: 20 }}
          >
            Energía obtenida a partir de aquella fuente no convencional de
            energía renovable que consiste en la radiación electromagnética
            proveniente del sol.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#b39ddb' }}>
            Hidrógeno
          </Typography>
        </Grid>
        <Grid size={4}>
          <img
            src="https://www.minenergia.gov.co/media/media/hidrogeno-01.svg"
            alt="hidrogeno-01"
            style={{ maxWidth: '80%' }}
          />
        </Grid>

        {/* Texto */}
        <Grid size={8}>
          <Typography
            sx={{ color: '#050404', p: 2, borderRadius: 2, fontSize: 20 }}
          >
            El hidrógeno es un elemento ligero y limpio que se usa como
            combustible y para almacenar energía, sin generar emisiones de gases
            contaminantes. Existen tres tipos: <br />
            <strong>Hidrógeno gris:</strong> Se produce a partir de combustibles
            fósiles sin capturar el carbono. <br />
            <strong>Hidrógeno azul:</strong> Similar al gris, pero con captura y
            almacenamiento de carbono. <br />
            <strong>Hidrógeno verde:</strong> Se produce a partir de energías
            renovables, siendo el más limpio.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#b39ddb' }}>
            Energía eólica
          </Typography>
        </Grid>
        <Grid size={4}>
          <img
            src="https://www.minenergia.gov.co/media/media/energia_eolica.svg"
            alt="hidrogeno-01"
            style={{ maxWidth: '80%' }}
          />
        </Grid>

        {/* Texto */}
        <Grid size={8}>
          <Typography
            sx={{ color: '#050404', p: 2, borderRadius: 2, fontSize: 20 }}
          >
            Energía obtenida a partir de aquella fuente no convencional de
            energía renovable que consiste en el movimiento de las masas de
            aire. También es FNCER la energía eólica costa afuera
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#b39ddb' }}>
            Energía de los mares
          </Typography>
        </Grid>
        <Grid size={4}>
          <img
            src="https://www.minenergia.gov.co/media/media/energia_mares.svg"
            alt="hidrogeno-01"
            style={{ maxWidth: '80%' }}
          />
        </Grid>

        {/* Texto */}
        <Grid size={8}>
          <Typography
            sx={{ color: '#050404', p: 2, borderRadius: 2, fontSize: 20 }}
          >
            Energía obtenida a partir de aquella fuente no convencional de
            energía renovable que consiste en la radiación electromagnética
            proveniente del sol.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#b39ddb' }}>
            Energía a partir de los residuos
          </Typography>
        </Grid>
        <Grid size={4}>
          <img
            src="https://www.minenergia.gov.co/media/media/energia_residuos-01.svg"
            alt="hidrogeno-01"
            style={{ maxWidth: '80%' }}
          />
        </Grid>

        {/* Texto */}
        <Grid size={8}>
          <Typography
            sx={{ color: '#050404', p: 2, borderRadius: 2, fontSize: 20 }}
          >
            Energía obtenida a partir de aquella fuente no convencional de
            energía renovable que consiste en la radiación electromagnética
            proveniente del sol.
          </Typography>
        </Grid>
      </Grid>
    </VerticalTabs>
  );
};
