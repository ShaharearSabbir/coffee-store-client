import React, { useState } from "react";
import Swal from "sweetalert2";

const AddCoffee = () => {
  const [loader, setLoader] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [show, setShow] = useState(false);

  const apiKey = import.meta.env.VITE_IMGBB_KEY;
  const handleImage = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
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

  const handleAddCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log();
    const newCoffee = Object.fromEntries(formData.entries());
    delete newCoffee.imageFile;
    newCoffee.imageURL = imageURL;

    fetch("https://coffee-store-server-xi-ten.vercel.app/coffees", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Adding Coffee to DB", data);
        if (data.insertedId) {
          Swal.fire({
            title: "Coffee Added Successfully",
            icon: "success",
            draggable: true,
          });
          form.reset();
          setShow(false);
        }
      });
  };

  return (
    <div className="p-24">
      <div className="px-12 text-center space-y-4 my-6">
        <h1 className="text-7xl">Add Coffee</h1>
        <p>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>
      <form
        onSubmit={handleAddCoffee}
        className=" bg-base-200  border  border-base-300 rounded-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Title</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Coffee Name"
              name="name"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Quantity</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Quantity"
              name="quantity"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Supplier</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Supplier"
              name="supplier"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Taste</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter coffee name"
              name="taste"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Price</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter coffee price"
              name="price"
            />
          </fieldset>
          <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
            <label className="label">Details</label>
            <input
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

        {/* <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
          <label className="label">PhotoURL</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Photo URL"
            name="PhotoURL"
          />
        </fieldset> */}

        <fieldset className="fieldset w-full border-base-300 rounded-box p-4">
          <input type="submit" value="Add Coffee" className="btn w-full" />
        </fieldset>
      </form>
    </div>
  );
};

export default AddCoffee;
