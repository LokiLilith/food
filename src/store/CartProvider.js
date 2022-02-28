import CartContext from './cart-context'
import React,{ useReducer } from 'react';

const defaultCartState = {
    items: [],
    totalAmount:0,
};
    

const cartReducer = (state,action) => {
if(action.type === 'ADD'){
    //const updatedItems = state.items.concat(action.item);
    const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex((item)=>item.id===action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    //let updateItem;
    let updateItems;
    if(existingCartItem){
      const  updateItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem
    } else {
        //updateItem = {...action.item}
        updateItems = state.items.concat(action.item)
    }

  
    return{
        items : updateItems,
        totalAmount: updateTotalAmount
    }
}

  if(action.type === 'REMOVE'){
      const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.id);
      const existingCartItem = state.items[existingCartItemIndex]
      const updateTotalAmount = state.totalAmount - existingCartItem.price;
      let updateItems;
      if(existingCartItem.amount === 1){
          updateItems = state.items.filter((item)=> item.id !== action.id)
      }else {
          const updateItem = {...existingCartItem, amount: existingCartItem.amount -1 }
          updateItems = [...state.items];
          updateItems[existingCartItemIndex] = updateItem;
      };
      return{
        items: updateItems, 
        totalAmount: updateTotalAmount
      }
  
    
  }
  if(action.type === 'ORDENED'){
    return{
      items:[],
      totalAmount:0
    }

  }
 

return defaultCartState
     
}



const CartProvider = (props) => {
  const [cartState,dispatchCartAction] =  useReducer(cartReducer,defaultCartState)

    const addItemToCartHandler = (item) =>{
        dispatchCartAction({type: 'ADD', item:item })
    };
    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type: 'REMOVE', id:id })
    };
    const onOrder = () =>{
      dispatchCartAction({type:'ORDENED'})
    }
   const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    onOrder : onOrder,
  };

    return(
     <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider