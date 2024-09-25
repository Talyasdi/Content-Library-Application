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
      <div className="input-login-group">
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
          {/* <i class="fas fa-lock"></i> */}
          <input
            type="password"
            placeholder="Password "
            class="input-field-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      {err && <div className="error">{err}</div>}
      <button disabled={isLoading}>Login</button>
    </form>
  );
};

export default Login;
