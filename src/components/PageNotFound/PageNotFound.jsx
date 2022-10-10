import React, { Component } from 'react';
import './pageNotFound.css'
function PageNotFound() {

    console.log('HELLO')
    return ( 
        <div className="page-not-found-c">
            <h2 className="error-404">#404</h2>
            <h2 className="error-message">Not what you were looking for?</h2>
        </div>
     );
}

export default PageNotFound;