import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setErr(null);

    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setErr(data.msg);
    } else {
      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
      setErr(null);
    }
  };
  return { login, err, isLoading };
};
