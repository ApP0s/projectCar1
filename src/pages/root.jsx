import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="Dashboard">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="Hightlight">Hightlight</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      
    </>
  );
}

export default Root;
