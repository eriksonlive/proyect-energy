import { Button, createTheme, Paper, ThemeProvider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';

const columns = [
  { field: 'codigo', headerName: 'Código', flex: 1 },
  { field: 'producto', headerName: 'Producto', flex: 1 },
  { field: 'precio_unidad', headerName: 'Precio Unidad', flex: 1 },
  { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
  { field: 'precio_cantidad', headerName: 'Precio Cantidad', flex: 1 },
];

const rows = [
  {
    id: 1,
    codigo: '1000001',
    producto: 'Disco duro WD',
    precio_unidad: '100.000',
    cantidad: '1',
    precio_cantidad: '100.000',
  },
  {
    id: 2,
    codigo: '1000002',
    producto: 'Cargador HP',
    precio_unidad: '50.000',
    cantidad: '2',
    precio_cantidad: '100.000',
  },
  {
    id: 3,
    codigo: '1000003',
    producto: 'Mouse Genius',
    precio_unidad: '40.000',
    cantidad: '1',
    precio_cantidad: '40.000',
  },
  {
    id: 4,
    codigo: '1000004',
    producto: 'Computador Lenovo',
    precio_unidad: '1.200.000',
    cantidad: '1',
    precio_cantidad: '1.200.000',
  },
];

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '0.5em 1em',
        },
      },
    },
  },
});

export const CustomDatatable = ({ rows, columns, onDelete, onSelectionModelChange, selectionModel }, props = {}) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 2, // Establece el número de filas visibles
    page: 0, // Página inicial
  });

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 0,
      bottom: params.isLastVisible ? 0 : 0,
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowSpacing={getRowSpacing}
          rows={rows} // Ahora está correctamente definido
          // loading
          columns={columns.map((col) =>
            col.field === 'actions'
              ? {
                  ...col,
                  renderCell: (params) => (
                    <Button
                      color="error"
                      onClick={() => onDelete(params.row.id)}
                    >
                      Eliminar
                    </Button>
                  ),
                }
              : col
          )}
          pageSizeOptions={[2, 5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel,
            },
          }}
          checkboxSelection
          onRowSelectionModelChange={onSelectionModelChange}
          rowSelectionModel={selectionModel}
          sx={{ border: 0 }}
          {...props}
        />
      </Paper>
    </ThemeProvider>
  );
};
