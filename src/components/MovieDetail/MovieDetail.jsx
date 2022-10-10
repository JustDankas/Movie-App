import React, { Component } from 'react';
import {useGetMovieDetailsQuery, useGetTrailerQuery} from '../../redux/moviesApi';
import {useParams} from 'react-router-dom';
import './movieDetail.css';
import Carousel from '../Utilities/Carousel/Carousel';
import { useState } from 'react';
import PlayTrailerButton from '../Utilities/PlayTrailerButton/PlayTrailerButton';

function MovieDetail({data}) {
    const {movieId,movieName} = useParams()
    const [playTrailer,setPlayTrailer] = useState(false)
    // const {data,isFetching} = useGetMovieDetailsQuery(movieId);
    const {data:trailerData,isFetchingTrailer} = useGetTrailerQuery(movieId);


    function HandlePlayTrailer(){
        setPlayTrailer(!playTrailer)
    }

    return ( 
        <div className="center-div">
            <div className={playTrailer?"movie-details-c-trailer":"movie-details-c"}>
                <div className="img-video-c">
                    {!playTrailer && <img className='movie-details-img' src={data?.image} alt="movie-cover" />}
                    {playTrailer && <div className="video-c">
                        <iframe width='320' height='180' title={`${data?.title} trailer`} 
                        src={trailerData?.linkEmbed} 
                        frameborder="0" allowFullScreen 
                        ></iframe>
                    </div>}
                </div>
                <div className="all-details-c">
                    <div className="details-c">
                        <h2 className='movie-details-title' >{data?.title}</h2>
                        <span className="movie-details-info">
                        {`${data?.year} | Duration: ${data?.runtimeMins} | Writers: ${data?.writers}`}  
                        </span>
                        <PlayTrailerButton playTrailer={playTrailer} HandlePlayTrailer={HandlePlayTrailer} />
                        <p className="plot">
                            {data?.plot}
                        </p>
                    </div>
                    <div className="movie-meta-details-c">
                        <h3 className='meta-heading'>Starring: </h3>
                        <span className='meta-span'>{data?.stars}</span>
                        <h3 className='meta-heading'>Directors: </h3>
                        <span className='meta-span'>{data?.directors}</span>
                    </div>
                </div>
            </div>
            <div className='movie-details-carousel'>
                <h2 className='carousel-title'>Watch Also</h2>
                <Carousel data={data?.similars} />
            </div>

        </div>
    );
    
}

export default MovieDetail;