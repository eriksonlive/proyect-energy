import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const example = () => {
  const [pokemon, setPokemon] = useState([]);

  const handlePokemon = async (e) => {
    await fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
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
    <>
      {/* Ejemplo de return Explicito */}
      {/* {pokemon.map((row) => {

            if (row.name === 'bulbasaur') {
                return (
                    <Box key={row.name}>
                    <Typography>{row.name}</Typography>
                    <Link to={row.url}>Ver detalles</Link>
                    </Box>);
            }

            return (
                <Box key={row.name}>
                <Typography>{row.name}</Typography>
                <Link to={row.url}>Ver detalles</Link>
                </Box>
            );
        })} */}

      {/* ejemplo de return Implicito */}
      {pokemon.map((pokemon) => (
        <Box key={pokemon.name}>
          <Typography component="th" scope="row">
            {pokemon.name}
          </Typography>
          {/* <TableCell>
            <Link to={pokemon.url}>{pokemon.name}</Link>
          </TableCell> */}
        </Box>
      ))}
    </>
  );
};
