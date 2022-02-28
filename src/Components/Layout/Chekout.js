import classes from './Chekout.module.css'
import { useRef,useState,useEffect} from 'react'


const Checkout = (props) =>{
    const [isValid,setIsValid] = useState(null)
    const [error] = useState([ "Inserisci il nome", "inserisci la via" , "inserisci la citta","cap deve essere maggiore di 4"]);
    const nameInput = useRef();
    const viaInput = useRef();
    const capInput = useRef();
    const cittyInput = useRef();

   

    const formControl = () =>{
        const name = nameInput.current.value,
              via =  viaInput.current.value,
              citta = cittyInput.current.value,
              cap = capInput.current.value.trim()

              if (name !== "" && via !=="" && citta !=="" && cap.length > 4){
                  setIsValid(true)
              }else{
                  setIsValid(false)
              }
             
            }

        
      

    const onConfirmClick = (e) =>{
        e.preventDefault()
       
        if(isValid){
            const data = {
                name: nameInput.current.value,
                via:  viaInput.current.value,
                cap:  capInput.current.value,
                citta: cittyInput.current.value
            }
            
            props.cart(data)
            props.onOrder()
            props.setForm(false);
            
        } else{
            return;
        }
       
    }

    return(
        <form className={classes.form} onSubmit={onConfirmClick} action="submit">
            <div className={`${classes.control} ${isValid === false ? classes.invalid : ""} ` }>
                <label>Name</label>
                <input  ref={nameInput} type="text"/>
                <p>{isValid===false && error[0]}</p>
            </div>
            <div className={`${classes.control} ${isValid === false ? classes.invalid : ""} ` }>
                <label>Via</label>
                <input ref={viaInput} type="text"/>
                <p>{isValid===false && error[1]}</p>
            </div>
            <div className={`${classes.control} ${isValid === false ? classes.invalid : ""} ` }>
                <label>Cap</label>
                <input  ref={capInput} type="text"/>
                <p>{isValid===false && error[3]}</p>
            </div>
            <div className={`${classes.control} ${isValid === false ? classes.invalid : ""} ` }>
                <label>Citta</label>
                <input  ref={cittyInput} type="text"/>
                <p>{isValid===false && error[2]}</p>
            </div>
            <div className={`${classes.control} ${isValid === false ? classes.invalid : ""} ` }>
            <button onClick={formControl} type='submit'>Confirm</button>
            <button  onClick={()=>props.setForm(false)}>Cancell</button>
            </div>
        </form>
    )

}

export default Checkout