import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Genre = ({gid}) => {
    const [Name,setName] = useState(null)
    const genres = useSelector((state)=>state.home.genres)  
    const [loading,setLoading] = useState(true) 
    useEffect(()=>{
        if(genres[gid]){
        setName(genres[gid].name) 
      setLoading(false)
      }
    },[])
  if (loading){
    return;
  }
   return (
    <div className="bg-red-600 w-fit h-fit my-1 px-2 py-1 rounded-md font-bold text-sm lg:text-md">{Name}</div>
  )
}

export default Genre