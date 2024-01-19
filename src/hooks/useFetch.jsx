import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/Api'
const useFetch = (url,param) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
   useEffect(()=>{
    setLoading("loading...")
    setData(null)
    setError(null)
    fetchDataFromApi(url,param).then((res)=>{
        setLoading(false)
        setData(res)
    }).catch((err)=>{
       setLoading(false)
        setError(`An error occurred: ${err}`)
    })
   },[url])
   return {data,loading,error};
}

export default useFetch