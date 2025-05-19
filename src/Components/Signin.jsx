import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Signin = () => {
  const { loginUser, setUser } = useContext(AuthContext);

  const handleSignip = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    loginUser(email, password)
      .then((userInfo) => {
        // setUser(userInfo.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold text-center my-6">Sign in now!</h1>
        <form onSubmit={handleSignip} className="fieldset">
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
          <button className="btn btn-neutral mt-4">Signin</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
