import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'apis/axiosBaseQuery';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => ({
        url: `pokemon/${name}`,
        method: 'GET',
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (error) => {
        if (error?.originalStatus === 404) {
          return { message: 'Pokémon no encontrado' };
        }
        return error;
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
