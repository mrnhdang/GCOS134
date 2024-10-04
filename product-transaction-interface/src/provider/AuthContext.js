"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthStateContext = createContext();

const AuthContext = ({ children }) => {
  const [uiState, setUiState] = useState();
  const [auth, setAuth] = useState();
  const router = useRouter();
  const pathname = usePathname();

  const handleOnChangeAuth = (e) => {
    setAuth({
      ...auth,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetUserDetail = async (id) => {
    try {
      setUiState({ loading: true });
      const res = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
      setAuth(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;

      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const handleEditUserDetail = async () => {
    try {
      setUiState({ loading: true });
      const res = await axios.patch(
        `http://localhost:8080/api/v1/user/${auth?.id}`,
        auth
      );
      setAuth(res?.data);
      setUiState({ loading: false });
    } catch (error) {
      const message = error?.response?.data?.message;

      setUiState({
        loading: false,
        error: message,
      });
    }
  };

  const login = (loginData) => {
    setAuth(loginData);
    localStorage.setItem("username", loginData?.username);
    localStorage.setItem("email", loginData?.email);
    localStorage.setItem("id", loginData?.id);
    localStorage.setItem("role", loginData?.role);
    localStorage.setItem("balance", loginData?.balance);
  };

  const logout = () => {
    setAuth(undefined);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("balance");
    router.push("/user/login");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (!auth && id) {
      handleGetUserDetail(id);
    }

    if (pathname === "/user/login") {
      if (!auth?.id && !id) {
        router?.push("/user/login");
      } else {
        if (role === "ADMIN") {
          router?.push("/admin");
        } else if (role === "USER") {
          router?.push("/shop");
        }
      }
    }

    if (pathname?.includes("admin") && role === "USER") {
      router?.push("/shop");
    }
  }, [auth, router, pathname]);

  return (
    <AuthStateContext.Provider
      value={{
        auth,
        login,
        logout,
        handleOnChangeAuth,
        handleEditUserDetail,
        handleGetUserDetail,
        uiState,
        setUiState,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};
export default AuthContext;
