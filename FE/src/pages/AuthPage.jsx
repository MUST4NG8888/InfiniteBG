import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../states/user";

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

  return <h1>GOOGLE AUTH</h1>;
};

export default AuthPage;
