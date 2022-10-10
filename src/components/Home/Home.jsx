import React, { Component } from 'react';
import './home.css';
import {useGetInTheatersQuery,useGetComingSoonQuery, useGetPopularTvsQuery} from '../../redux/moviesApi';
import { useState } from 'react';
import {Carousel,Loading} from '../index.js';
import { Link } from 'react-router-dom';

function Home() {

    const {data:inTheaters,isFetching} = useGetInTheatersQuery();
    const {data:popularTvs} = useGetPopularTvsQuery();

    if(isFetching) return <Loading/>
    console.log(popularTvs)
    return ( 
        <div className='home-c'>
            
            <div className="movies-in-theaters">
                <h2 className='carousel-title'>In Theaters Now:</h2>
                <Carousel data={inTheaters?.items}  />
            </div>
            <div className="popular-tv-series">
                <div className="carousel-headings">
                    <h2 className='carousel-title'>Popular TV Series:</h2>
                    <Link to="/MostPopularTvs" className='carousel-more'>More+</Link>
                </div>
                <Carousel data={popularTvs?.items?.slice(0,15)}  />
            </div>
        </div>
     );
}

export default Home;