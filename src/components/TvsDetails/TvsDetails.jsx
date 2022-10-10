import React, { Component } from 'react';
import {useGetExternalSitesQuery, useGetMovieDetailsQuery, useGetTrailerQuery} from '../../redux/moviesApi';
import {Link, useParams} from 'react-router-dom';
import '../MovieDetail/movieDetail.css'
import './tvsDetails.css';
import Carousel from '../Utilities/Carousel/Carousel';
import { useState } from 'react';
import {FaPlay} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import PlayTrailerButton from '../Utilities/PlayTrailerButton/PlayTrailerButton';

function TvsDetails({data}) {
    const {movieId,movieName} = useParams()
    const [playTrailer,setPlayTrailer] = useState(false)
    // const {data,isFetching} = useGetMovieDetailsQuery(movieId);
    const {data:trailerData,isFetchingTrailer} = useGetTrailerQuery(movieId);
    const {data:externalSitesData,isFetching} = useGetExternalSitesQuery(movieId);
    function HandlePlayTrailer(){
        setPlayTrailer(!playTrailer)
    }
    console.log('External',externalSitesData)
    return ( 
        <div className="center-div">
            <div className={playTrailer?"movie-details-c-trailer":"movie-details-c"}>
                <div className="img-video-c">
                    {!playTrailer && <img className='movie-details-img' src={data?.image} alt="movie-cover" />}
                    {playTrailer && <div className="video-c">
                        <iframe title={`${data?.title} trailer`} 
                        src={trailerData?.linkEmbed} 
                        frameborder="0" allowFullScreen 
                        ></iframe>
                    </div>}
                </div>
                <div className="all-details-c">             
                    <div className="details-c">
                        <h2 className='movie-details-title' >{data?.title}</h2>
                        <span className="movie-details-info">
                        {`${data?.year} | Starring: ${data?.stars}`}
                        </span>
                        <PlayTrailerButton playTrailer={playTrailer} HandlePlayTrailer={HandlePlayTrailer} />
                        <p className="plot">
                            {data?.plot}
                        </p>
                    </div>
                    <div className="movie-meta-details-c">
                        <h3 className='meta-heading'>Available On: </h3>
                        {externalSitesData?.netflix && <a className='external-link' href={externalSitesData?.netflix.url} target="_blank" >Netflix</a>}
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

export default TvsDetails;