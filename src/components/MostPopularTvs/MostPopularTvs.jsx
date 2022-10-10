import React, { Component } from 'react';
import { useGetPopularTvsQuery } from '../../redux/moviesApi';
import MovieListing from '../MovieListing/MovieListing';
import Loading from '../Utilities/Loading/Loading';
function MostPopularTvs() {

    const {data:popularTvsData,isFetching} = useGetPopularTvsQuery();

    if(isFetching) return <Loading/>
    console.log(popularTvsData)
    return ( 
        <div className="mostPopularTvs">
            <MovieListing movieData={popularTvsData?.items} />
        </div>
     );
}

export default MostPopularTvs;