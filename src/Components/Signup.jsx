import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, setUser } = useContext(AuthContext);
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

  const handleSignup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...userProfile } = Object.fromEntries(
      formData.entries()
    );
    delete userProfile.imageFile;
    userProfile.imageURL = imageURL;

    createUser(email, password)
      .then((userInfo) => {
        userProfile.uid = userInfo.user.uid;
        fetch("https://coffee-store-server-xi-ten.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("After Profile Save", data);
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Account Has Created",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            form.reset();
            setShow(false);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-center my-6">Sign up now!</h1>
        <form onSubmit={handleSignup} className="fieldset">
          <label className="label">Name</label>
          <input
            type="name"
            name="name"
            className="input w-full"
            placeholder="Name"
          />
          <label className="label">Address</label>
          <input
            type="text"
            name="address"
            className="input w-full"
            placeholder="Address"
          />
          <label className="label">Phone</label>
          <input
            type="text"
            name="phone"
            className="input w-full"
            placeholder="Phone"
          />
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full"
            placeholder="Password"
          />
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
          <button className="btn btn-neutral mt-4">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
