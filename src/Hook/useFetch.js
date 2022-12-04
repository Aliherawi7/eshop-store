import React, { useReducer, useRef, useEffect } from 'react';

const actions = {
    LOADING: "loading",
    FETCHED: "fetched",
    ERROR: "error"
}

let Cache = {}

function useFetch(url, options) {
    const cache = useRef({});
    const initialState = {
        data: undefined,
        error: undefined,
        status: ""
    }
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    // the logic for updating the state
    const fetchReducer = (state, action) => {
        switch (action) {
            case actions.LOADING:
                return { ...initialState, state: actions.LOADING }
            case actions.FETCHED:
                return { ...initialState, data: action.payload, state: actions.FETCHED }
            case actions.ERROR:
                return { ...initialState, error: action.payload, state: actions.ERROR }
            default:
                return state;
        }
    }

    useEffect(() => {
        // if url is null or undefined then do nothing
        if (!url) return;

        const getData = async () => {
            dispatch({ type: actions.LOADING });

            // if a cache is exist for this url

            // ---------------

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                if (response.ok && response.status != 200) {
                    throw new Error("302 error happen. Maybe you forgat something");
                }

                const data = await response.json();

                cache.current[url] = data
                dispatch({ type: actions.FETCHED, payload: data })

            } catch (error) {
                dispatch({
                    type: actions.ERROR,
                    payload: error
                })
            }

        }

        getData();

    }, [url])

    return state;

}

export default useFetch;