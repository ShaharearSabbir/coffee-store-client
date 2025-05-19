import React from "react";
import { Link, Navigate } from "react-router";

const Header = () => {
  return (
    <div className="bg-base-200">
      <nav className="w-11/12 mx-auto">
        <Link to="/">Go Home</Link>
      </nav>
    </div>
  );
};

export default Header;
