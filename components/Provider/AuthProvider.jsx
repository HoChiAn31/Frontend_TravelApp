import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [authToken, setAuthToken] = useState();
  const [idUser, setIdUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [userData, setUserData] = useState("");
  const [refreshUser, setRefreshUser] = useState(0);

  useEffect(() => {
    if (userName && passWord) {
      fetch("https://travel-app-tau-jet.vercel.app/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: passWord,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.token);
          setIsAuth(true);

          try {
            setIdUser(jwtDecode(json.token).id_user);
            const user = jwtDecode(json.token).nameUser;

            setNameUser(user);
            if (user === "admin") {
              setIsAdmin(true);
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
          // setIsLoading(true);
        })
        .catch((error) => {
          setIsAuth(false);
          setIsLoading(true);
          setError(true);
        });
    }
  }, [userName, passWord]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        authToken,
        setAuthToken,
        userName,
        setUserName,
        passWord,
        setPassWord,
        isLoading,
        setIsLoading,
        error,
        setError,
        idUser,
        setIdUser,
        nameUser,
        setNameUser,
        setUserData,
        userData,
        setRefreshUser,
        refreshUser,
        setIsAdmin,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
