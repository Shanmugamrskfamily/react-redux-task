import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBarPanel";
import { Provider } from "react-redux";
import store from "../store/store";
const RootLayout = () => {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </Provider>
    </>
  );
};

export default RootLayout;
