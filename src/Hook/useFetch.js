import { useState, useEffect } from 'react';

function useFetch(url, options) {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                if (response.ok && response.status >= 300) {
                    throw new Error("something went wrong, you may forgot something")
                }
                if (response.ok && response.status == 204) {
                    setData([])
                    return;
                }

                const responseData = await response.json();
                if (!responseData.records) {
                    setData([...data, ...responseData])
                }
                if (data.length + responseData.records.length < responseData.recordCount) {
                    setHasMore(true);
                } else {
                    setHasMore(false)
                }
                if (responseData.records) {
                    setData([...data, ...responseData.records])
                }

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        })()

    }, [url])

    return { data, error, loading, setData, hasMore }
}


export default useFetch;