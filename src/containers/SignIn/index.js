import { React, useEffect, useState } from 'react';
import logo from '../../images/lg.png'
import './style.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { Alert, Spinner } from 'react-bootstrap';



const SignIn = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.loading) {
            setUsername("");
            setPassword("");
        }
    }, [auth.loading]);


     const userLogin = (e) => {

        e.preventDefault();

        const user = {
            username, password
        }

        dispatch(login(user));
    }

    if (auth.loading) {
        return  <Spinner animation="grow" variant="info" />;
    }

    if(auth.authenticate){
        return <Redirect to={`/home`} />;
    }

    const renderError = () => {
        if (auth) {
             return <Alert variant="danger" style={{backgroundColor:"#1A2226", border:"none"}}>{(auth.error) ? (auth.error) : (auth.message)}</Alert>;
        }
        else {
            return null;
        }
    }

    return (
         <div className="container">
            <div className="row">
               
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box"> 
                        <div className="col-lg-12 logo">
                            <img className="logoimg" src={logo} alt="logo"/>
                        </div>
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>
                         {renderError()}
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={userLogin}>
                                    <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="text" className="form-control"
                                        label="UserName" value={username}
                                        onChange={(e) => setUsername(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                    <input type="password" className="form-control"
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                  </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-12 login-btm login-text"></div>
                                        <div className="col-lg-12 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>
               </div>
                <div className="col-lg-3 col-md-2"></div>  
                            
            </div>
        </div>
       
    )
}

export default SignIn;
