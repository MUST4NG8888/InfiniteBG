import { Link } from "react-router-dom";
import useRXjs from "../hooks/useRXjs";
import { $user } from "../states/user";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as Google } from "../assets/icons/Google__G.svg";
import styles from "../components/Navbar.module.css";
import useScrollDirection from "../hooks/useScrollDirection";
import SideMenu from "./SideMenu";



const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?";
const scope = import.meta.env.VITE_SCOPE;
const response_type = import.meta.env.VITE_RESPONSE_TYPE;
const client_id = import.meta.env.VITE_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

const url = `${googleURL}response_type=${response_type}&scope=${scope}&client_id=${client_id}&redirect_uri=${redirect_uri}&prompt=consent`;

const Navbar = () => {
  const user = useRXjs($user);
  const scrollDirection = useScrollDirection();

  return (
    <>
      <div
        className={`${styles.container} ${
          scrollDirection === "down" ? styles.hide : styles.show
        }`}
      >
        <nav className={styles.header}>
          <div></div>
          <Link to="/">
            <Logo id={styles.logo} />
          </Link>
          {!user ? (
            <Link id={styles.login} to={`${url}`}>
              Login with <Google id={styles.google} />
            </Link>
          ) : (
            <div></div>
          )}
        </nav>
        <SideMenu />
      </div>
    </>
  );
};

export default Navbar;
