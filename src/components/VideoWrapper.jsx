import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
const VideoWrapper = ({show,setShow,video}) => {

   useEffect(()=>{
    console.log(video)
   },[video])
  return (
    <div className={`${show ? "":"hidden"} fixed top-0 w-screen z-50 h-screen bg-[rgba(0,0,0,0.5)] flex backdrop-blur-md items-center justify-center`}>
    <div className="w-4/5 aspect-video flex  items-center justify-center flex-col">
     <p className="w-full md:w-4/5 text-right font-bold text-xl md:text-2xl cursor-pointer hover:text-red-500" onClick={()=>setShow(false)}>close</p>
     <div className="w-full md:w-4/5 aspect-video">
     <ReactPlayer url={`https://www.youtube.com/watch?v=${video}`} playing={show}  controls={true} width="100%" height="100%"/>
     </div>
    
    </div>
    </div> 
  )
}

export default VideoWrapper