import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import useFetch from '../hooks/useFetch'
import ActorFallback from "../images/Fallback/actorFallback.jpeg"
import dayjs from 'dayjs'
import Explore from '../components/Explore'
import ActorMovie from '../components/ActorMovie'
import MovieDetailSkeleton from '../components/MovieDetailSkeleton'
const ActorDetail = () => {
  const {id} = useParams()
  const {data,loading} = useFetch(`person/${id}`)
  const {data:MovieData,loading:MovieLoading} = useFetch(`person/${id}/movie_credits`)
  useEffect(()=>{
  console.log(data)
  },[data])
  useEffect(()=>{
    console.log(MovieData)
  },[MovieData])

 

  return (
    <div className="w-screen h-fit md:pt-[10vh]">
       { loading ? (<MovieDetailSkeleton/>):(
        <div className=''>
          <div className='w-full h-[400px] flex flex-col md:flex-row  justify-center md:pt-[5vh]'>
            <div className="w-full md:w-fit flex items-center justify-center md:justify-start md:items-start">
            <img
            src={!(data?.profile_path) ? (ActorFallback): (`https://image.tmdb.org/t/p/original/${data?.profile_path}`)}
            className="h-[200px] w-[200px] aspect-square object-cover rounded-full "/>
            </div>
            <div className="w-screen md:w-1/2 h-screen flex flex-col px-5 md:px-14 text-lg md:text-2xl gap-4">
              <div className="flex w-full justify-between">
              <h2>Name: <span>{data?.name}</span></h2>
              <h2>Famous for: <span>{data?.known_for_department}</span></h2>
              </div>
            <h2>Place of Birth: <span>{data?.place_of_birth}</span></h2>
            <div className="flex w-full justify-between items-center">
             <h2>
             Birth Date: <span>{dayjs(data?.birthday).format("DD-MM-YYYY")}</span>
             </h2>
             {
              data?.deathday && <h2>Death Day: <span>{dayjs(data?.deathday).format("DD-MM-YYYY")}</span></h2>
             }
            </div>

            </div>
          </div>
          <div className="w-full h-fit  flex flex-col md:flex-row  justify-center gap-10 md:gap-0">
          <div className=' w-full md:w-1/3 h-fit  md:text-left pl-5 md:pl-8'>
           <h2 className='font-bold text-xl md:text-2xl lg:text-3xl   flex w-2/5 items-center justify-between whitespace-nowrap'>Also Known as:</h2> 
           {data?.also_known_as.map((e,i)=>{
        return <p className=" font-semibold text-xl w-full items-center justify-between whitespace-nowrap">{i+1} {e}</p>
           })}
          </div>
          <div className=' w-full md:w-2/3  text-xl pr-10'>
            <h2 className='font-bold text-xl md:text-2xl lg:text-3xl pl-5 md:pl-8 md:mt-8 flex w-2/5 items-center justify-between'>Biography</h2>
           <p className="px-5 max-h-[50vh]  overflow-x-auto">{data?.biography}</p>
           </div>
          </div>
       
          
          <div className='w-full '>
          <ActorMovie data={MovieData?.cast.slice(0,10)} title={"Known For"}/>
            </div> 
            <div className='w-full'>
          <ActorMovie data={MovieData?.crew.slice(0,10)} title={"Related"}/>
            </div> 
        </div>
       )}
    </div>
  )
}

export default ActorDetail