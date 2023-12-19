import React, { useEffect, useState } from "react";
import { fetchData } from "../http";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals(){
        const meals = await fetchData();
        setLoadedMeals(meals)
    }
    fetchMeals();
  }, [fetchData]);


  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
   
  );
}
