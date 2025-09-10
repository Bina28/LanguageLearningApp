import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";
import "./LoginSignup.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginSignup.css";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/courses");
      },
    });
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
            <button
              className="submit"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
