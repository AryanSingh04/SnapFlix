import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes , useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';
import { getApiConfiguration,getGenres } from './store/HomeSlice';
import { useDispatch ,useSelector} from 'react-redux';
import useFetch from './hooks/useFetch';
import { fetchDataFromApi } from './utils/Api';
import { useEffect,useLayoutEffect } from 'react';
import Discover from './pages/Discover';
import Footer from './components/Footer';
import SearchResult from './pages/SearchResult';
import ScrollToTop from './components/ScrollToTop';
import ActorDetail from './pages/ActorDetail';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    genresCall()
  },[])
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };
  // genre/movie/list
  return (
  
    <div className="bg-black w-[100vw] min-h-screen h-fit text-white">
        <BrowserRouter>
        <ScrollToTop/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/discover/:type" element={<Discover/>}/>
      <Route path="/:type/detail/:id" element={<Detail/>}/>
      <Route path='search/:query' element={<SearchResult/>}/>
      <Route path='actor/:id' element={<ActorDetail/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
          </div>
        
  );
}

export default App;
