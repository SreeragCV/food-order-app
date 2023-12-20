import React, { useCallback, useEffect, useState } from "react";
import { fetchData } from "../http";
import MealItem from "./MealItem";
import Error from "./Error";
import Modal from "./Modal";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState(false);
  const [errorUpdatingMessage, setErrorUpdatingMessage] = useState();

  useEffect(() => {
    async function fetchMeals() {
      try {
        const meals = await fetchData();
        setLoadedMeals(meals);
      } catch (error) {
        setErrorUpdatingMessage({
          message: error.message || "Something went wrong. Please try again..",
        });
        setError(true);
      }
    }
    fetchMeals();
  }, [fetchData]);

  function handleError() {
    location.reload()
  }

  if (error) {
    return (
      <Error
        title="Oops..no connection!"
        message={errorUpdatingMessage.message}
        onClose={handleError}
      />
    );
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
