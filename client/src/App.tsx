import { Outlet } from "react-router-dom";
import "./global.css";
import Navbar from "./Components/Nav/Navbar";
import { useState } from "react";
import LoginForm from "./Components/LoginSignup/LoginForm";
import RegistrationForm from "./Components/LoginSignup/RegistrationForm";
export default function App() {
  const [modal, setModal] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <div className={`blur-wrapper ${modal ? "blurred" : ""}`}>
                <Navbar setModal={setModal} />
        <Outlet context={{ setModal }} />
      </div>

     {modal === "login" && (
  <div className="overlay" onClick={() => setModal(null)}>
    <div  onClick={(e) => e.stopPropagation()}>
      <LoginForm
        onClose={() => setModal(null)}
        onSwitchToSignup={() => setModal("signup")}
      />
    </div>
  </div>
)}

{modal === "signup" && (
  <div className="overlay" onClick={() => setModal(null)}>
    <div  onClick={(e) => e.stopPropagation()}>
      <RegistrationForm
        onClose={() => setModal(null)}
        onSwitchToLogin={() => setModal("login")}
      />
    </div>
  </div>
)}

    </>
  );
}