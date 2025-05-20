import React, { useState } from "react";
import { useLoaderData } from "react-router";

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (uid) => {
    fetch(`https://coffee-store-server-xi-ten.vercel.app/user/${uid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const remainingUser = users.filter((user) => user.uid !== uid);
        setUsers(remainingUser);
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL NO.</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.imageURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <th className="flex flex-col">
                    <button className="btn  btn-xs">View</button>
                    <button className="btn  btn-xs">Edit</button>
                    <button
                      onClick={() => handleDelete(user.uid)}
                      className="btn  btn-xs"
                    >
                      delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
