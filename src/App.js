import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import TableUsers from "./components/TableUsers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUsers />} />
        </Routes>

        {/* <TableUsers /> */}
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
