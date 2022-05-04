import React, { useReducer, useContext } from 'react'

export const StateContext = React.createContext();

//wrap out app and provide the data layer
export const StateProvider = ({reducer, initialState, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)

 