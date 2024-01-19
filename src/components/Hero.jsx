import React, { useState,useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useDispatch,useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import { getApiConfiguration } from '../store/HomeSlice';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import dayjs from "dayjs"
const Hero = () => {
  const dispatch = useDispatch()
 const [hero,setHero] = useState({})
  const {data,loading} = useFetch("movie/upcoming")
  // const  data = {}
  // const loading = {}
  const {genres} = useSelector((state)=>state.home)
  useEffect(()=>{
  setHero(data?.results[Math.floor(Math.random()*20)])
  },[data])
  return (
    <div className='w-full md:h-screen relative '>
    <img src={`https://image.tmdb.org/t/p/original/${hero?.backdrop_path || hero?.poster_path}`} className="w-screen h-full "/>
    <div className="w-full h-full absolute top-0 shadow-[inset_-100px_-100px_50px_rgba(0,0,0,0.8)] md:shadow-[inset_-500px_-500px_300px_rgba(0,0,0,0.8)] flex flex-col justify-center pl-5 md:p-[10%]">
      <div className=" gap-5 flex items-center">
      <h2 className="font-extrabold text-xl whitespace-nowrap text-ellipsis max-w-[40%] overflow-hidden md:text-5xl ">{hero?.original_title}   </h2>
    
        <div  className="w-8 md:w-14 lg:w-20 text-xl">
  <CircularProgressbar value={Math.floor(hero?.vote_average)} maxValue={10} text={(hero?.vote_average)?.toFixed(1)} className=' font-bold fill-green-400  text-2xl'  styles={buildStyles({
    textSize: '40px',
    pathTransitionDuration: 0.5,
    pathColor: hero?.vote_average > 5 ? hero?.vote_average >7 ? "green":"yellow" : "red",
    textColor: hero?.vote_average > 5 ? hero?.vote_average >7 ? "green":"yellow" : "red",
    trailColor: 'white',
  })} />
</div>
      </div>
      <h4>{dayjs(hero?.release_date || hero?.first_air_date).format('MMM-DD-YYYY')}</h4>
        <p className="sm:my-4 text-sm md:text-xl text-gray-400 font-semibold">{hero?.genre_ids?.splice(0,3).map((e,i)=>{
          if( i!== 2){
            return <span>{genres[e]?.name} |</span> 
          }
          else{
            return <span>{genres[e]?.name}</span> 
          }
          
        })}</p>
        <p className="w-1/2  md:w-3/5  lg:w-2/5 md:h-fit h-fit overflow-hidden text-ellipsis  text-sm md:text-lg  font-lightbold line-clamp-3">{hero?.overview}</p>

        <Link className="bg-red-600 w-fit px-5 py-2 font-bold sm:mt-5 text-[12px] md:text-lg hover:bg-red-800" to={`/movie/detail/${hero?.id}`}>See Details.</Link>
    </div>
    </div>
  )
}

export default Hero