import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Card = ({ coffee, setCoffees, coffees }) => {
  console.log(coffee);

  const { imageURL, name, price, quantity, _id } = coffee;

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const updatedCoffees = coffees.filter(
                (coffee) => coffee._id !== id
              );
              setCoffees(updatedCoffees);
            }
          });
      }
    });
  };

  return (
    <div className="flex justify-between items-center gap-5 bg-base-200 card-side rounded-lg hover:shadow-lg border-2 border-base-300 p-6">
      <figure>
        <img src={imageURL} alt="coffee" />
      </figure>
      <div className="text-left flex-1 space-y-2">
        <h2 className="card-title">{name}</h2>
        <p>Price: {price}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <div className="join join-vertical space-y-3">
        <Link
          className="btn join-item btn-primary text-secondary hover:bg-secondary hover:text-primary"
          to={`/coffeeDetails/${_id}`}
        >
          View
        </Link>
        <Link
          to={`/updateCoffee/${_id}`}
          className="btn join-item btn-primary text-secondary hover:bg-secondary hover:text-primary"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDelete(_id)}
          className="btn join-item btn-primary text-secondary hover:bg-secondary hover:text-primary"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
