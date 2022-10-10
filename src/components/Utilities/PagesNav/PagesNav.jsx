import React, { Component } from 'react';
import './pagesNav.css';
function PagesNav({activePage,dataLength,nextPage,prevPage,HandleChangePage}) {

    const pages = new Array(dataLength).fill(0);
    return ( 
    <div className="page-index-buttons">
        <button className="page-index-btn-prev" onClick={prevPage}>
            <div className="page-half-circle-left"></div>
            Prev
        </button>
        {pages.map((page,index)=>{
            if(pages.length<5){
                return (            
                    <button 
                    className={activePage==index?"page-index-btn page-active":"page-index-btn"}
                    onClick={()=>HandleChangePage(index)}>
                        {index+1}
                    </button>
                    )
            }
            else{
                if(activePage==index || index==activePage+1 || index==pages.length-1){
                    return (
                    <button 
                    className={activePage==index?"page-index-btn page-active":"page-index-btn"}
                    onClick={()=>HandleChangePage(index)}>
                        {index+1}
                    </button>)
                }
            }
        })}
        <button className="page-index-btn-next" onClick={nextPage}>
        <div className="page-half-circle-right"></div>
            Next
        </button>
    </div>
     );
}

export default PagesNav;