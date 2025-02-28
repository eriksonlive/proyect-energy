import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'apis/axiosBaseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://energytalento.tech/gateway/api/',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ apikey, id, ...params }) => ({
        url: `products/${id}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (error) => {
        if (error?.originalStatus === 404) {
          return { message: '' };
        }
        return error;
      },
    }),
  }),
});

export const { useGetProductsQuery } = authApi;
