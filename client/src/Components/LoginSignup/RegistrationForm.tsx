import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAccount } from "../../lib/hooks/useAccount";
import {
  type RegisterSchema,
  registerSchema,
} from "../../lib/schemas/registerSchema";
import personIcon from "../Assets/person.png";
import emailIcon from "../Assets/email.png";
import passwordIcon from "../Assets/password.png";

export default function RegistrationForm({
  onClose,
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  const { registerUser } = useAccount();

  const { register, handleSubmit, setError } = useForm<RegisterSchema>({
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
    <div className="form-container">
      <div className="form">
             <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="form-title">Sign Up</h2>
        <div className="form-underline"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-inputs">
            <div className="form-input">
              <img src={personIcon} alt="Name" className="icon" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("displayName", { required: true })}
              />
            </div>
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
                placeholder="Pasword"
                {...register("password", { required: true })}
              />
            </div>
          </div>
             <div className="form-link-text">
          Already have an account?{" "}
          <button className="link-btn" type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </div>

          <div className="submit-btn-container">
            <button type="submit" className="btn submit-btn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
