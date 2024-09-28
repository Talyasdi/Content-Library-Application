import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(true);
        setMessage(data.msg);
        return;
      } else {
        setMessage(data.msg);
        setError(false);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot password</h2>
        <p>Please verify your identity</p>
        <input
          type="email"
          class="email-input-forgot-password"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Email</button>
        {error && <div className="error">Error: {message}</div>}
        {!error && message && <div className="success">{message}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
