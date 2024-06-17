import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from '../Sidebar';

const GlobalStyle = createGlobalStyle`
  #root {
    display: ${(props) => (props.isLoggedIn ? 'flex' : 'block')};
    flex-direction: ${(props) => (props.isLoggedIn ? 'row' : null)};
  }
`;

export default function Menu() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <GlobalStyle isLoggedIn={isLoggedIn} />
      {!isLoggedIn ? (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container className="d-flex me-auto">
            <Navbar.Brand href="#home">Advogados Inc</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="d-flex gap-3 w-100 justify-content-end">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Cadastrar-se
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Sidebar />
      )}
    </div>
  );
}
