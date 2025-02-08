import { Link, useMatch, useResolvedPath } from "react-router-dom";
import './Navbar.css';
export default function Navbar(){
   
return(
    <nav className="nav">
        <Link to="/" className="logo">Logo</Link>
        <ul>
           <CustomLink  to="/home">Home</CustomLink>
           <CustomLink to="/login">Login</CustomLink>
        </ul>
    </nav>
)
}

function CustomLink({to, children, ...props}){
 const resolvedPath =  useResolvedPath(to);
 const isActive = useMatch({path: resolvedPath.pathname, end:true})
return(
    <li className={isActive ? "active" : ""} >
        <Link to={to}>{children}</Link>
    </li>
)
}