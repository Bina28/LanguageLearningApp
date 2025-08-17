import { Link } from "react-router-dom";
import personIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../lib/hooks/useUser";
import { useUserContext } from "../../lib/hooks/UserContext";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const createUser = useUser();
  const navigate = useNavigate();
  const password = watch("password", "");
  const { setUser } = useUserContext();

  const onSubmit = (data: FormData) => {
    createUser.createUser.mutate(
      {
        fullName: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: async (id) => {
          const userObj = { id };
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj)); 
          navigate(`/user/${id}`);
        },
      }
    );
  };

  return (
    <div className="container">
      <div className="glass-box">
        <h2 className="text">Sign Up</h2>
        <div className="underline"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="inputs">
          <div className="input">
            <img src={personIcon} alt="Name" className="icon" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: true })}
            />
          </div>
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
              placeholder="Pasword"
              {...register("password", { required: true })}
            />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="Confirm Password" className="icon" />
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
            />
          </div>

          <div className="forgot-password">
            Already have an account? <Link to="/login">Login</Link>
          </div>

          <div className="submit-container">
            <button type="submit" className="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
