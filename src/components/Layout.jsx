import { Outlet } from "react-router-dom";
import "../App.css"
import Header from "./Header";
import PostForm from "./PostForm";

function Layout() {
  return (
    <div className="App">
      <header>
        <Header />
        
        <Outlet/>
        <PostForm />
      </header>
    </div>
  );
}

export default Layout;
