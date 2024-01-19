import React, { lazy, useEffect, useState,Suspense } from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import DiscoverSkeleton from './DiscoverSkeleton'
const MovieCard = lazy(()=>import('./MovieCard'))
const Explore = ({url,title,options,type,option}) => {

  const [movies,setMovies] = useState([])
  const [filter,setFilter] = useState(options?.[0])
  const {data,loading} = useFetch(`${url}/${filter}`)
  console.log(loading && title)
  useEffect(()=>{
    setMovies(data?.results)
  },[data])
  if(movies?.length <1){
    return ;
  }
  return (
    <div className="bg-black h-fit w-screen">
<div className="flex items-center justify-between">
  <div className="font-bold mt-5 text-lg md:text-2xl lg:text-3xl pl-5 md:pl-8 md:mt-8 flex w-2/5 items-center justify-between"><span>{title}</span>
 
  </div>
  <div className="pr-5 mt-5 md:pr-8 md:mt-8 underline underline-offset-4 text-gray-300">
 {option && <select name={title} onChange={(e)=>setFilter(e.target.value) }className="text-black font-semibold text-capitalize">
    {options.map((e)=>{
     return  <option value={e} className="text-capitalize">{e}</option>
    })}
  </select>}
  </div>
 
  {/* <Link className="pr-5 mt-5 md:pr-8 md:mt-8 underline underline-offset-4 text-gray-300" >See More</Link> */}
</div>
<div className=" overflow-x-auto no-scroll justify-center">
  { loading? <div className='w-fit h-fit flex gap-14 md:gap-20 pl-10 pr-20 pt-14 '>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
  </div>  : <div className='h-fit pl-10 pr-20 pt-14  w-fit flex items-center justify-center gap-14 md:gap-20 no-scroll'>{ movies?.map((e)=>{ 
   
  return(<Suspense fallback={<DiscoverSkeleton/>}>
 <MovieCard key={e.id} id={e.id} e={e} genre={true} type={filter || type} />
  </Suspense>
 )})}</div>}
  </div>
    </div>
  )
}

export default Explore