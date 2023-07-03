import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  let location = useLocation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Manager-user</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/users" className="nav-link">
              Manager Users
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
