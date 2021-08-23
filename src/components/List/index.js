import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';


const renderUserList = (myList) => {


  const render = (users) => {
      
        for (let user of users)
        {
          <tr>
          <th><FiEdit /><FiTrash2 /></th>
              <th>{user.username}</th>
              <th>{user.firstname}</th>
              <th>{user.lastname}</th>
              <th>{user.email}</th>
              <th>{user.email}</th>
              <th>{user.contact}</th>
            </tr>
            }
    }
    
    return (
        <div>
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
          <tbody>
            {render(myList)}
          </tbody>
        </Table>
      </Card.Body>
    </Card >
        </div>
    )
}

export default renderUserList;
