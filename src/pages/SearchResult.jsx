import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { fetchDataFromApi } from '../utils/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard';
import DiscoverSkeleton from '../components/DiscoverSkeleton';
const SearchResult = () => {
  const { query } = useParams();
  const [res, setRes] = useState(null);
  const [res2,setRes2] = useState(null)
  const [pageNum, setPageNum] = useState(1);
  
  const fetchSearch = async()=>{
    try {
      const re = await fetchDataFromApi(`search/movie?query=${query}&page=${pageNum}`);
      setRes(re);
      const de = await fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
      setRes2(de)
    } catch (err) {
      console.error('Error fetching initial data:', err);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  const fetchNextData = async () => {
    try {
      // Update pageNum using the functional form of setPageNum
       setPageNum((prevPageNum) => prevPageNum + 1);
  
      // Use the updated pageNum in the URL
      const re = await fetchDataFromApi(`search/movie?query=${query}&page=${pageNum}`);
     
      setRes((prevRes) => ({
        ...prevRes,
        results: [...prevRes.results, ...re.results],
      }));
      const de = await fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
      setRes2((prevRes) => ({
        ...prevRes,
        results: [...prevRes.results, ...re.results],
      }))
    } catch (err) {
      console.error('Error fetching next data:', err);
      // Handle the error (e.g., show an error message to the user)
    }
  };
  useEffect(() => {
    fetchSearch()
   }, [query]);
   useEffect(()=>{
    console.log(res)
   },[res])

  return (
   <div className='w-full h-fit md:pt-[8vh] no-scroll'>
    <h1 className=" text-md sm:text-2xl lg:text-4xl font-bold pl-5 md:pl-10 no-scroll">Search Result for:"{query}"</h1>
{   res2?.results.length ===0 ?  (<div className='w-screen mt-5 text-2xl md:text-4xl text-center md:text-left  md:pl-10 '>Oops Someting went wrong</div>):
    <InfiniteScroll 
    className="no-scroll"
    dataLength={res?.results.length || 0}
    next={fetchNextData}
    hasMore={res?.page !== res?.total_pages || res?.page !== res2?.total_pages}
    loader={<DiscoverSkeleton/>} >
    <div className="w-screen h-fit flex items-center justify-center sm:justify-between md:justify-center flex-wrap gap-10 md:gap-14 pl-10 pr-20 pt-14 md:pt-20 no-scroll">
      {res?.results && res.results.map((e) =>{ 
      return  <MovieCard id={e.id} e={e} key={e.id} type={"movie"} genre={true} />})}
    </div>
  </InfiniteScroll>}
   </div>
  )
}

export default SearchResult