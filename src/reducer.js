export const initialState = {
    basket: []
}


export const getBasketTotal = (basket) =>
    basket?.reduce((total, item) => Number.parseFloat(item.price)+total, 0)


const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            const itemIndex = state.basket.findIndex((item)=> item.id === action.id)
            const newBasket = [...state.basket]
            if(itemIndex >=0){
                newBasket.splice(itemIndex,1)
            }else{
                console.warn('no found the item')
            }
            return {
                ...state,
                basket:newBasket
            }
        default:
            return state
    }
        
}



export default reducer