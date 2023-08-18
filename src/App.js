import "./App.scss";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
      // loginContext(
      //   localStorage.getItem("email"),
      //   localStorage.getItem("token")
      // );
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <Header />
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
