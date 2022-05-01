import {useState } from "react"
import {useRef} from 'react'
import { sendRegistar } from "../EventAPI";
import {useNavigate} from "react-router-dom";
import "./Registar.css"

function Registar() {

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    const checkBoxRef = useRef();
    var checkBox=true;
    const history = useNavigate()

    const handleSubmit = (event) => 
    {
        const enteredName = nameInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const passwordConfirm = passwordConfirmInputRef.current.value
        checkBox = checkBoxRef.current.checked
        if (passwordConfirm==enteredPassword && checkBox==true){
          sendRegistar(enteredName, enteredEmail, enteredPassword)
          history("/login")
        }
        else {
          console.log("Nao logado")
        }
        event.preventDefault()
        
    }

    const handleRedirect = (event) => 
    {
      history("/registar")
    }

return (
  <div className="login">
  <div className="loginWrapper">
    <div className="loginRight">
      <form className="loginBox" >
          <h1 className="loginLabel">SIGN UP</h1>
        <div className="registerTop">
          <input className="loginInput" placeholder="Name" type="text" id="name" ref={nameInputRef}/>
          <input className="loginInput" placeholder="Email" type="text" id="Email" ref={emailInputRef}/>
        </div>
        <div className="registerBot">
          <input className="loginInput" placeholder="Password" type="Password" id="Password" ref={passwordInputRef}/>
          <input className="loginInput" placeholder="Confirm Password" type="Password" id="ConfirmPassword" ref={passwordConfirmInputRef}/>
        </div>  
        <div className="registerTickBox">
          <input className="registerCheckBox" type = "checkbox" id = "termsCheckBox" name = "termsCheckBox" ref={checkBoxRef}/>
          <label className="registerCheckBox" htmlFor = "termsCheckBox"> I agree with terms of use and privacy </ label>
        </div> 
        <input className="loginButton" type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  </div>
</div>
    );
}
  
export default Registar;
  