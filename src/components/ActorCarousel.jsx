import React,{ Suspense } from 'react'
import DiscoverSkeleton from './DiscoverSkeleton'
import ActorCard from './ActorCard'
const ActorCarousel = ({title,loading,list}) => {
  return (
    <div className="bg-black h-fit w-screen lg:px-20 ">
      <div className="font-bold text-xl md:text-2xl lg:text-3xl pl-5 md:pl-8 md:mt-8 flex w-2/5 items-center justify-between"><span>{title}</span>
      </div>
    <div className=" overflow-x-auto no-scroll justify-center">
      { loading? <div className='w-fit h-fit flex gap-14 md:gap-20 pl-10 pr-20 pt-14 '>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
      </div>  : <div className='h-fit pl-10 pr-20 pt-10  w-fit flex items-center justify-center gap-14 md:gap-20 no-scroll'>{ list?.map((e)=>{ 
      return(<Suspense fallback={<DiscoverSkeleton/>}>
     <ActorCard actor={e} />
      </Suspense>
     )})}</div>}
      </div>
        </div>
  )
}

export default ActorCarousel