"use client";

import React from "react";
import { useEffect } from "react";
import store from "@/redux/store";
import { setUser } from "@/redux/features/auth/authSlice";
const Components = ({ children }) => {
  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("userData"));
    if (user) {
      store.dispatch(setUser(user));
    }
  }, []);
  return <>{children}</>;
};

export default Components;
