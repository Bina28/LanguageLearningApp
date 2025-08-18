import { useEffect } from "react";

import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import useLogin from "../../lib/hooks/useLogin";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  useEffect(() => {
    const userId = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (userId && expiresAt && Date.now() < parseInt(expiresAt, 10)) {
      navigate(`/user/${userId}`);
    }
  }, [navigate]);

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h2 className="text">Login</h2>
        <div className="underline"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs">
            <div className="input">
              <img src={emailIcon} alt="Email" className="icon" />
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="input">
              <img src={passwordIcon} alt="Password" className="icon" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="links">
            Forgot password? <span>Click here</span>
          </div>
          <div className="links">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>

          <div className="submit-container">
            <button className="submit" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
