import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddHouse from "./components/addHouse";
import Home from "./components/home";
import HouseList from "./components/housesList";
import House from './components/house';
import Register from "./components/register";
import Login from "./components/login";
import userService from "./services/userService";
import { Navbar, Container, Nav } from 'react-bootstrap'

function App() {
  const navigate = useNavigate();
  const navigateToAddHouse = () => {
    navigate('/housing/create');
  }
  const navigateHome = () => {
    navigate('/');
  };
  const navigateToLogin = () => {
    navigate('/login')
  };
  const navigateToRegister = () => {
    navigate('/register')
  };

  return (
    <>
    <Navbar expand="lg" sticky="top" bg="dark" variant="dark" >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand onClick={navigateHome}>
            <img 
                src={require("./assets/logo.png")}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="" onClick={navigateHome}>Home</Nav.Link>
            {(userService.getCurrentUser()) ? 
              <>
              <Nav.Link aria-current='page' href='' onClick={navigateToAddHouse}>
                Adaugă anunț
              </Nav.Link>
              <Nav.Link aria-current='page' href='' onClick={userService.logOut}>
                Logout
              </Nav.Link>
              </> : 
              <>
              <Nav.Link aria-current='page' href='' onClick={navigateToLogin}>
                Login
              </Nav.Link>
              <Nav.Link aria-current='page' href='' onClick={navigateToRegister}>
                Register
              </Nav.Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/housing/create" element={<AddHouse/>}/>
      <Route path="/*" element={<Home />} />
      <Route path="/search" element={<HouseList/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/:id" element={<House/>}></Route>
    </Routes>
    </>
  )
}

export default App;
