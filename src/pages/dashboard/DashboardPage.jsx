import { Grid2 as Grid } from '@mui/material';

import 'App.css';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constan';
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import PopularCard from './PopularCard';

export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing} columns={12}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing} columns={12}>
          <Grid size={{ sx: 12, sm: 6, md: 6, lg: 4 }}>
            {/* <EarningCard isLoading={isLoading} /> */}
            <iframe
              src="https://energytalento.tech/grafana/public-dashboards/01c3138b0cd045238eac86215fcf4663"
              width={'100%'}
              height={'100%'}
              frameborder="0"
            ></iframe>
          </Grid>
          <Grid size={{ sx: 12, sm: 6, md: 6, lg: 4 }}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ sx: 12, sm: 12, md: 12, lg: 4 }}>
            <Grid container spacing={gridSpacing} columns={12}>
              <Grid size={{ sx: 12, sm: 6, md: 6, lg: 12 }}>
                <TotalIncomeDarkCard isLoading={isLoading} />
              </Grid>
              <Grid size={{ sx: 12, sm: 6, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: 203,
                    label: 'Total Income',
                    // icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing} columns={12}>
          <Grid size={{ sx: 12, md: 8 }}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid size={{ sx: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
