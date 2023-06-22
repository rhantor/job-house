"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const Dashboard = () => {
  const { userDetails = {}, isLogin } = useSelector((state) => state.auth);

  return (
    <>
      {!isLogin ? (
        <div className="text-center h-[91vh] flex items-center justify-center">
          <h1>
            There Is No user go to{" "}
            <Link href={"/register"} className="underline text-blue-700">
              {" "}
              register
            </Link>{" "}
            page
          </h1>
        </div>
      ) : (
        <Profile userDetails={userDetails} />
      )}
    </>
  );
};

export default Dashboard;
