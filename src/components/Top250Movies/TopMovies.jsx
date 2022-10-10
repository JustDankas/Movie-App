import React, { Component } from 'react';
import {useGetTop250MoviesQuery} from '../../redux/moviesApi';
import './topMovies.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import Loading from '../Utilities/Loading/Loading';
function TopMovies() {

    const {data:movieData,isFetching} = useGetTop250MoviesQuery();
    const [currentPage,setCurrentPage] = useState(0)

    function HandleChangePage(index){
        setCurrentPage(index)
    }

    function prevPage(){
        setCurrentPage(prev=>prev==0?prev:prev-1)
    }
    function nextPage(){
        setCurrentPage(prev=>prev==Math.ceil(movieData?.items.length/30)-1?prev:prev+1)
    }
    if(isFetching) return <Loading/>
    console.log(movieData)

    return ( 
        <MovieListing movieData={movieData?.items} />
     );
}

export default TopMovies;