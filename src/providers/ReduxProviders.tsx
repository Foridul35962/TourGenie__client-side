"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import UseGetUser from "@/hooks/UseGetUser";
import { ToastContainer } from "react-toastify";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <UseGetUser />
      {children}
      <ToastContainer />
    </Provider>
  );
}