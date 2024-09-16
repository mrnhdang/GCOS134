"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthStateContext = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState();
  const router = useRouter();

  const login = (loginData) => {
    setAuth(loginData);
    localStorage.setItem("username", loginData?.username);
    localStorage.setItem("email", loginData?.email);
    localStorage.setItem("id", loginData?.id);
    localStorage.setItem("role", loginData?.role);
  };

  const logout = () => {
    setAuth(undefined);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    router.push("/user/login");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!auth?.id && !id) {
      router?.push("/user/login");
    } else {
      if (auth?.role === "ADMIN") {
        router?.push("/admin");
      } else {
        router?.push("/product");
      }
    }
  }, [auth, router]);

  return (
    <AuthStateContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthStateContext.Provider>
  );
};
export default AuthContext;
