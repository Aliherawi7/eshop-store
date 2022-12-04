const actions = {
    LOADING: "loading",
    FETCHED: "fetched",
    ERROR: "error"
}
let state = {
    data: undefined,
    error: undefined,
    status: ''
};
const dispatch = (action) => {
    switch (action.type) {
        case actions.ERROR:
            state = { ...state, error: action.error, status: actions.ERROR }
            break;
        case actions.LOADING:
            state = { ...state, status: actions.LOADING }
            break;
        case actions.FETCHED:
            state = { ...state, data: action.payload, status: actions.FETCHED }
            break;
    }
}
const CustomFetch =  (url, option) => {
    const getData =async () => {
        try {
            const request = await fetch(url, option);
            if (!request.ok) {
                throw new Error(request.statusText);
            }
            if (request.ok && request.status != 200) {
                throw new Error("302 error happen. Maybe you forgat something");
            }

            let data = await request.json();
            
            dispatch({
                type: actions.FETCHED,
                payload: data,
            })
            return state

        } catch (error) {
            dispatch({
                type: actions.ERROR,
                error: error,
            })
            return state
        }
    }
    getData();
    
}

export default CustomFetch;