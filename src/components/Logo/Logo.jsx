import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img1 from './images/movie_logo_part1.png'
import img2 from './images/movie_logo_part2.png'
import './logo.css';
function Logo() {
    return ( 
        <Link style={{"textDecoration":"none"}} to="/">
            <div className="logo">
                MoviMovi
            </div>
        </Link>
     );
}

export default Logo;