import React, {useEffect, useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "./../../assets/images/logo_11.png";
import HeaderBG from "./../../assets/images/header-bg.png";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../hooks/useAuth.js";
import "./header.css";

const Header = () => {
  const { AllContexts } = useAuth();
  const { user, logOut, isAdmin } = AllContexts;
  const { displayName, photoURL, email } = user;

  console.log(user);


  return (
    <div className="">
      <Navbar style={{ background: '#F5F5F5' }} expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} className="text-white" to="/home">
            <img width="100px" height="50px" src={logo} alt="Logo" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={NavLink} to="/home" className="text-dark">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/about" className="text-dark">
                About
              </Nav.Link>

              <Nav.Link as={NavLink} to="/contact" className="text-dark">
                Contact
              </Nav.Link>
              <Nav.Link as={NavLink} to="/courses" className="text-dark">
                Explore
              </Nav.Link>
              <Nav.Link as={HashLink} to="/home#feature" className="text-dark">
                Feature Services
              </Nav.Link>

              {displayName==null ? (
                <>
                  <Nav.Link as={NavLink} to="/signup" className="text-dark">
                    Sign Up
                  </Nav.Link>

                  <Nav.Link className="text-dark" as={NavLink} to="/login">
                    Log in
                  </Nav.Link>
                </>
              ) : (
                <>
                  {
                    isAdmin===true ? '' :
                        <Nav.Link
                        as={HashLink}
                        to="/dashboard"
                        className="text-dark"
                    >
                      Dashboard
                    </Nav.Link>
                  }


                  <NavDropdown
                    title={
                      displayName
                      // <img
                      //   style={{
                      //     width: "45px",
                      //     borderRadius: "50%",
                      //   }}
                      //   src={photoURL}
                      //   alt=""
                      // />
                    }
                  >
                    <div className="text-center">
                      <h6>{displayName}</h6>
                      <p className="m-0 mb-2">{email}</p>
                      <button onClick={logOut} className="btn btn-primary">
                        Sign Out
                      </button>
                    </div>
                  </NavDropdown>
                </>
              )}
              {isAdmin===true
                ?
                <Nav.Link as={HashLink} to="/admin" className="text-dark">
                Admin Panel
                </Nav.Link> : ''}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
