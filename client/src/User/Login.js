import {useState } from "react"
import {useRef} from 'react'
import { sendLogin } from "../EventAPI";
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import "./login.css"


function Login({setToken}) {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [flag, setFlag] = useState(false)
    const history = useNavigate()

    const handleSubmit = (event) => 
    {
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value


        sendLogin( enteredEmail, enteredPassword).then(response => setToken(response.id))
        if(JSON.parse(sessionStorage.getItem('token'))) history("/home");
     
        event.preventDefault()
    }
 
    const handleRedirect = (event) => 
    {
      history("/registar")
    }

return (      
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">RASBET</h3>
          </div>
          <div className="loginRight">
            <form className="loginBox" >
              <input className="loginInput" placeholder="Email" type="text" id="Email" ref={emailInputRef}/>
              <input className="loginInput" placeholder="Password" type="Password" id="Password" ref={passwordInputRef}/>
              <input className="loginButton" type="submit" value="Submit" onClick={handleSubmit} />
              <div className="loginOptBox">
                <button className="loginRegisterButton"  onClick={handleRedirect} >Create a new Account</button>
                <button className="loginRegisterButton">Forgot Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    
    );
}
  

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login;