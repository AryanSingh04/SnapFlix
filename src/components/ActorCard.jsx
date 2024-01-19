import React, { useEffect } from 'react'
import ActorFallback from "../images/Fallback/actorFallback.jpeg"
import { useNavigate } from 'react-router'
const ActorCard = ({actor}) => {
  const navigate = useNavigate()
const handleClick=()=>{
  navigate(`/actor/${actor?.id}`)
}
  return (
    <div className="w-[150px] h-fit flex flex-col items-center justify-center">
        <img src={!actor.profile_path ?(ActorFallback)
          :
         ( `https://image.tmdb.org/t/p/original/${actor.profile_path}`)} className="rounded-full w-[90%] aspect-square object-cover cursor-pointer" onClick={handleClick}/>
        <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold text-center whitespace-nowrap  text-ellipsis overflow-hidden">{actor?.name}</h4>
            <p className=" w-3/5 text-gray-500 text-center whitespace-nowrap  text-ellipsis overflow-hidden">{actor?.character}</p>
        </div>
    </div>
  )
}

export default ActorCard