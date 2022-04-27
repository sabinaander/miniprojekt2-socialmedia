import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "../App.css"
import Header from "./Header";
import SideBar from "./SideBar";
import { useStore } from "react-redux";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";
import { useState } from "react";

function Layout() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });
  return (
    <div className="App">
      <header>
        <Header />
        <Flex >
          {/* Only show this if logged in */}
          {isLoggedIn ? (
        <SideBar />
        ):(
          <></>
        )}
        <Outlet/>
        </Flex>
      </header>
    </div>
  );
}

export default Layout;
