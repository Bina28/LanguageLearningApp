import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAccount } from "../../lib/hooks/useAccount";
import {
  type RegisterSchema,
  registerSchema,
} from "../../lib/schemas/registerSchema";
import personIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";

export default function RegistrationForm() {
  const { registerUser } = useAccount();

  const {register,  handleSubmit, setError } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes("Email")) setError("email", { message: err });
            else if (err.includes("Password"))
              setError("password", { message: err });
          });
        }
      },
    });
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
              {...register("displayName", { required: true })}
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
