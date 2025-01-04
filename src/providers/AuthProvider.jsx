"use client";
import { fetchUser, logoutUser } from "@/apis/authApis";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, token }) {
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);
  console.log("token", token);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
  );

  useEffect(function () {
    async function authenticateUser() {
      try {
        setIsAuthLoading(true);
        const data = await fetchUser();
        setIsAuthenticated(true);
        setUser(data);
        Cookies.set("user", JSON.stringify(data), { expires: 1 });
        setIsAuthLoading(false);
      } catch (error) {
        setIsAuthLoading(false);
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
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logOut,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
