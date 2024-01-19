import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import DiscoverSkeleton from '../components/DiscoverSkeleton';
import dayjs from 'dayjs';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Explore from '../components/Explore';
import Genre from '../components/Genre';
import ActorCarousel from '../components/ActorCarousel';
import VideosWrap from '../components/VideosWrap';
import PlayIcon from '../components/PlayIcon';
import VideoWrapper from '../components/VideoWrapper';
import MovieDetailSkeleton from '../components/MovieDetailSkeleton';
import MovieFallback from "../images/Fallback/movieFallback.jpg"
const Detail = () => {
  const { type, id } = useParams();
  const [show,setShow] = useState(false)
  const [video,setVideo] = useState(null)
  const [firstVideo,setFirstVideo] = useState(null)
  const { data, loading } = useFetch(`/${type}/${id}`);
  const {data:actorData,loading:actorLoading} = useFetch(`${type}/${id}/credits`)
  const handleTrailer=()=>{
    setVideo(firstVideo)
    setShow(true)
  }
  const Writer = actorData?.crew.filter((e)=>{
    if(e.known_for_department === "Writing"){
  return e.original_name
}
})
const Director = actorData?.crew.filter((e)=>{
  if(e.known_for_department === "Directing"){
    return e.name
  }
})

 function getHours(e){
  const h = (e/60).toFixed(0);
  const m = e%60;
  return `${h} Hours ${m} Minutes`;
 }
  return (
   <>

    <div className={`w-screen h-fit bg-slate-50 min-h-screen md:h-screen`}>
      {loading ? (
        <MovieDetailSkeleton/>
      ) : (
       
        <div className="h-fit relative bg-white flex min-h-screen md:overflow-hidden">
           <VideoWrapper show={show} setShow={setShow} video={video}/>
          <img
            src={!(data?.backdrop_path || data?.poster_path) ? (MovieFallback): (`https://image.tmdb.org/t/p/original/${data?.backdrop_path || data?.poster_path}`)}
            className="lg:w-screen object-cover min-h-screen absolute z-0 top-0 bottom-0 "
            alt="Movie Backdrop"
          />
          <div className=" relative z-10 w-full min-h-screen h-fit flex bg-gradient-to-t from-black from-25% to-[rgba(0,0,0,0.5)]  flex-col md:flex-row justify-start md:justify-center items-center pt-5">
            <img
              src={!data?.poster_path ? (MovieFallback): (`https://image.tmdb.org/t/p/original/${data?.poster_path}`)}
              alt="Movie Poster"
              className="w-[200px] md:w-[150px] lg:w-[250px] rounded-3xl mb-5"
            />
            <div className="w-full md:w-2/5 lg:w-3/5 h-fit  px-4">
              <div className="md:flex gap-2 justify-start">
              <h1 className=' text-white font-bold text-2xl lg:text-3xl lg:font-extrabold '>{data?.title} </h1>
              <h6 className="text-2xl lg:text-3xl">( {dayjs(data?.release_date || data?.first_air_date).format('YYYY')} )</h6>
              </div>
              <div className="mb-2 md:mb-5 flex items-center justify-start font-light">{data?.tagline}</div>
              <div className=' flex items-center  gap-5 justify-start'>
                {data?.genres.map((e)=>{
                   return <Genre gid={e.id}/>
                })}
           
              </div>
              <div className="flex items-center justify-start gap-16 w-full">
              <div className="w-[10%] lg:w-[8%] h-1/5 text-sm">
                <CircularProgressbar value={Math.floor(data?.vote_average)} maxValue={10} text={(data?.vote_average)?.toFixed(1)} className=' font-bold fill-green-400  text-md'  styles={buildStyles({
          textSize: '40px',
          pathTransitionDuration: 0.5,
          pathColor: "Green",
          textColor:  "Green",
          trailColor: 'white',
        })} />
        </div>
   { firstVideo &&  <div className="text-3xl flex whitespace-nowrap hover:text-red-500 transition-all items-center gap-2" onClick={handleTrailer}>
        <PlayIcon/>
        <p className="text-lg">Play Trailer</p>
        </div>}
              </div>
              <div className="w-full flex flex-col  items-start">
                <h2 className="text-4xl font-bold mb-4  ">Overview</h2>
                <h6 className="w-4/5 text-left">{data?.overview}</h6>
                
              </div>
              <div>
                <div className="w-screen text-sm lg:text-lg h-fit md:w-4/5">
                  <div className="flex w-full px-5   justify-between items-center">
                  <h2 >Status: <span>{data?.status || "Unknown"}</span></h2>
                  <h2>Release Date: <span>{dayjs(data?.release_date).format("DD-MM-YYYY") || "Unknown"}</span></h2>
                  <h2>Runtime: <span>{getHours(data?.runtime) || "Unknown"}</span></h2>
                  </div>
                <hr className="my-2"/>
                <h2 className='text-sm lg:text-lg px-5'>Director: <span>{Director?.[0]?.name || "Unknown"}</span></h2>
                <hr className='my-2'/>
                <h2 className='text-sm lg:text-lg px-5'>Writer: <span>{Writer?.[0]?.name || "Unknown"}</span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  {actorData?.cast[0] && <div className="w-screen h-fit md:mt-0">
         {actorData?.cast && <ActorCarousel title={"Top Cast"} list={actorData?.cast}/>}
       </div>}
       <div>
       <VideosWrap url={`${type}/${id}/videos`} title={"Videos"} setVideo={setVideo} setFirstVideo={setFirstVideo} setShow={setShow} />
       </div>
       <Explore url={`${type}/${id}/similar?page=1`} title={"Similar"} options={[]} type={type} option={false}/>
       <Explore url={`${type}/${id}/recommendations?page=1`} title={"Recommendatation"} options={[]} type={type} option={false}/>
   
   </>
  );
};

export default Detail;
