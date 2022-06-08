import { Container, Navbar, Nav } from "react-bootstrap";
import "./App.css";
import Footer from "./Footer.js";
import logoHlsb from "./images/logo hlsb.png";
import CalculatorPage from "./pages/Calculator";

const App = () => {
  return (
    <div>
      <Navbar
        bg="light"
        variant="light"
        style={{ height: 70 }}
        className="shadow"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" src={logoHlsb} style={{ width: 200, height: 150 }} />
          </Navbar.Brand>
          <Nav
            className="justify-content-end flex-grow-1 pe-3"
            style={{ fontWeight: "bold" }}
          >
            <Nav.Link href="#consultation">CONSULTATION</Nav.Link>
            <Nav.Link href="#training">TRAINING</Nav.Link>
            <Nav.Link href="#quikhalal">QUIKHALAL</Nav.Link>
            <Nav.Link href="#myhalalgig">MYHALALGIG</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <CalculatorPage />

      <Footer></Footer>
    </div>
  );
};

export default App;
