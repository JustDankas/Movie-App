import React, { Component } from 'react';
import {FaPlay} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import './playTrailerButton.css';

function PlayTrailerButton({playTrailer,HandlePlayTrailer}) {
    return ( 
        <button className={!playTrailer?"play-trailer-btn":"play-trailer-btn red"}
        onClick={()=>HandlePlayTrailer()}
        >
            <div className={!playTrailer?"half-circle-left":"half-circle-left red"}>
                {playTrailer?<AiOutlineClose className='play-icon bigger'/>:<FaPlay className='play-icon'/>}
            </div>
            <div className="play-text">{!playTrailer?"Watch Trailer":"Stop Trailer"}</div>
            <div className={!playTrailer?"half-circle-right":"half-circle-right red"}></div>
        </button>
     );
}

export default PlayTrailerButton;