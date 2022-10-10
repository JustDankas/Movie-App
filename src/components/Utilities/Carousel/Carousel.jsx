import React, { Component, useEffect } from "react";
import "./carousel.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

function Carousel({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dataLength = data?.length;
  const [nOfItems, setnOfItems] = useState(
    Math.ceil(window.innerWidth / 320) <= 5
      ? Math.ceil(window.innerWidth / 320)
      : 5
  );
  const [canClick, setCanClick] = useState(true);
  const [screenX, setScreenX] = useState(0);

  function resizeWindow(width) {
    if (width > 1760) {
      setnOfItems(5);
    } else if (width > 1420) {
      setnOfItems(4);
    } else if (width > 1110) {
      setnOfItems(3);
    } else if (width > 790) {
      setnOfItems(2);
    } else {
      setnOfItems(1);
    }
    // If window size changes , we reset carousel
    setCurrentSlide(0);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) =>
      resizeWindow(e.currentTarget.innerWidth)
    );
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  // If window size changes , we reset carousel
  // useEffect(()=>{
  //     setCurrentSlide(0)
  // },[nOfItems])

  //  Makes user unable to rotate carousel every ms , instead he can rotate every 750ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanClick(true);
    }, 750);
    return () => clearTimeout(timeout);
  }, [canClick]);

  function HandleNextSlide() {
    if (dataLength < nOfItems) return;
    if (!canClick) return;
    const extras = dataLength % nOfItems;
    setCurrentSlide((prev) => {
      if (extras > 0) {
        if (prev + nOfItems + extras == dataLength) return prev + extras;
      }
      if (prev + nOfItems == dataLength) return prev;

      console.log(nOfItems);
      return prev + nOfItems;
    });
    setCanClick(false);
  }
  function HandlePreviousSlide() {
    if (dataLength < nOfItems) return;
    if (!canClick) return;
    const extras = dataLength % nOfItems;
    setCurrentSlide((prev) => {
      if (extras > 0) {
        if (prev + nOfItems == dataLength) return prev - extras;
      }
      if (prev === 0) return prev;
      return prev - nOfItems;
    });
    setCanClick(false);
  }

  function handleTouchStart(e) {
    setScreenX(e.changedTouches[0].screenX);
  }
  function handleTouchEnd(e) {
    // setCurrentSlide(Math.floor(currentSlide+0.5))
  }

  function handleTouchMove(e) {
    const diff = screenX - e.changedTouches[0].screenX;
    const threshhold = 30;
    // console.log('diff',diff)
    // console.log('screenX',screenX)
    console.log(diff);
    if (currentSlide + diff >= 0 && currentSlide + diff <= dataLength) {
      setCurrentSlide(currentSlide + 0.01);
      setScreenX(e.changedTouches[0].screenX);
    }
    // setCurrentSlide(0)
    // if((diff%threshhold)>0){
    //     setScreenX(e.changedTouches[0].screenX)
    //     setCurrentSlide((currentSlide+0.01*(diff%threshhold)))
    // }
    // else if((diff%threshhold)<0){
    //     setScreenX(e.changedTouches[0].screenX)
    //     setCurrentSlide((currentSlide+0.01*(diff%threshhold)))
    // }
  }
  console.log(currentSlide);
  if (data == null) return;
  return (
    <div className="carousel-c" onTouchMove={(e) => handleTouchMove(e)}>
      <button className="left-arrow" onClick={() => HandleNextSlide()}>
        {<AiOutlineArrowRight />}
      </button>
      <div className="carousel">
        <div
          className="inner"
          style={{
            transform: `translateX(-${currentSlide * (100 / nOfItems)}%)`,
          }}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          {data?.map((movie, index) => (
            <div key={index} className="carousel-item">
              <img src={movie.image} alt="movie cover" className="movie-img" />
              <div className="loading-icon-c">
                <AiOutlineLoading className="loading-icon" />
              </div>
              <Link
                className="title-popup-c"
                to={`/${movie.id.replace("showtimes", "")}/${movie.title}`}
              >
                <div className="title-popup">{movie.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button className="right-arrow" onClick={() => HandlePreviousSlide()}>
        {<AiOutlineArrowLeft />}
      </button>
    </div>
  );
}

export default Carousel;
