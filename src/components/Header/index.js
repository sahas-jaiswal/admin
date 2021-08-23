import React from "react";
import Layout from '../Layout'
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions/auth.actions';
import './style.css';

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

const capitalizeFirstLetter = (string) =>{
return string. charAt(0). toUpperCase() + string. slice(1);
}

  const logout = () => {
    dispatch(signout());
  };

  return (
  <Navbar collapseOnSelect expand="lg"  className="MyNav">
      <Navbar.Brand href="#home" style={{color:"white"}}>Admin Dashboard</Navbar.Brand>
      <Navbar.Text style={{ left: "10px" ,color : "#0DB8DE"}} >
          Welcome, <h>{capitalizeFirstLetter(user.firstname)}</h> <h>{capitalizeFirstLetter(user.lastname)}</h>
    </Navbar.Text>
  <Navbar.Toggle aria-controls="responsive-navbar-nav " />
      <Navbar.Collapse id="responsive-navbar-nav ">
        
    <Nav className="justify-content-end" style={{ width: "100%" }}>
      <Nav.Link   onClick={logout} style={{color:"white"}}>Sign Out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};

export default Header;
