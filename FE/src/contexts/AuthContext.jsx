import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState();


  const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?";
  const scope = import.meta.env.VITE_SCOPE
  const response_type = import.meta.env.VITE_RESPONSE_TYPE
  const client_id =import.meta.env.VITE_CLIENT_ID
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI

  const url = `${googleURL}response_type=${response_type}&scope=${scope}&client_id=${client_id}&redirect_uri=${redirect_uri}&prompt=consent`;

  const sendCode = async (code) => {
    const response = await axios.post("http://localhost:8080/api/login", {
      code,
    });
    const token = response.data;
    console.log(token)
    localStorage.setItem("token", token);
    setloggedIn(token);
  };



  return (
    <AuthContext.Provider
      value={{
        sendCode,
        loggedIn,
        url,
        setloggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
