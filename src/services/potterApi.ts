import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { Character } from '@custom-types/character';
import { API_BASE_URL, PAGE_LIMIT } from '@constants/index';

export const potterApi = createApi({
  reducerPath: 'potterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { searchResults: Character[]; hasMorePages: boolean },
      { searchString: string; currentPage: number }
    >({
      async queryFn(
        { searchString, currentPage },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        const params = new URLSearchParams();
        if (searchString) {
          params.append('search', searchString);
        }
        params.append('page', String(currentPage));
        params.append('max', String(PAGE_LIMIT));

        const result = await fetchWithBQ(`?${params}`);
        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }

        const data = (result.data ?? []) as Character[];

        let hasMorePages = false;

        params.set('page', String(currentPage + 1));
        const { data: nextPageData } = await fetchWithBQ(`?${params}`);
        if (
          nextPageData &&
          Array.isArray(nextPageData) &&
          nextPageData.length > 0
        ) {
          hasMorePages = true;
        }
        return { data: { searchResults: data, hasMorePages } };
      },
      providesTags: ['Characters'],
      keepUnusedDataFor: 20,
    }),

    getCharacterById: builder.query<Character, number | null>({
      query: (index: number | null) => {
        const params = new URLSearchParams();
        params.append('index', String(index));
        return `?${params}`;
      },
      providesTags: ['Character'],
      keepUnusedDataFor: 20,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = potterApi;
