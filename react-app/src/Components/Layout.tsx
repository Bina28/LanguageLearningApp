// src/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Nav/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
     <main style={{ paddingTop: '100px' }}> 
        <Outlet /> 
      </main>
    </>
  );
}
