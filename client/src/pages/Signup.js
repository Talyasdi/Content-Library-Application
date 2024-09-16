import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [age, setAge] = useState("");
  const { signup, isLoading, err } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password, repPassword, age);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
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
      <label>
        Repeat Password:
        <input
          type="password"
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </label>
      <button disabled={isLoading}>Signup</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default Signup;
