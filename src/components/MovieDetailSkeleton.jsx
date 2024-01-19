import React from 'react'

const MovieDetailSkeleton = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col md:flex-row md:gap-28 gap-10">
    <div className="w-[250px] h-[300px] bg-gray-200 animate-pulse"></div>
    <div className="w-4/5 aspect-square md:w-1/5 bg-gray-200 animate-pulse"></div>
    </div>
  )
}

export default MovieDetailSkeleton