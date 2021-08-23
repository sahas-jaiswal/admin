import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Category from './containers/Category';
import Article from './containers/Article';
import Admins from './containers/Admins';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/index';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    
  }, [auth.authenticate]);

  
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact component={SignIn} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/article" component={Article}/>
          <Route path="/admins" component={Admins}/>
        
        </Switch>
      
      
     
    </div>
      
  );
}

export default App;
