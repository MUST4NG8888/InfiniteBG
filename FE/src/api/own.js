import axios from "axios";
import { BehaviorSubject } from "rxjs";
import jwt_decode from 'jwt-decode'

const client = axios.create({ baseURL: `${import.meta.env.VITE_BACKEND_URL}` });


export const $token = new BehaviorSubject(localStorage.getItem("token"));
export const endSession = () => {
  localStorage.removeItem("token");
  $token.next(null);
};

let tokenInterval = null;
$token.subscribe((token) => {
  if (tokenInterval) clearInterval(tokenInterval);
  tokenInterval = setInterval(() => {
    if (!token) return null;
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      endSession();
    }
  }, 1000);
});


export const login = async (code) => {
  try {
    const response = await client.post("/api/login", { code });
    const token = response.data;
    $token.next(token);
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    return null;
  }
};
