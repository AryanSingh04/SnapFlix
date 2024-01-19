import React, { useEffect,Suspense } from 'react'
import useFetch from '../hooks/useFetch'
import VideoCard from './VideoCard'
import DiscoverSkeleton from './DiscoverSkeleton'
const VideosWrap = ({url,title,setVideo,setShow,setFirstVideo}) => {
    const {data,loading} = useFetch(url)
if(data?.results.length<1){
  return;
}
  setFirstVideo(data?.results?.[0].key)
  return (
    <div className="bg-black h-fit w-screen md:px-20">
    <div className="flex items-center justify-between">
      <div className="font-bold mt-5 text-lg md:text-2xl lg:text-3xl pl-5 md:pl-8 md:mt-8 flex w-2/5 items-center justify-between"><span>{title}</span>
      </div>
    </div>
    <div className=" overflow-x-auto no-scroll justify-center">
      { loading? <div className='w-fit h-fit flex gap-14 md:gap-20 pl-10 pr-20 pt-14 '>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
        <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
      </div>  : <div className='h-fit pl-10 pr-20 pt-14  w-fit flex items-center justify-center gap-14 md:gap-20 no-scroll'>{data?.results.map((e)=>{ 
      return(<Suspense fallback={<DiscoverSkeleton/>}>
     <VideoCard data={e} setVideo={setVideo} setShow={setShow}/>
      </Suspense>
     )})}</div>}
      </div>
        </div>
  )
}
{/* <div className="h-fit pl-10 pr-20 pt-14  w-fit flex items-center justify-center gap-14 md:gap-20 no-scroll">
{data?.results.map((e)=>{
    return <VideoCard data={e} />
})}
</div> */}
export default VideosWrap