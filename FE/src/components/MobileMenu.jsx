import styles from "./MobileMenu.module.css";
import useScrollDirection from "../hooks/useScrollDirection";
import { NavLink } from "react-router-dom";
import GameIcon from "../assets/icons/Games.svg";
import PlayIcon from "../assets/icons/Play.svg";
import DisqusIcon from "../assets/icons/Disqus.svg";
import useRXjs from "../hooks/useRXjs";
import { $user, logout } from "../states/user";
import { ReactComponent as MiniLogo } from "../assets/icons/MiniLogo.svg";
import { ReactComponent as Logout } from "../assets/icons/Logout.svg";

const MobileMenu = () => {
  const scrollDirection = useScrollDirection();
  const user = useRXjs($user);

  return (
    <div
      className={`${styles.container} ${
        scrollDirection === "down" ? styles.hide : styles.show
      }`}
    >
      <nav id={styles.nav}>
        <div className={styles.box}>
        {user && (
          <NavLink to="profile">
            <div id={styles.avatarContainer}>
              <img id={styles.avatar} src={user.avatar} alt="" />
            </div>
          </NavLink>
        )}
        </div>
        <div className={styles.box}>
        <div id={styles.linkContainer}>
          <NavLink
            className={styles.games}
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "#4771DC",
              };
            }}
            to="games"
          >
            <div className={styles.buttonHover}></div>
            <div className={styles.buttonBox}>
              <img src={GameIcon} alt="" />
              <h4>Games</h4>
            </div>
          </NavLink>
          <NavLink
            className={styles.games}
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "#4771DC",
              };
            }}
            to="plays"
          >
            <div className={styles.buttonHover}></div>
            <div className={styles.buttonBox}>
              <img src={PlayIcon} alt="" />
              <h4>Plays</h4>
            </div>
          </NavLink>
          <NavLink
            className={styles.games}
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "#4771DC",
              };
            }}
            to="events"
          >
            <div className={styles.buttonHover}></div>
            <div className={styles.buttonBox}>
              <img src={DisqusIcon} alt="" />
              <h4>Events</h4>
            </div>
          </NavLink>
        </div>
        </div>
        <div id={styles.rightBox}className={styles.box}>
          {user ? (
            <Logout
              onClick={() =>{logout();
              }}
              id={styles.logout}
            />
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
