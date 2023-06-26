"use client";

import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/redux/features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ login = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const dispatch = useDispatch();
  const { error, isLoading, isSuccess, isLogin } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      const userRole = login ? null : role;
      dispatch(signUp({ email, password, username: name, role: userRole }));

      if (isSuccess) {
        router.push("/dashboard");
      }
    } else {
      alert("Please provide all required fields.");
    }
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(signIn({ email, password }));

      if (isSuccess) {
        router.push("/dashboard");
      }
    }
  };
  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isSuccess, router, isLogin]);
  return (
    <>
      <form onSubmit={!login ? handleSubmit : handleLogIn}>
        {!login && (
          <>
            <h3>Name :</h3>
            <input
              type="text"
              placeholder="name"
              required
              className="border p-2 rounded-md outline-none w-full mt-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
          </>
        )}

        <h3>Email :</h3>
        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded-md outline-none w-full mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <h3>{!login && "Set"} Password :</h3>
        <div className="w-full border relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (8 or more characters)"
            className="border p-2 rounded-md outline-none w-full"
            required
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handleTogglePassword}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <br />
        {!login && (
          <div className="flex items-center gap-2 mb-5">
            <input
              type="radio"
              name="radio"
              id="client"
              placeholder="client"
              value="client"
              checked={role === "client"}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label htmlFor="client" className="mr-5">
              client
            </label>

            <input
              type="radio"
              name="radio"
              id="freelancer"
              placeholder="freelancer"
              value="freelancer"
              checked={role === "freelancer"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="freelancer"> freelancer</label>
          </div>
        )}

        <button
          type="submit"
          className={`mt-0 bg-black px-4 py-2 text-white rounded transition-all border border-black ${
            isLoading ? "" : "hover:bg-white hover:text-black"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "loging.." : login ? "Login" : "Register"}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mt-5">
          {/* Display error message */}
          {error}
        </div>
      )}
    </>
  );
};

export default Form;
