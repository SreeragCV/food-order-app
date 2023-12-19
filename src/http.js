export async function fetchData() {
  const response = await fetch("http://localhost:3000/meals");
  const meals = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong..");
  }

  return meals;
}
