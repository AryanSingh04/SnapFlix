import React ,{lazy,Suspense}from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, NavLink } from 'react-router-dom'
import dayjs from 'dayjs';
import MovieFallback from "../images/Fallback/movieFallback.jpg"
const Genre = lazy(()=>import('./Genre'))
const MovieCard = ({e,id,key,genre,type}) => {
  const {loading} = Genre
  return (
         <NavLink className="w-[150px] md:w-[200px] h-[300px] md:h-[350px]  rounded-md md:rounded-2xl md:rounded-r-2xl group hover:scale-110  overflow-hidden relative hover:shadow-[inset_-300px_-100px_50px_rgba(0,0,0,0.8)] no-scroll" to={`/${e?.media_type || type}/detail/${id}`} >
          <img src={!e.poster_path? MovieFallback: `https://image.tmdb.org/t/p/original/${e?.poster_path}`} className="h-[90%] w-full" loading='lazy'/>
          <div className=" bg-gradient-to-t from-[rgba(0,0,0,0.8)] from-75% to-transparent   w-full h-fit absolute  bottom-0 flex flex-col">
           {genre && <div className=" w-full h-10 text-right mb-5 relative group-hover:block hidden">
            { loading? "Loading": 
              <div className="absolute right-4 hidden md:block">
                {((e?.genre_ids)?.slice(0,2)).map((e)=>{
                return <Genre gid={e}/>
            })}
             </div>}    
            </div>}
            <div className="w-full h-fit  px-3">
            <div className="w-1/5 aspect-square  block">
            <CircularProgressbar value={Math.floor(e?.vote_average)} maxValue={10} text={(e.vote_average).toFixed(1)} className=' font-bold fill-green-400  text-md'  styles={buildStyles({
          textSize: '30px',
          pathTransitionDuration: 0.5,
          pathColor: e?.vote_average > 5 ? e?.vote_average >7 ? "green":"yellow" : "red",
          textColor: e?.vote_average > 5 ? e?.vote_average >7 ? "green":"yellow" : "red",
          trailColor: 'white',
        })} />
            </div>
            <h4 className="font-semibold text-sm md:text-md xl:text-xl whitespace-nowrap w-3/5 overflow-hidden text-ellipsis">{e.original_title || e.name}</h4>
            <div className="h-3/5 w-full overflow-hidden my-4 text-ellipsis inline-block ">
              {dayjs(e.release_date || e.first_air_date).format('MMM-DD-YYYY')}
            </div>
            </div>
          </div>
         </NavLink>
  )

}

export default MovieCard