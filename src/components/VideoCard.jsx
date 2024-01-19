import React from 'react'
import PlayIcon from './PlayIcon'

const VideoCard = ({data,setVideo,setShow}) => {
  const handleClick=()=>{
    console.log(data?.key)
    setVideo(data?.key) 
    setShow(true);
  }
  return (
  <div className="w-[300px] md:w-[280px]  aspect-video overflow-hidden group">
    <div className="h-4/5 md:h-3/5 relative w-full cursor-pointer" onClick={handleClick}>
    <img src={`https://img.youtube.com/vi/${data?.key}/mqdefault.jpg`} alt="" className="h-full w-full group-hover:opacity-40 " />
    <div className="h-full absolute w-full top-0  z-10 flex items-center justify-center text-4xl group-hover:text-red-500">
      <PlayIcon/>
    </div>
    </div>
    <div className="w-full h-1/5 md:h-2/5 line-clamp-1 text-lg md:line-clamp-2">{data?.name}</div>
  </div>
  )
}

export default VideoCard