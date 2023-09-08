import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleLoginRedux } from "../redux/actions/userAction";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

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

    dispatch(handleLoginRedux(email, password));
    // let res = await loginApi(email.trim(), password);
    // if (res && res.token) {
    //   loginContext(email, res.token);
    //   toast.success("Login successfully");
    //   navigate("/");
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error(res.data.error);
    //     setLoadingApi(false);
    //   }
    // }
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);

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
          {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
          &nbsp; Login
        </button>
        <div className="back">
          <span onClick={() => handleGoBack()}> --Go back</span>
        </div>
      </div>
    </Container>
  );
}

export default Login;
