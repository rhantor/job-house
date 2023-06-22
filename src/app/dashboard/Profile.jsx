import { logOut } from "@/redux/features/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Profile = ({ userDetails = {} }) => {
  const dispatch = useDispatch();
  const { displayName: name, uid, email, metadata, role } = userDetails;
  const createdAt = metadata.createdAt ;
  const lastLogin = metadata.lastLoginAt ;
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="container px-5 py-5 space-y-8">
      <div className="rounded-md p-3 ">
        <h1 className="text-2xl  capitalize ">
          <span className=" font-thin"> {name}</span>
        </h1>
        <h2>
          Created for &nbsp;
          {role == "freelancer" && (
            <span className="text-green-600 font-semibold">freelancing</span>
          )}
          {role == "client" && (
            <span className="text-green-600 font-semibold">Out source</span>
          )}
        </h2>
        <h2>
          E-Mail - <span className="text-green-600 font-semibold">{email}</span>
        </h2>
        <h2>
          Uid - <span className="text-green-600 font-semibold">{uid}</span>
        </h2>
        <h2>
          created this account at -{" "}
          <span className="text-green-600 font-semibold">
            {new Date(createdAt * 1000).toDateString()}
          </span>
        </h2>
        <h2>
          Last login at -{" "}
          <span className="text-green-600 font-semibold">
            {new Date(lastLogin * 1000).toDateString()}
          </span>
        </h2>
      </div>

      <div>
        <button
          type="button"
          onClick={handleLogOut}
          className="text-white drop-shadow-lg p-2 px-3 bg-red-700 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
