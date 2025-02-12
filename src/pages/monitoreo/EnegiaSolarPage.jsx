import {
  Box,
  Button,
  Grid2 as Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useGetPokemonByNameQuery } from 'apis';

import { use, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { MainCard } from 'ui-component';

export const EnergiaSolarPage = () => {
  const theme = useTheme();
  const [pokemonName, setPokemonName] = useState([]);

  // Llamar a la API cuando hay un nombre válido
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName, {
    skip: pokemonName.length < 2, // Evita hacer la consulta si el input está vacío
  });

  const [showColumn, setShowColumn] = useState(true);
  const [pokemon, setPokemon] = useState([]);

  const contentPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const handleClick = () => {
    setShowColumn(!showColumn);
  };

  const handlePokemon = async (e) => {
    await fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(function (res) {
        setPokemon(res.results);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // setPokemon(handlePokemon());
    handlePokemon();
  }, []);

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" spacing={2}>
            {/* {pokemon.map((p, index) => (
                <Box key={index}
                  <Typography>{p.name}</Typography>
                  <Link to={p.url}>Ver detalles</Link>
                </Box>
              ))} */}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pokemon.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <Link to={row.url}>{row.name}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};
