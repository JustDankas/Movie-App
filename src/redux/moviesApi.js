import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const apiKey = 'k_hstzjseo';
const baseUrl = 'https://imdb-api.com/';
const lang = 'en'

export const moviesApi = createApi({
    reducerPath:'moviesApi',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getTop250Movies: builder.query({
            query: ()=> `${lang}/API/Top250Movies/${apiKey}`
        }),
        getInTheaters: builder.query({
            query: ()=> `${lang}/API/InTheaters/${apiKey}`
        }),
        getComingSoon: builder.query({
            query: ()=> `${lang}/API/ComingSoon/${apiKey}`
        }),
        getMovieDetails: builder.query({
            query: (id)=> `${lang}/API/Title/${apiKey}/${id}`                
        }),
        getMovieSearch: builder.query({
            query: (searchTerm)=> `${lang}/API/SearchTitle/${apiKey}/${searchTerm}`                
        }),
        getTrailer: builder.query({
            query: (id)=> `${lang}/API/Trailer/${apiKey}/${id}`                
        }),
        getPopularTvs: builder.query({
            query: ()=> `${lang}/API/MostPopularTVs/${apiKey}`                
        }),
        getExternalSites: builder.query({
            query: (id)=> `${lang}/API/ExternalSites/${apiKey}/${id}`                
        }),
    })
})

export const {
    useGetTop250MoviesQuery,
    useGetInTheatersQuery,
    useGetComingSoonQuery,
    useGetMovieDetailsQuery,
    useGetMovieSearchQuery,
    useGetTrailerQuery,
    useGetPopularTvsQuery,
    useGetExternalSitesQuery,
} = moviesApi;