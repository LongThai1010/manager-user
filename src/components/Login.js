import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
  const { loginContext } = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingApi, setLoadingApi] = useState(false);

  const handlePressEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Password is required!");
      return;
    }
    setLoadingApi(true);
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      toast.success("Login successfully");
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
        setLoadingApi(false);
      }
    }

    console.log(res);
  };

  return (
    <Container>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">
          Email or Username eve.holt@reqres.in cityslicka
        </div>
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
          onKeyDown={(e) => handlePressEnter(e)}
        />
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}
          &nbsp; Login
        </button>
        <div className="back">
          {" "}
          <span onClick={() => handleGoBack()}> --Go back</span>
        </div>
      </div>
    </Container>
  );
}

export default Login;
