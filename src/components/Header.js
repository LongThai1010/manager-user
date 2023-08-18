import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogoutRedux } from "../redux/actions/userAction";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.account);

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    // logout();
    // navigate("/");
    // toast.success("Logout Success");
  };

  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      navigate("/");
      toast.success("Logout Success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Manager-user</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {((user && user.auth) || window.location.pathname === "/") && (
            <>
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>

                <NavLink to="/users" className="nav-link">
                  Manager Users
                </NavLink>
              </Nav>
              <Nav>
                {user && user.email && (
                  <span className="nav-link"> Wellcom {user.email}</span>
                )}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink to="/login" className="dropdown-item">
                      Login
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
