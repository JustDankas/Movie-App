import React, { Component } from 'react';
import {useParams} from 'react-router-dom';
import { useGetMovieSearchQuery } from '../../redux/moviesApi';
import MovieListing from '../MovieListing/MovieListing';
import Loading from '../Utilities/Loading/Loading';
import './movieSearch.css'
function MovieSearch() {

    const {movieNameSearch} = useParams();
    const {data,isFetching} = useGetMovieSearchQuery(movieNameSearch);
    if(isFetching) return <Loading/>
    console.log(data)

    return ( 
        <div className="center-div">
            <div className="searched-movies">
                <h2 className="movies-found-title">Found Results:</h2>
                <div className="movies-found-c">
                    <MovieListing movieData={data?.results} />
                </div>
            </div>
        </div>
     );
}

export default MovieSearch;