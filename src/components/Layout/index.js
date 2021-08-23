import React from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import '../Layout/style.css';
import { FiHome, FiGrid, FiUsers, FiFileText, FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const renderSuperAdminLink = () => {
    return (
      <ul>
        <Link to={'/home'}><li><FiHome /><a>Home</a></li></Link>
        <Link to={'/admins'}><li><FiUsers /><a>Admins</a></li></Link>
        <Link to={'/article'}><li><FiFileText /><a>Article</a></li></Link>
        <Link to={'/category'}><li><FiGrid /><a>Category</a></li></Link>
      </ul>
    );
  };

  const renderAdminLink = () => {
    return (
      <ul>
        <Link to={'/home'}><li><FiHome /><a>Home</a></li></Link>
        <Link to={'/article'}><li><FiFileText /><a>Article</a></li></Link>
      </ul>
    );
  };


  return(
    <>
      <Header />
      {
        props.sidebar ?
          <>
            
              <Container fluid>
              <Row>
               
                <Col md={2} className="sidebar">
                   
                  {(user.role === "super-admin")? renderSuperAdminLink() : renderAdminLink() }
                </Col>
                <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                  {props.children}
                </Col>
              </Row>
            </Container>
            
  
          </>
          :
          props.children
      }


    </>
   )

 }

export default Layout;