
export const initialState = {
    basket: [],
    userInfo: {
        access_token:localStorage.getItem("access_token"),
        name: localStorage.getItem("name"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        imgUrl: localStorage.getItem("imgUrl"),
        roles: localStorage.getItem("roles")?.split(',')
    },
    loading:false
}
export const actions = {
    ADD_TO_BASKET: "ADD_TO_BASKET",
    REMOVE_FROM_BASKET:'REMOVE_FROM_BASKET',
    CHANGE_QUANTITY:"CHANGE_QUANTITY",
    ADD_USER_INFORMATION: "ADD_USER_INFORMATION",
    REMOVE_USER_INFORMATION: 'REMOVE_USER_INFORMATION',
    LOADING:"LOADING"
}


export const getBasketTotal = (basket) =>
    basket?.reduce((total, item) => Number.parseFloat(item.price * item.quantity)+total, 0);

export const getBasketTotalItems = (basket) =>
    basket?.reduce((totalItem, item) => Number.parseInt(item.quantity)+totalItem, 0);


const reducer = (state, action) => {
    switch(action.type){
        case actions.ADD_TO_BASKET:{
            let index = state.basket.findIndex(item =>{
                return item.id == action.item.id
            });

            //if the item is already exist in the basket then increase item quantity
            if(index>=0){
                state.basket[index].quantity +=1;
                return {...state, basket:state.basket};
            }
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        }
        case actions.CHANGE_QUANTITY:{
            
            //if the item is already exist in the basket then change item quantity
            if(action.item.index>=0){
                state.basket[action.item.index].quantity = action.item.quantity;
            }
            return {
                ...state,
                basket:state.basket
            }
        }  
        case actions.REMOVE_FROM_BASKET:{
            if(action.item.index >=0){
                const newBasket = [...state.basket];
                newBasket.splice(action.item.index, 1)
                return {
                    ...state,
                    basket:newBasket
                }
                  
            }
            return state
        }
        case actions.ADD_USER_INFORMATION:{
            return{
                ...state,
                userInfo: action.item
            }
        }
        case actions.REMOVE_USER_INFORMATION:{
            return {
                ...state,
                userInfo: {}
            }
        }
        case actions.LOADING:{
            return {
                ...state,
                loading: action.item
            }
        }

        default:
            return state
    }
        
}



export default reducer