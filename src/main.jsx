import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import Home from "./Components/Home.jsx";
import AddCoffee from "./Components/AddCoffee.jsx";
import UpdateCoffee from "./Components/UpdateCoffee.jsx";
import CoffeeDetails from "./Components/CoffeeDetails.jsx";
import Signin from "./Components/Signin.jsx";
import Signup from "./Components/Signup.jsx";
import AuthProvider from "./Components/context/AuthProvider.jsx";
import Users from "./Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://coffee-store-server-xi-ten.vercel.app/coffees"),
        Component: Home,
      },
      { path: "/addCoffee", Component: AddCoffee },
      {
        path: "/updateCoffee/:id",
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-xi-ten.vercel.app/coffee/${params.id}`
          ),
        Component: UpdateCoffee,
      },
      {
        path: "/coffeeDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-xi-ten.vercel.app/coffee/${params.id}`
          ),
        element: <CoffeeDetails></CoffeeDetails>,
      },
      {
        path: "/users",
        loader: () =>
          fetch(`https://coffee-store-server-xi-ten.vercel.app/users`),
        element: <Users></Users>,
      },
      {
        path: "signin",
        Component: Signin,
      },
      { path: "signup", Component: Signup },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
