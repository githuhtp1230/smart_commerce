import { jwtDecode } from "jwt-decode";
import { setCookie } from "typescript-cookie";

const saveToken = (token: string, key: string) => {
  const decoded = jwtDecode(token);
  const expiredTime = decoded.exp;
  if (expiredTime) {
    const expires = new Date(expiredTime * 1000);
    setCookie(key, token, { expires });
  }
};

export default saveToken;
