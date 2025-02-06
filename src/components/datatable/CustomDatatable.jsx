import { createTheme, ThemeProvider } from '@mui/material';
// import MUIDataTables, { TableHead } from 'mui-datatables';

// const columns = [
//   {
//     name: "codigo",
//     label: "Codigo",
//   },
//   {
//     name: "producto",
//     label: "Producto",
//   },
//   {
//     name: "precio_unidad",
//     label: "Precio Unidad",
//   },
//   {
//     name: "cantidad",
//     label: "Cantidad",
//   },
//   {
//     name: "precio_cantidad",
//     label: "Precio Cantidad",
//   },
// ];

// const data = [
//   { codigo: "1000001", producto: "Disco duro WD", precio_unidad: "100.000", cantidad: "1", precio_cantidad: '100.000' },
//   { codigo: "1000002", producto: "cargador HP", precio_unidad: "50.000", cantidad: "2", precio_cantidad: '100.000' },
//   { codigo: "1000003", producto: "Mouse Genius", precio_unidad: "40.000", cantidad: "1", precio_cantidad: '40.000' },
//   { codigo: "1000004", producto: "Computador Levono", precio_unidad: "1.200.000", cantidad: "1", precio_cantidad: '1.200.000' },
// ];

// const options = {
//   filter: false,           // Desactiva los filtros
//   search: false,           // Desactiva la búsqueda
//   print: false,            // Desactiva la opción de imprimir
//   download: false,         // Desactiva la opción de descargar
//   viewColumns: false,      // Desactiva la opción de mostrar/ocultar columnas
//   selectableRows: "none",  // Desactiva la selección de filas
//   pagination: false,       // Desactiva la paginación
//   responsive: "standard",  // Configura la tabla a un estilo estándar
//   rowsPerPage: 5,          // Cantidad de filas por página
//   rowsPerPageOptions: [],  // Elimina la opción de cambiar el número de filas por página
//   toolbar: false,          // Desactiva la barra de herramientas
//   filterType: "textField",  // Tipo de filtro (no será visible si `filter` es `false`)
//   textLabels: {
//     body: {
//       noMatch: "Lo siento, no se encontraron registros coincidentes",
//       toolTip: "Ordenar",
//       columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
//     },
//     pagination: {
//       next: "Siguiente Página",
//       previous: "Página Anterior",
//       rowsPerPage: "Filas por página:",
//       displayRows: "de",
//     },
//     toolbar: {
//       search: "Buscar",
//       downloadCsv: "Descargar CSV",
//       print: "Imprimir",
//       viewColumns: "Ver Columnas",
//       filterTable: "Filtrar Tabla",
//     },
//     filter: {
//       all: "Todos",
//       title: "FILTROS",
//       reset: "REINICIAR",
//     },
//     viewColumns: {
//       title: "Mostrar Columnas",
//       titleAria: "Mostrar/Ocultar Columnas",
//     },
//     selectedRows: {
//       text: "fila(s) seleccionada(s)",
//       delete: "Eliminar",
//       deleteAria: "Eliminar Filas Seleccionadas",
//     },
//   },
// };

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides:{
        root: {
          padding: '0.5em 1em',
          // textAlign: 'center',
          // alignContent: 'center',
          // alignItems: 'center',
          // justifyContent: 'center',
          // justifyItems: 'center'
        }
      }
    },
  }
});

export const CustomDatatable = () => {
  return (
    <ThemeProvider theme={theme}>
      
    </ThemeProvider>
  );
};
