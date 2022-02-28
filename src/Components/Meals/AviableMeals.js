import Card from "../UI/Card";
import classes from './AviableMeals.module.css'
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";
import { useState } from "react";



const AvailableMeals = (props) => {
  const [meals,setMeals] = useState([])
  const [error,setError] = useState()
  const [loading, setLoading] = useState(true)
   
     const fetchMeals = (async()=>{
       
         const response = await fetch("https://order-food-app-97d8f-default-rtdb.firebaseio.com/meals.json ");
         if(!response.ok){
           throw new Error("ooops")
         }
         const data = await response.json();
         
         const loadedMeals = []
         for(const key in data){
           loadedMeals.push({
             id:key,
             name: data[key].name,
             description: data[key].description,
             price: data[key].price
           })
         }
         setMeals(loadedMeals)
         setLoading(false);
        
       
     }) 

     useEffect(()=>{
     fetchMeals().catch((error)=>{
      setLoading(false)
     setError(error.message)
    });
     
     },[])

     if(loading){
       return(
       <section className={classes.mealsLoading}>
         
         <p>Loading...</p>
         
       </section>
       )
     }

     if(error){
       return(
        <section className={classes.mealsError}>
         <p>{error}</p>
       
        
      </section>
       )
     }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
       
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
