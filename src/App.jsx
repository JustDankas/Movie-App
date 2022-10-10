import './App.css';
import {Header,Footer,Home, TopMovies, MovieDetail, MovieSearch, MostPopularTvs, DetailsPage, PageNotFound} from './components';

import {Routes,Route,Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <div className="header">
            <Header  />
        </div>
        <div className="main">
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/top250movies' element={<TopMovies/>} />
                <Route path='/top250movies/*' element={<PageNotFound/>} />
                <Route path='/MostPopularTvs' element={<MostPopularTvs/>} />
                <Route path='/MostPopularTvs/*' element={<PageNotFound/>} />
                <Route path='/:movieId/:movieName' element={<DetailsPage/>} />
                <Route path='/search/:movieNameSearch' element={<MovieSearch/>} />
                <Route path='*' element={<div>Error 404 Page not found!</div>} />
            </Routes>
        </div>
        <div className="footer">
            <Footer  />
        </div>
    </div>
  );
}

export default App;
