export async function fetchData() {
  const response = await fetch("http://localhost:3000/meals");
  const meals = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong..");
  }

  return meals;
}

export async function saveOrders(customer, items) {
  const response = await fetch("http://localhost:3000/orderss", {
    method: "POST",
    body: JSON.stringify({
      order: {
        customer,
        items,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data");
  }

  return resData.message;
}
