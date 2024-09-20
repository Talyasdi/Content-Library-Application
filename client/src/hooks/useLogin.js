import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setErr(null);
    try {
      const response = await fetch("api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErr(data.message);
      }
    } catch (error) {
      setErr(error.message);
    }
  };
  return { login, err, isLoading };
};
