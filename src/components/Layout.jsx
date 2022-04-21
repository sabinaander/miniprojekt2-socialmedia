import { Outlet } from "react-router-dom";
import "../App.css"
import StartPage from "../pages/StartPage";
import Header from "./Header";
import PostForm from "./PostForm";

function Layout() {
  return (
    <div className="App">
      <header>
        <Header />
        <Outlet/>
      </header>
    </div>
  );
}

export default Layout;
