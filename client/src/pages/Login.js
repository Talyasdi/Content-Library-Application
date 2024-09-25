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
    <form className="login" noValidate onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="input-login-box">
        <div className="container-email-input">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i class="fas fa-envelope"></i>
        </div>

        <div className="container-password-input">
          <input
            type="password"
            placeholder="Password"
            class="input-field-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i class="fas fa-lock"></i>
        </div>
      </div>
      {err && <div className="error">{err}</div>}
      <button disabled={isLoading}>Login</button>
    </form>
  );
};

export default Login;
