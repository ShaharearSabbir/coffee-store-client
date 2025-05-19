import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Cards from "./Cards";

const Home = () => {
  const initialCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(initialCoffees);
  return (
    <div>
      <Cards coffees={coffees} setCoffees={setCoffees}></Cards>
    </div>
  );
};

export default Home;
