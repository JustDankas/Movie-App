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
    // Total items smaller then carousel items
    if (dataLength < nOfItems) return;
    // Cant spam click
    if (!canClick) return;
    setCurrentSlide((prev) => {
      if (prev + nOfItems >= dataLength - nOfItems)
        return dataLength - nOfItems;
      return prev + nOfItems;
    });
    setCanClick(false);
  }
  function HandlePreviousSlide() {
    // Total items smaller then carousel items
    if (dataLength < nOfItems) return;
    // Cant spam click
    if (!canClick) return;

    const extras = dataLength % nOfItems;
    setCurrentSlide((prev) => {
      if (prev > dataLength - nOfItems) return dataLength - nOfItems - extras;
      if (prev === 0) return prev;
      return prev - nOfItems;
    });

    setCanClick(false);
  }
  console.log(currentSlide, dataLength);
  if (data == null) return;
  return (
    <div className="carousel-c">
      <button className="left-arrow" onClick={() => HandleNextSlide()}>
        {<AiOutlineArrowRight />}
      </button>
      <div className="carousel">
        <div
          className="inner"
          style={{
            transform: `translateX(-${currentSlide * (100 / nOfItems)}%)`,
          }}
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
