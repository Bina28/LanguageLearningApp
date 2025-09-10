import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Nav/Navbar";
import Home from "./Components/Home/Home";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;
