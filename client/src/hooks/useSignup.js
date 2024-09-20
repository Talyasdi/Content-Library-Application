import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (userName, email, password, repPassword, age) => {
    setIsLoading(true);
    setErr(null);
    setSuccess(false);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        repPassword,
        age,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setErr(json.msg);
      setSuccess(false);
      setIsLoading(false);
    } else {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json.user });
      setIsLoading(false);
      setSuccess(true);
    }
  };
  return { signup, isLoading, err, success };
};
