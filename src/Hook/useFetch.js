import { useState, useEffect } from 'react';

const actions = {
    LOADING: "loading",
    FETCHED: "fetched",
    ERROR: "error"
}
function useFetch(url, options){
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {
      (async function(){
          try{
              setLoading(true);
              const response = await fetch(url,options);
              if(!response.ok){
                  throw new Error(response.statusText);
              }
              if(response.ok && response.status >= 300){
                throw new Error("something went wrong, you may forgot something")
              }

              const responseData = await response.json();
              setData(responseData)
          }catch(error){
              setError(error)
          }finally{
              setLoading(false)
          }
      })()
    
    }, [url])

    return {data, error, loading}
}


export default useFetch;