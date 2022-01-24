import Header from "./components/Header";
import Store from "./components/Store";
import Purchases from "./components/Purchases";
import Inventory from "./components/Inventory";
import Footer from "./components/Footer";
import Trades from "./components/Trades";
import { NavigationMenu } from "./components/NavigationMenu";
import { useState } from "react";
import { Modal } from "react-bootstrap"
import { FaStepBackward, FaKey, FaUserAlt, FaAddressCard} from "react-icons/fa"
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import jwt from 'jwt-decode';

function App() {

  // API URL
  const apiURL = 'https://martynasdrestapi.azurewebsites.net/api'

  // Show LOGIN modal state
  const [showLogin, setShowLogin] = useState(false)

  // Show REGISTER modal state
  const [showRegister, setShowRegister] = useState(false)

  // LOGIN variables
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // REGISTER variables
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerRepeatPassword, setRegisterRepeatPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')

  // Error variables
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('')

   // Show LOGIN form handler
  const handleShowLogin = () => {
    if(showLogin || showRegister) return;
    setShowLogin(true);
  }

  // Close LOGIN form handler
  const handleCloseLogin = () => setShowLogin(false);

  // Show REGISTER form handler
  const handleShowRegister = () => {
    if(showLogin || showRegister) return;
    setShowRegister(true);
  }

  
  // Close REGISTER form handler
  const handleCloseRegister = () => setShowRegister(false);

  // Login logic handling
  const handleLogin = async (e) => {

      e.preventDefault();

      if(loginUsername === '' || loginUsername === undefined) {
        setLoginError('Login username field cannot be empty.')
        return;
      }

      if(loginPassword === '' || loginPassword === undefined) {
        setLoginError('Login password field cannot be empty.')
        return;
      }

      let loginInfo =  {
        username:`${loginUsername}`,
        password:`${loginPassword}`
      };
      const data = await login(loginInfo);
      if(data === '') return;
      
      let decodedToken = jwt(data["accessToken"]);
      localStorage.setItem('token', data["accessToken"]);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      localStorage.setItem('userId', decodedToken["userId"]);
      localStorage.setItem('rolesTemp', decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      const roles = localStorage.getItem('rolesTemp');
      console.log(roles.length);
      if(roles.length === 18) {
        localStorage.setItem('role', 'Customer');
      }
      else {    
        localStorage.setItem('role', 'Admin');
      }
        
      console.log(localStorage.getItem('role'));
      setShowLogin(false);
      window.location.reload(false);
  }


  // Login API request
  const login = async (loginJSON) => {
    const res = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(loginJSON),
    })
    .catch(error => {
      setLoginError('Invalid credentials');
      return '';
    });
      
    if(res.status === 400) {
      setLoginError('Invalid credentials');
      return '';
    }

    const data = await res.json();

    return data;
    
  }

  // Register API request
  const register = async (registerJSON) => {
    const res = await fetch(`${apiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(registerJSON),
    })
    .catch(error => {
      console.log("BAD URL");
      setRegisterError('Registration failed.');
      return '';
    });
      
    if(res.status === 400) {
      console.log(res.json());
      setRegisterError('Registration failed.');
      return '';
    }

    const data = await res.json();

    return data;
    
  }

    // Register handling
    const handleRegister = async (e) => {

      e.preventDefault();

      if(registerUsername === '' || registerUsername === undefined) {
        setRegisterError('Register username field cannot be empty.')
        return;
      }

      if(registerPassword === '' || registerPassword === undefined) {
        setRegisterError('Register password field cannot be empty.')
        return;
      }

      if(registerRepeatPassword === '' || registerRepeatPassword === undefined) {
        setRegisterError('Register repeat password field cannot be empty.')
        return;
      }

      if(registerEmail === '' || registerEmail === undefined) {
        setRegisterError('Register email field cannot be empty.')
        return;
      }

      if(registerRepeatPassword !== registerPassword) {
        setRegisterError('Passwords must match.')
        return;
      }

      let registerInfo =  {
        username:`${registerUsername}`,
        password:`${registerPassword}`,
        email:`${registerEmail}`
      };
      const data = await register(registerInfo);
      console.log(data);
      if(data === '') return;

      setShowRegister(false);
      alert("Registration successful!");

  }
 


  return (

    <div>
     <Header onLoginPress={() => handleShowLogin()} onRegisterPress={() => handleShowRegister()}></Header>

<Modal show={showLogin} onHide={handleCloseLogin}>
<Modal.Header>
<Modal.Title>Login</Modal.Title>
</Modal.Header>
<Modal.Body>
        <form onSubmit={handleLogin}>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaUserAlt></FaUserAlt></span>
						</div>
						<input id="login_username" type="text" className="form-control" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)}/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaKey></FaKey></span>
						</div>
						<input id="login_password" type="Password" className="form-control" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}/>
					</div>
          <button className='btn' type='submit' >Login</button>
				</form>
        </Modal.Body>
<Modal.Footer>
 <h4 className="error-msg">{loginError}</h4>
<button className='btn' style={{backgroundColor:'red'}} onClick={handleCloseLogin}>Cancel</button>
</Modal.Footer>
</Modal>

<Modal show={showRegister} onHide={handleCloseRegister}>
<Modal.Header>
<Modal.Title>Register</Modal.Title>
</Modal.Header>
<Modal.Body>
<form onSubmit={handleRegister}>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaUserAlt></FaUserAlt></span>
						</div>
						<input id="register_username" type="text" className="form-control" placeholder="Username" onChange={(e) => setRegisterUsername(e.target.value)}/>
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaKey></FaKey></span>
						</div>
						<input id="register_password" type="Password" className="form-control" placeholder="Password"
            pattern="[A-Za-z0-9!@?]+" minLength="6" title="Must contain at least one number and one uppercase and lowercase letter, a special character and be at least 6 or more characters"
            onChange={(e) => setRegisterPassword(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaStepBackward></FaStepBackward></span>
						</div>
					  <input id="register_repeat_password" type="Password" className="form-control" placeholder="Repeat password"
            pattern="[A-Za-z0-9!@?]+" minLength="6" title="Must contain at least one number and one uppercase and lowercase letter, a special character and be at least 6 or more characters"
            onChange={(e) => setRegisterRepeatPassword(e.target.value)}/>
					</div>
          <div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><FaAddressCard></FaAddressCard></span>
						</div>
					  <input id="register_email" type="Email" className="form-control" placeholder="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}/>
					</div>
          <button className='btn' type='submit'>Register</button>
				</form>
</Modal.Body>
<Modal.Footer>
<h4 className="error-msg">{registerError}</h4>
<button className='btn' style={{backgroundColor:'red'}} onClick={handleCloseRegister}>Cancel</button>
</Modal.Footer>
</Modal>

<Router>
  {localStorage["isLoggedIn"] === undefined || localStorage["isLoggedIn"] === false ? <></> : <NavigationMenu/> }
<Routes>
    <Route exact path="/" element={<Store/>}>
    </Route>
    <Route path="/purchases" element={<Purchases/>}>
    </Route>
    <Route path="/inventory" element={<Inventory/>}>
    </Route>
    <Route path="/trades" element={<Trades/>}>
    </Route>
</Routes>
</Router>
  <Footer/>
    </div>
  );
}


export default App;
