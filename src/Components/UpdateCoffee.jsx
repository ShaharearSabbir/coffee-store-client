import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const [loader, setLoader] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [show, setShow] = useState(false);

  const coffee = useLoaderData();

  const { name, price, quantity, _id, supplier, taste, details } = coffee;

  const apiKey = import.meta.env.VITE_IMGBB_KEY;
  const handleImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    // addImage(image);
    setLoader(true);
    setShow(false);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("key", apiKey);
    console.log(formData);
    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setImageURL(data?.data?.display_url);
          setLoader(false);
          setShow(true);
          console.log(imageURL);
        } else {
          setLoader(false);
          setShow(true);
        }
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());
    delete updatedData.imageFile;
    if (imageURL) {
      updatedData.imageURL = imageURL;
    } else {
      updatedData.imageURL = coffee.imageURL;
    }
    fetch(`https://coffee-store-server-xi-ten.vercel.app/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Coffee Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-24">
      <div className="px-12 text-center space-y-4 my-6">
        <h1 className="text-7xl">Update Coffee</h1>
      </div>
      <form
        onSubmit={handleUpdate}
        className=" bg-base-200  border  border-base-300 rounded-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Title</label>
            <input
              defaultValue={name}
              type="text"
              className="input w-full"
              placeholder="Coffee Name"
              name="name"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Quantity</label>
            <input
              defaultValue={quantity}
              type="number"
              className="input w-full"
              placeholder="Quantity"
              name="quantity"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Supplier</label>
            <input
              defaultValue={supplier}
              type="text"
              className="input w-full"
              placeholder="Supplier"
              name="supplier"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Taste</label>
            <input
              defaultValue={taste}
              type="text"
              className="input w-full"
              placeholder="Enter coffee name"
              name="taste"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Price</label>
            <input
              defaultValue={price}
              type="text"
              className="input w-full"
              placeholder="Enter coffee price"
              name="price"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Details</label>
            <input
              defaultValue={details}
              type="text"
              className="input w-full"
              placeholder="Enter coffee details"
              name="details"
            />
          </fieldset>
        </div>
        <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
          <label className="label">Photo</label>
          <div className="flex border-base-300">
            <input
              type="file"
              className="file-input file-input-ghost w-full"
              name="imageFile"
              onChange={handleImage}
            />
            {loader && (
              <span className="loading loading-dots loading-lg"></span>
            )}
          </div>
          {show &&
            (imageURL ? (
              <p className="text-green-500">Image Uploaded Successfully</p>
            ) : (
              <p className="text-red-500">Upload Failed</p>
            ))}
        </fieldset>

        <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
          <input type="submit" value="Update Coffee" className="btn w-full" />
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateCoffee;
