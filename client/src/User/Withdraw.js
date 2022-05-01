import { useState, useEffect } from "react";
import { useRef } from "react";
import { Converter, fetchUser, sendLogin } from "../EventAPI";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./deposit.css";
import Nav from ".././App/Components/Nav";

function Withdraw() {
  
    const moeda = useRef()

    const handleSubmit = (event) => 
    {
       const moedaInput = moeda.current.value
       Converter(JSON.parse(sessionStorage.getItem('token')), moedaInput )

        event.preventDefault()
    }

      return (
          <div>
            <Nav />
      
            <div className="depositContainer">
                <div className="depositWrapper">
                    <p className="depositLogo">WITHDRAW</p>
                    <div className="depositTop">
                        <input className="depositInput" type="text" ref={moeda} placeholder="Amount"></input>
                    </div>
                    <div className="depositBot">
                        <button className="depositButton" onClick={handleSubmit}>Withdraw</button>
                    </div>
                    
                </div>
            </div>
          </div>  
        );
   
}

export default Withdraw;
  