import { NavLink } from "react-router-dom";

type CustomNavLinkProps ={
  to: string;
  children: React.ReactNode;
}

export default function CustomNavLink({ to, children }: CustomNavLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `main-nav-link ${isActive ? "active" : ""}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
