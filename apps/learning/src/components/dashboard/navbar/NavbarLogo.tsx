import { Link } from "react-router-dom";
import logo from "../../../assets/allnova-logo.png";

export function NavbarLogo() {
  return (
    <Link to="/" className="flex-shrink-0" aria-label="Go to homepage">
      <img src={logo} alt="Allnova" className="h-8 w-auto" />
    </Link>
  );
}
