import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Character } from '@custom-types/character';

export const potterApi = createApi({
  reducerPath: 'potterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://potterapi-fedeperin.vercel.app/en/characters',
  }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, number | null>({
      query: (index: number | null) => {
        const params = new URLSearchParams();
        params.append('index', String(index));
        return `?${params}`;
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery } = potterApi;
