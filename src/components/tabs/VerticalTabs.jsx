import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

const TabPanel = ({ children, value, index, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...props}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

export const VerticalTabs = ({ children, uniqueKey, dataTabs = [], ...props }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "15vw" }}
      >
        {dataTabs.map((tabs) => (
          <Tab
            key={tabs?.id}
            label={
              <Box>
                <Typography variant="subtitle1">{tabs?.title}</Typography>
                <Typography variant="subtitle2">{tabs?.subTitle}</Typography>
              </Box>
            }
            {...a11yProps(tabs?.id)}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          flexGrow: 1, // Esto asegura que el TabPanel se ajuste al resto del espacio
          height: "100%", // Hace que el TabPanel ocupe la altura completa
          overflowY: "auto", // Agrega desplazamiento si el contenido del TabPanel es mayor al contenedor
          width: '20vw'
        }}
      >
        {React.Children.map(children, (child, index) => (
          <TabPanel key={index} value={value} index={index} {...props}>
            {React.cloneElement(child, { id: dataTabs.length > 0 ? dataTabs[index].id: index})}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};
