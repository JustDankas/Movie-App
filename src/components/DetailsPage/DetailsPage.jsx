import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery, useGetTrailerQuery } from '../../redux/moviesApi';
import MovieDetail from '../MovieDetail/MovieDetail';
import TvsDetails from '../TvsDetails/TvsDetails';
import Loading from '../Utilities/Loading/Loading';
function DetailsPage() {

    const {movieId,movieName} = useParams()
    const {data,isFetching} = useGetMovieDetailsQuery(movieId);
    // const {data:trailerData,isFetchingTrailer} = useGetTrailerQuery(movieId);
    if(isFetching) return <Loading/>
    console.log(data)
    return ( 
        <div className="details-page-c">
            {data?.type=="Movie"?<MovieDetail data={data} />:<TvsDetails data={data} />}
        </div>
     );
}

export default DetailsPage;