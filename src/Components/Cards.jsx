import React from "react";
import Card from "./Card";

const Cards = ({ coffees, setCoffees }) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-bold">Our Popular Products</h2>
      <button className="btn btn-primary text-shadow-accent text-shadow text-secondary hover:bg-secondary hover:text-primary">
        Add Coffee
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {coffees.map((coffee) => (
          <Card
            setCoffees={setCoffees}
            coffees={coffees}
            coffee={coffee}
            key={coffee._id}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
