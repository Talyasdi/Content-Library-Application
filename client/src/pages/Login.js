import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, err, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {err && <div className="error">{err}</div>}
      <button disabled={isLoading}>Login</button>
    </form>
  );
};

export default Login;
