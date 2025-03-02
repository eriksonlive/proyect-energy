import {
  Button,
  Divider,
  Grid2 as Grid,
  ImageList,
  ImageListItem,
  Stack,
} from '@mui/material';
import { CreateCustomerForm } from 'forms';
import FsLightbox from 'fslightbox-react';
import { useState } from 'react';

import { MainCard } from 'ui-component';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const images = [
  {
    src: 'https://comofuncionaque.com/wp-content/uploads/2015/09/energia-eolica1.jpg?ezimgfmt=ng:webp/ngcb1',
    original:
      'https://comofuncionaque.com/wp-content/uploads/2015/09/energia-eolica1.jpg?ezimgfmt=ng:webp/ngcb1',
    width: 320,
    height: 174,
    rows: 2,
    cols: 2,
    tags: [
      { value: 'Nature', title: 'Nature' },
      { value: 'Flora', title: 'Flora' },
    ],
    caption: 'eolica',
  },
  {
    src: 'https://arquinea.es/wp-content/uploads/2023/05/10-formas-de-aprovechar-la-energia-solar-1536x1024.jpg',
    original:
      'https://arquinea.es/wp-content/uploads/2023/05/10-formas-de-aprovechar-la-energia-solar-1536x1024.jpg',
    width: 320,
    height: 212,
    caption: 'Boats (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://energyandcommerce.com.mx/wp-content/uploads/2020/01/Mareomotriz-enero-energy-and-commerce-960x640.jpeg',
    original:
      'https://energyandcommerce.com.mx/wp-content/uploads/2020/01/Mareomotriz-enero-energy-and-commerce-960x640.jpeg',
    width: 320,
    height: 213,
    caption: 'mares',
  },
  {
    src: 'https://media.ambito.com/p/f6fd9692406b87487468774e929bf743/adjuntos/239/imagenes/039/070/0039070437/energia-residuosjpg.jpg',
    original:
      'https://media.ambito.com/p/f6fd9692406b87487468774e929bf743/adjuntos/239/imagenes/039/070/0039070437/energia-residuosjpg.jpg',
    width: 320,
    height: 183,
    caption: 'Residuos',
  },
  {
    src: 'https://www.hibridosyelectricos.com/uploads/s1/53/27/40/paneles-solares-tanque-hidrogeno-h2-turbinas-energia-eolica-representacion-3d_4_1000x563.jpeg',
    original:
      'https://www.hibridosyelectricos.com/uploads/s1/53/27/40/paneles-solares-tanque-hidrogeno-h2-turbinas-energia-eolica-representacion-3d_4_1000x563.jpeg',
    width: 240,
    height: 320,
    tags: [{ value: 'Nature', title: 'Nature' }],
    caption: 'Hidrogeno',
  },
  {
    src: 'https://www.bbva.com/wp-content/uploads/2021/06/BBVA-energia-geotermica-sostenibilidad.jpg',
    original:
      'https://www.bbva.com/wp-content/uploads/2021/06/BBVA-energia-geotermica-sostenibilidad.jpg',
    width: 320,
    height: 190,
    caption: 'Géotermica',
  },
  {
    src: 'https://assets.nabaliaenergia.com/site/blog/que-tipos-de-energia-hidraulica-existen.webp',
    original:
      'https://assets.nabaliaenergia.com/site/blog/que-tipos-de-energia-hidraulica-existen.webp',
    width: 320,
    height: 148,
    tags: [{ value: 'People', title: 'People' }],
    caption: 'Hidraulica',
  },
  {
    src: 'https://www.repsol.com/content/dam/repsol-corporate/es/energia-e-innovacion/central-biomasa.jpg',
    original:
      'https://www.repsol.com/content/dam/repsol-corporate/es/energia-e-innovacion/central-biomasa.jpg',
    width: 320,
    height: 213,
    caption: 'Biomasa',
  },
  {
    src: 'https://pymstatic.com/9224/conversions/tipos-energia-wide_webp.webp',
    original:
      'https://pymstatic.com/9224/conversions/tipos-energia-wide_webp.webp',
    alt: 'Big Ben - London',
    width: 248,
    height: 320,
    caption: 'Electrica',
  },
  {
    src: 'https://ienergias.com/wp-content/uploads/2020/11/tipos-de-energia-unsplash-federico-beccari-tipos-1024x683.jpg',
    original:
      'https://ienergias.com/wp-content/uploads/2020/11/tipos-de-energia-unsplash-federico-beccari-tipos-1024x683.jpg',
    alt: 'Red Zone - Paris',
    width: 320,
    height: 113,
    tags: [{ value: 'People', title: 'People' }],
    caption: 'Red Zone - Paris (Tom Eversley - isorepublic.com)',
  },
  {
    src: 'https://ienergias.com/wp-content/uploads/2020/11/Carbon-Tipos-de-energia-no-renovables-1024x768.jpeg',
    original:
      'https://ienergias.com/wp-content/uploads/2020/11/Carbon-Tipos-de-energia-no-renovables-1024x768.jpeg',
    alt: 'Wood Glass',
    width: 313,
    height: 320,
    caption: 'Wood Glass (Tom Eversley - isorepublic.com)',
  },
  // {
  //   src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
  //   original: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
  //   width: 320,
  //   height: 212,
  //   caption: 'Solar',
  // },
  // {
  //   src: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
  //   original: 'https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg',
  //   width: 320,
  //   height: 213,
  //   caption: 'Flower Interior Macro (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
  //   original: 'https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg',
  //   width: 320,
  //   height: 194,
  //   caption: 'Old Barn (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
  //   original: 'https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg',
  //   alt: 'Cosmos Flower',
  //   width: 320,
  //   height: 213,
  //   caption: 'Cosmos Flower Macro (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
  //   original: 'https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg',
  //   width: 271,
  //   height: 320,
  //   caption: 'Orange Macro (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
  //   original: 'https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg',
  //   width: 320,
  //   height: 213,
  //   tags: [
  //     { value: 'Nature', title: 'Nature' },
  //     { value: 'People', title: 'People' },
  //   ],
  //   caption: 'Surfer Sunset (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
  //   original: 'https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg',
  //   width: 320,
  //   height: 213,
  //   tags: [
  //     { value: 'People', title: 'People' },
  //     { value: 'Sport', title: 'Sport' },
  //   ],
  //   caption: 'Man on BMX (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
  //   original: 'https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg',
  //   width: 320,
  //   height: 213,
  //   caption: 'Ropeman - Thailand (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
  //   original: 'https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg',
  //   width: 320,
  //   height: 213,
  //   caption: 'Time to Think (Tom Eversley - isorepublic.com)',
  // },
  // {
  //   src: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
  //   original: 'https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg',
  //   width: 320,
  //   height: 179,
  //   tags: [
  //     { value: 'Nature', title: 'Nature' },
  //     { value: 'Fauna', title: 'Fauna' },
  //   ],
  //   caption: 'Untitled (Jan Vasek - jeshoots.com)',
  // },
  // {
  //   src: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
  //   original: 'https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg',
  //   width: 320,
  //   height: 215,
  //   tags: [{ value: 'People', title: 'People' }],
  //   caption: 'Untitled (moveast.me)',
  // },
  // {
  //   src: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
  //   original: 'https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg',
  //   width: 257,
  //   height: 320,
  //   cols: 2,
  //   caption: 'A photo by 贝莉儿 NG. (unsplash.com)',
  // },
  // {
  //   src: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
  //   original: 'https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg',
  //   width: 226,
  //   rows: 2,
  //   height: 320,
  //   caption: 'A photo by Matthew Wiebe. (unsplash.com)',
  // },
];

export const EnergiasRenovables = () => {
  const [toggler, setToggler] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setToggler(!toggler);
  };
  return (
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack direction="row" spacing={2}>
              <Divider />
              <CreateCustomerForm />
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard sx={{ mt: 2, py: 4 }}>
        <Grid container spacing={2}>
          <Grid size={12} sx={{ px: 4 }}>
            <ImageList
              // sx={{ width: 500, height: 450 }}
              variant="masonry"
              cols={3}
              gap={8}
              // cols={4}
              // rowHeight={121}
            >
              {images.map((item, index) => (
                <ImageListItem
                  key={index}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.src, 121, item.rows, item.cols)}
                    alt={item.caption}
                    loading="lazy"
                    onClick={() => handleImageClick(index)}
                  />
                </ImageListItem>
              ))}
              <FsLightbox
                toggler={toggler}
                slide={selectedIndex + 1}
                sources={images.map((item) => item.src)}
              />
            </ImageList>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};
