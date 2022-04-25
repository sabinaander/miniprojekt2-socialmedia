import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "../App.css"
import Header from "./Header";
import SideBar from "./SideBar";

function Layout() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      <header>
        <Header />
        <Flex>
          {/* Only show this if logged in */}
          {currentUser ? (
        <SideBar/>
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
