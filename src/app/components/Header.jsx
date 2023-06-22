"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { isLogin = false, userDetails } = useSelector((state) => state?.auth);

  return (
    <header className="border shadow-sm container mx-auto px-5 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl tracking-wider">
        <Link href={"/"}>
          JO<span className="text-red-600">B</span>
          <span className="text-red-600">B</span>Y
        </Link>
      </h1>
      <nav className="list-none flex justify-center items-center gap-4">
        {isLogin ? (
          <>
            <Link href={"/job"}>Job List </Link>
            {userDetails?.role == "client" && (
              <Link href={"/create-post"}>Create Post </Link>
            )}
            <Link href={"/dashboard"} className="w-9 h-9 bg-white rounded-full">
              <Image
                src={"/avatar.jpg"}
                width={36}
                height={36}
                title="dashboard"
                alt="avatar"
                className="object-cover rounded-full w-full h-full"
              />
            </Link>
          </>
        ) : (
          <>
            <Link href={"/register"}>Register/Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
