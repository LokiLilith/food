import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
   const [btnIsHighLighted,setbtnIsHighLighted] = useState(false);
   const {items} = cartCtx

  useEffect(()=>{
   if(cartCtx.items.length === 0){return} 
  setbtnIsHighLighted(true)
  const timer = setTimeout(()=>{
  setbtnIsHighLighted(false) 
  },300)
  return()=>{
    clearTimeout(timer)
  }
  },[items])
  

  const bntClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button className={bntClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
