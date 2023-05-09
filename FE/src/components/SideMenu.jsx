import useRXjs from "../hooks/useRXjs";
import { $user, logout } from "../states/user";
import { ReactComponent as MiniLogo } from "../assets/icons/MiniLogo.svg";
import { ReactComponent as Logout } from "../assets/icons/Logout.svg";
import { NavLink } from "react-router-dom";
import styles from "./SideMenu.module.css";
import { useLottie } from "lottie-react";
import hamburger from "../assets/icons/menuV3.json";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import GameIcon from "../assets/icons/Games.svg";
import PlayIcon from "../assets/icons/Play.svg";
import DisqusIcon from "../assets/icons/Disqus.svg";
import "./SideMenuAnimation.css";

const SideMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const nodeRef = useRef(null);
  const { View, play, setDirection } = useLottie(
    {
      animationData: hamburger,
      loop: false,
      autoplay: false,
    },
    { width: "40px" }
  );

  const onHover = () => {
    setIsOpened(true);
    setDirection(1);
    play();
  };

  const onOut = () => {
    setIsOpened(false);
    setDirection(-1);
    play();
  };

  const user = useRXjs($user);
  return (
    <>
      <CSSTransition
        in={isOpened}
        nodeRef={nodeRef}
        timeout={300}
        classNames="sidemenu"
        unmountOnExit
      >
        <div id={styles.container} ref={nodeRef} onMouseLeave={onOut}>
          <div id={styles.linkContainer}>
            <div></div>
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
          {user ? (
            <Logout
              onClick={() =>{logout(), window.location.reload();
              }}
              id={styles.logout}
            />
          ) : (
            <MiniLogo id={styles.sidelogomini} />
          )}
        </div>
      </CSSTransition>
      { user ? (
        <NavLink to="profile">
          <div id={styles.avatarContainer} onMouseEnter={onHover}>
            <img id={styles.avatar} src={user.avatar} alt="" />
          </div>
        </NavLink>
      ) : (
        <div id={styles.hamburger} onMouseEnter={onHover}>
          {View}
        </div>
      )}
    </>
  );
};

export default SideMenu;
