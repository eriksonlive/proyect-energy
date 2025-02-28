import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'apis/axiosBaseQuery';

export const login = createApi({
  reducerPath: 'login',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://energytalento.tech/auth-service/api',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        data: { email, password },
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (error) => {
        if (error?.originalStatus === 404) {
          return { message: '' };
        }
        return error;
      },
    }),
    register: builder.mutation({
      query: ({ email, password, lastName, name }) => ({
        url: `/auth/register`,
        method: 'POST',
        data: { email, password, nombre: `${name} ${lastName}` },
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

export const { useLoginMutation, useRegisterMutation } = login;
