import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MovieCard from '../components/MovieCard';
import { fetchDataFromApi } from '../utils/Api';
import InfiniteScroll from 'react-infinite-scroll-component';
import DiscoverSkeleton from '../components/DiscoverSkeleton';
const Discover = () => {
  const { type } = useParams();
  const [res, setRes] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const initialData = async () => {
    try {
      const re = await fetchDataFromApi(`discover/${type}?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`);
      setRes(re);
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
      const re = await fetchDataFromApi(`discover/${type}?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`);
  
      // Update state based on the latest pageNum
      setRes((prevRes) => ({
        ...prevRes,
        results: [...prevRes.results, ...re.results],
      }));
  
      console.log(res);
    } catch (err) {
      console.error('Error fetching next data:', err);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
   
   initialData();
    
  
  }, [type]); // Fetch data on component mount

  useEffect(() => {
    console.log(res);
  }, [res]);

  return (
    <InfiniteScroll
    className="no-scroll" 
    dataLength={res?.results.length || 0}
    next={fetchNextData}
    hasMore={res?.page !== res?.total_pages}
    loader={<DiscoverSkeleton/>} >
    <div className="w-screen h-fit flex items-center justify-center sm:justify-between md:justify-center flex-wrap gap-10 md:gap-14 pl-10 pr-20 pt-14 md:pt-20 no-scroll">
      {res?.results && res.results.map((e) => <MovieCard id={e.id} e={e} key={e.id} type={type} genre={true} />)}
    </div>
  </InfiniteScroll>
  );
};

export default Discover;
