import React, { Component } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { BiSearchAlt } from "react-icons/bi";
import Logo from "../Logo/Logo";
import { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
function Header() {
  const [movieInput, setMovieInput] = useState("");
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [hidden, setHidden] = useState(true);
  function HandleSearchMovie(input) {
    if (input == "Enter") {
      navigate("/search/" + movieInput);
    }
  }

  function handleResize() {
    // if (window.innerWidth <= 1000) {
    //   setBurgerNav(true);
    // } else setBurgerNav(false);
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", (e) =>
      handleResize(e.currentTarget.innerWidth)
    );
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <nav className="page-nav">
        <Logo />
        {windowSize <= 1000 && (
          <button className="burger-nav-btn" onClick={() => setHidden(!hidden)}>
            {hidden ? <GiHamburgerMenu /> : <GrClose />}
            <div className={hidden ? "hidden-nav" : "navs"}>
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/top250movies">
                Top 250 Movies
              </Link>
              <Link className="nav-link" to="/MostPopularTvs">
                Most popular TVs
              </Link>
            </div>
          </button>
        )}
        {windowSize > 1000 && (
          <div className="navs">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <div className="border"></div>
            <Link className="nav-link" to="/top250movies">
              Top 250 Movies
            </Link>
            <div className="border"></div>
            <Link className="nav-link" to="/MostPopularTvs">
              Most popular TVs
            </Link>
          </div>
        )}

        <div className="search-c">
          <button
            className="search-btn"
            onClick={() => setSearching(!searching)}
          >
            <BiSearchAlt />
          </button>
          {windowSize > 1000 && (
            <div className="search-slider-c">
              <input
                type="text"
                className={
                  searching ? "search-input searching" : "search-input"
                }
                placeholder="Search Title"
                value={movieInput}
                onChange={(e) => setMovieInput(e.target.value)}
                onKeyDown={(e) => HandleSearchMovie(e.key)}
              />
            </div>
          )}
        </div>
      </nav>
      {windowSize <= 1000 && (
        <div className="search-bar">
          <input
            type="text"
            className={searching ? "search-input searching" : "search-input"}
            placeholder="Search Title"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
            onKeyDown={(e) => HandleSearchMovie(e.key)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
