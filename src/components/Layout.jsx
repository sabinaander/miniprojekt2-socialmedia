import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import "../App.css"
import Header from "./Header";
import SideBar from "./SideBar";

function Layout() {
  return (
    <div className="App">
      <header>
        <Header />
        <Flex>
          {/* Only show this if logged in */}
        <SideBar/>
        <Outlet/>
        </Flex>
      </header>
    </div>
  );
}

export default Layout;
