import React,{Suspense} from 'react'
import DiscoverSkeleton from './DiscoverSkeleton'
import MovieCard from './MovieCard'
const ActorMovie = ({data,title}) => {
  if(data.length<1){
    return;
  }
  
  return (
    <div className=''>
      <div className="font-bold mt-5 text-lg md:text-2xl lg:text-3xl pl-5 md:pl-8 md:mt-8 flex w-2/5 items-center justify-between"><span>{title}</span>
 
 </div>
    <div className=" overflow-x-auto no-scroll justify-center">
    <div className='h-fit pl-10 pr-20 pt-14  w-fit flex items-center justify-center gap-14 md:gap-20 no-scroll'>{ data?.map((e)=>{ 
   
        return(<Suspense fallback={<DiscoverSkeleton/>}>
       <MovieCard key={e.id} id={e.id} e={e} genre={true} type={"movie"} />
        </Suspense>
       )})}</div>
       </div>
       </div>
  )
}

export default ActorMovie
