import { BehaviorSubject } from "rxjs";
import { login as requestLogin, $token, endSession } from "../api/own";
import jwt_decode from "jwt-decode";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string(),
  sub: z.string(),
});

const decodeUser = (token) => {
  if (!token) return null;
  const decodedToken = jwt_decode(token);
  return decodedToken;
};

export const $user = new BehaviorSubject(decodeUser($token.getValue()));
$token.subscribe((token) => $user.next(decodeUser(token)));

export const login = async (code, callback) => {
  const token = await requestLogin(code);
  const user = decodeUser(token);
  if (!user) return callback.onError();
  $user.next(user);
  callback.onSuccess();
};

export const logout = () => {
  endSession();
};
