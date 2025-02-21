import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'apis/axiosBaseQuery';

export const energiaSolar = createApi({
  reducerPath: 'energiaSolar',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://www.simem.co/backend-files/api/',
  }),
  endpoints: (builder) => ({
    getQueryByDate: builder.query({
      query: (params) => ({
        url: `PublicData?startDate=2025-02-19&endDate=2025-02-21&datasetId=7e704d&columnDestinyName=null&values=null`,
        method: 'GET',
        // headers: 'X-Api-Key nmagJbURbhEg9MaZclDNv4gGomCURGt98KeM2u0G',
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

export const { useGetQueryByDateQuery } = energiaSolar;
