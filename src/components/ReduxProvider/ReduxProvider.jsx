"use client";
import { store } from "@/store/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }) => {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
