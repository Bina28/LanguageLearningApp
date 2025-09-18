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
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Login</h2>
        <div className="form-underline"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inputs">
            <div className="form-input">
              <img src={emailIcon} alt="Email" className="icon" />
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-input">
              <img src={passwordIcon} alt="Password" className="icon" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div className="form-link-text">
            Don't have an account? <Link to="/signup"> Sign Up</Link>
          </div>

          <div className="submit-btn-container">
            <button
              className="btn submit-btn"
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
