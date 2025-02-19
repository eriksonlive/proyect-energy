import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'apis/axiosBaseQuery';

export const pvWatts = createApi({
  reducerPath: 'pvwatts',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://developer.nrel.gov/api/' }),
  endpoints: (builder) => ({
    postByArea: builder.query({
      query: (params) => ({
        url: `pvwatts/v8?format=json&api_key=nmagJbURbhEg9MaZclDNv4gGomCURGt98KeM2u0G&system_capacity=${params.system_capacity}&module_type=${params.module_type}&losses=${params.losses}&array_type=1&tilt=9&azimuth=21&lat=${params.lat}&lon=${params.lon}`,
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

// !Api referencia
// !https://developer.nrel.gov/api/pvwatts/v8?format=json&api_key=nmagJbURbhEg9MaZclDNv4gGomCURGt98KeM2u0G&system_capacity=35.6&module_type=0&losses=10&array_type=1&tilt=9&azimuth=21&lat=6.1824&lon=-75.5681

export const { usePostByAreaQuery } = pvWatts;
