import React from "react";
import { useLoaderData } from "react-router";

const CoffeeDetails = () => {
  const coffee = useLoaderData();
  console.log(coffee);
  return <div>coffee name: {coffee.name}</div>;
};

export default CoffeeDetails;
