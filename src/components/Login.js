import { useState } from "react";
import { Container } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or Username</div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <div className="back"> --Go back</div>
      </div>
    </Container>
  );
}

export default Login;
