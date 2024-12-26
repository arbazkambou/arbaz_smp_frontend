"use client";
import { fetchUser, logoutUser } from "@/apis/authApis";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, token }) {
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );

  useEffect(function () {
    async function authenticateUser() {
      try {
        const data = await fetchUser();
        console.log("data", data);
        setIsAuthenticated(true);
        setUser(data);
        Cookies.set("user", JSON.stringify(data), { expires: 1 });
      } catch (error) {
        logOut();
      }
    }
    authenticateUser();
  }, []);

  async function logOut() {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("user");
    await logoutUser();
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
