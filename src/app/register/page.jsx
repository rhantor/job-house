"use client";

import React, { useState } from "react";
import Form from "./Form";

const SignUp = () => {
  const [selected, setSelected] = useState("register");
  return (
    <div className="max-w-[600px] mx-auto py-5 border mt-10 px-4">
      <ul className="flex justify-evenly items-center border mb-2">
        {["register", "login"].map((item, index) => (
          <li
            className={`cursor-pointer px-4 py-3 w-1/2 text-center ${
              selected === item ? "bg-slate-500 text-white " : null
            }`}
            onClick={() => setSelected(item)}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
      {selected === "register" ? (
        <>
          <h1 className=" text-2xl my-4">
            Registration as a
            <span className="font-semibold">
              {" "}
              Client <span className="font-thin">or</span> Contructor
            </span>{" "}
          </h1>
          <Form />{" "}
        </>
      ) : (
        <Form login />
      )}
    </div>
  );
};

export default SignUp;
