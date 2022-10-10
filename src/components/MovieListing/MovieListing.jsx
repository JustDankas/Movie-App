import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {PagesNav} from '../index.js';
import './movieListing.css'

function MovieListing({movieData}) {

    const [currentPage,setCurrentPage] = useState(0)
    const [nOfItems,setnOfItems] = useState(30)

    function resizeWindow(width){
        if(width>1670){
            setnOfItems(25)
        }
        else if(width>1350){
            setnOfItems(20)
        }
        else if(width>1050){
            setnOfItems(15)
        }
        else if(width>715){
            setnOfItems(10)
        }

    }

    useEffect(()=>{
        window.addEventListener('resize',(e)=>resizeWindow(e.currentTarget.innerWidth))
        return ()=> window.removeEventListener('resize',resizeWindow)
    },[])

    function HandleChangePage(index){
        setCurrentPage(index)
    }

    function prevPage(){
        setCurrentPage(prev=>prev==0?prev:prev-1)
    }
    function nextPage(){
        setCurrentPage(prev=>prev==Math.ceil(movieData?.length/nOfItems)-1?prev:prev+1)
    }
    if(movieData==undefined || movieData==null) return
    return ( 
        <div className="movies-list-c">
            <PagesNav activePage={currentPage} 
            dataLength={Math.ceil(movieData?.length/nOfItems)}
            HandleChangePage={(index)=>HandleChangePage(index)}
            prevPage={prevPage}
            nextPage={nextPage}
            />
            <div className='movies-list'>
                {movieData?.slice(currentPage*nOfItems,currentPage*nOfItems+nOfItems).map((movie)=>(
                    <div key={movie.id} className="movie-c">
                        <img src={movie.image} alt='Movie thumbnail' className="movie-img" />
                        <Link className='movie-title-c' to={`/${movie.id}/${movie.title}`} >
                            <div className="movie-title">{movie.title}</div>
                        </Link>
                        {/* <div className="rating">
                            <div className="rating-score">{movie.imDbRating}</div>
                            <div className="rating-count">({movie.imDbRatingCount})</div>
                        </div> */}
                    </div>
                ))}
            </div>
            <PagesNav activePage={currentPage} 
            dataLength={Math.ceil(movieData?.length/nOfItems)}
            HandleChangePage={(index)=>HandleChangePage(index)}
            prevPage={prevPage}
            nextPage={nextPage}
            />
        </div>
     );
}

export default MovieListing;