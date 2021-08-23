import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout';
import './style.css';
import SignUp from '../SignUp/index';
import { Button, Card, Table, Accordion,Spinner, Modal, Alert } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/auth.actions';
import { deleteUser } from '../../actions/user.actions'
 
const Admins = (props) => {
  
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState("");
  

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  
  useEffect(() => {
      dispatch(getAllUsers());
  },[]);

  const token = window.localStorage.getItem('token');
  if(!token){
    return  <Redirect to={`/`} />;
  }
    
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role === "admin") {
    return <Redirect to={`/home`} />;
  }
  

  
  if (auth.loading) {
    return <Spinner animation="grow" variant="info" />;
  }

 
  let list = [];
  
  if (auth.users) {
    list= auth.users
  }

  const editFunction = () => {
    dispatch()
  }

   const deleteFunction = (data) => {
     setShow(true);
     setItem(data);
  }
  
  

    return (
      <div className="AdminsPanel">
        <Layout sidebar>
          <SignUp />
           
            <Card className="MyCard">
              <Card.Header>
                <Card.Title tag="h4" style={{ color: "white" }}>All Admins</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="tablesorter" responsive>
                  <thead style={{ color: "#0DB8DE" }}>
                    <tr>
                      <th>Action</th>
                      <th>Username</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <thead style={{ color: "#6C6C6C" }}>
                    {Object.keys(list).map((k, i) => {
                      let data = list[k];
                      return (
                        <tr key={i}>
                          <th><FiEdit className="Edit" /> <FiTrash2 className="Trash" onClick={() => deleteFunction(data)}/></th>
                          <td>{data.username}</td>
                          <td>{data.firstname}</td>
                          <td>{data.lastname}</td>
                          <td>{data.email}</td>
                          <td>{data.role}</td>
                          <td>{data.contact}</td>
                        </tr>
                      );
                    })}
                  </thead>
                </Table>
              </Card.Body>
          </Card >
           <Modal
           show={show}
           onHide={handleClose}
           backdrop="static"
           keyboard={false}
         >
           <Modal.Header closeButton>
             <Modal.Title className="login-title">Alert</Modal.Title>
           </Modal.Header>
           <Modal.Body  style={{fonntWeight: "30px", color:"#6C6C6C"}}>
              Are you sure you want to delete "{item.firstname} { item.lastname}"
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
               Close
              </Button>
              <Button variant="danger" onClick={() => { dispatch(deleteUser(item.id)); handleClose(); dispatch(getAllUsers()) }}>Delete</Button>
           </Modal.Footer>
         </Modal>
         
        </Layout>
        
      </div>
    )
}

export default Admins