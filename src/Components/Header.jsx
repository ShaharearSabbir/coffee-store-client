import React, { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router";
import { AuthContext } from "./context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  const handleSignout = () => {
    logout()
      .then(() => alert("Logged out"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="bg-base-200">
      <nav className="w-11/12 mx-auto flex justify-between">
        <div className="flex gap-4">
          <NavLink to="/">Go Home</NavLink>
          <NavLink to="/signin">Signin</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
        <div className="flex gap-4">
          <p>{user?.email}</p>
          <button onClick={handleSignout}>Signout</button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
