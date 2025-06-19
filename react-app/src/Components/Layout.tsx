// src/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Nav/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
     <main style={{ marginTop: '7.6rem' }}> 
        <Outlet /> 
      </main>
    </>
  );
}
