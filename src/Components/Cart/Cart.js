import { useContext,useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Cartitem from "./Cartitem";
import Checkout from "../Layout/Chekout";



const Cart = (props) => {
  const [form,setForm] = useState(false)
  const cartCtx = useContext(CartContext)
  const [loading,setLoading] = useState(false);
  const [isLoaded,setIsLoaded] = useState(false);

  const totalAmount = `Є${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  };
  
 console.log(cartCtx.items)

  const onOrderClick = () =>{
    setForm(true)
  }

  const addOrder = (async(data)=>{
    setLoading(true)
    const orders = cartCtx.items;
    
    const response = await fetch("https://order-food-app-97d8f-default-rtdb.firebaseio.com/orders.json",
    {
      method: 'POST',
      body: JSON.stringify({data:data,orders:orders},), 
      headers:{
        'Content-type' : 'application/json'
      }
    }
    )
    setLoading(false)
    setIsLoaded(true)
  })
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <Cartitem
         key={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price}
         onRemove={cartItemRemoveHandler.bind(null,item.id)}
         onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  let content;
  if(!loading && !isLoaded ){
    content = "Total Amount"
  }
  if(loading && !isLoaded){
    content = "spendimento dei dati"
  }
  if(!loading && isLoaded){
    content = "i dati sono stati spediti su firebase"
  }

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>{content}</span>
        <span>{!loading && !isLoaded && totalAmount}</span>
      </div>
      {form && hasItems && <Checkout cart={addOrder} onOrder={cartCtx.onOrder} setForm={setForm}/>}
      {!form && <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button onClick={onOrderClick} className={classes.button}>Order</button>}
      </div>}
      
    </Modal>
  );
};

export default Cart;
