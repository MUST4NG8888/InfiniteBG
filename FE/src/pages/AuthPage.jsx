import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../states/user";
import InfinityLoading from "../assets/icons/infinityLoading";
import styles from "./AuthPage.module.css"

const AuthPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get("code");
    if (code) login(code, {
      onSuccess: () => navigate(-2),
      onError: () => navigate("/googleauth")
    });
  }, [])

  return <div id={styles.container}><InfinityLoading/></div>
};

export default AuthPage;
