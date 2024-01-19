import React from 'react'

const DiscoverSkeleton = () => {
  return (
  
    <div className='w-screen h-fit flex items-center justify-center sm:justify-between md:justify-center flex-wrap gap-10 md:gap-14 pl-10 pr-20 pt-14 md:pt-20'>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    <div className="w-[200px] h-[350px]  rounded-md md:rounded-xl  overflow-hidden  animate-pulse bg-gray-300"></div>
    
  </div> 
   
  )
}

export default DiscoverSkeleton