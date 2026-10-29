import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () =>{
 
    const jwtToken = await auth.api.getToken({
    headers: await headers()
  });
  // console.log(jwtToken.token); 
  const token = jwtToken?.token;
  return token;
}