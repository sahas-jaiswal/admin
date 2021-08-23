import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { ButtonGroup, ToggleButton, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signup, getAllUsers } from '../../actions';
import './style.css';
 
const SignUp = (props) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => { setShow(false); getAllUsers()}

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [contact, setContact] = useState('');
    const [role, setRole] = useState('admin');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const radios = [
        { name: 'Admin', value: 'admin' },
        { name: 'Super-Admin', value: 'super-admin' },
    ];

    const auth = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user.loading) {
            setUsername("");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setconfirmPassword("")
            setContact("");
            setRole("");
    }
  }, [user.loading]);

    const userSignup = (e) => {
       
        if (confirmPassword === password) {
             const user = {
            username,
            firstname,
            lastname,
            email,
            password,
            contact,
            role,
        };

        dispatch(signup(user));
        
        } else {
            user.error="Password doesn't match."
            renderError()
        }
       
         e.preventDefault();
    };

    if (user.loading) {
        return  <Spinner animation="grow" variant="info" />;
    }

    const renderMessage = () =>{
        return <Alert variant="success" style={{ backgroundColor: "#1A2226", border: "none" }}>{user.message}</Alert>;
       
    }

    const renderError = () =>{
        return <Alert variant="danger" style={{backgroundColor:"#1A2226", border:"none"}}>{user.error}</Alert>;
    }

   

    return (


        <div>
            <Button className="BtnReg" onClick={handleShow}>
                Register New
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} className="myModal">
                <Modal.Header closeButton>
                    <Modal.Title className="login-title">Register New Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                {(user.message)?renderMessage():renderError()}
                    <form >
                        <div className="form-group">
                            <label className="form-control-label">USERNAME</label>
                            <input type="text" className="form-control"
                                label="UserName" value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">FIRSTNAME</label>
                            <input type="text" className="form-control"
                                label="FirstName" value={firstname}
                                onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">LASTNAME</label>
                            <input type="text" className="form-control"
                                label="LastName" value={lastname}
                                onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">EMAIL</label>
                            <input type="email" className="form-control"
                                label="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="form-control-label">PASSWORD</label>
                            <input type="password" className="form-control"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="form-control-label">CONFIRM PASSWORD</label>
                            <input type="password" className="form-control"
                                label="ConfirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setconfirmPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">CONTACT</label>
                            <input type="text" className="form-control"
                                label="Contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="form-control-label">ROLE</label>

                            <ButtonGroup toggle>
                                {radios.map((radio, idx) => (
                                    <ToggleButton className="toggleBtn"
                                        key={idx}
                                        type="radio"
                                        variant="outline-secondry"
                                        name="radio"
                                        value={radio.value}
                                        onChange={(e) => setRole(e.currentTarget.value)}>
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                             
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="col-lg-12 loginbttm">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button type="submit" className="btn btn-outline-primary" onClick={userSignup}>REGISTER</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUp