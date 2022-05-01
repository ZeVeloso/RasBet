import { useState, useEffect } from "react";
import { useRef } from "react";
import { Depositar, fetchUser, sendLogin } from "../EventAPI";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./deposit.css";
import Nav from ".././App/Components/Nav";

function Deposit() {

    const amount = useRef()
    const moeda = useRef()
  
    const handleSubmit = (event) => 
    {
        const moedaInput = moeda.current.value
        const amountInput = amount.current.value

        Depositar(JSON.parse(sessionStorage.getItem('token')), amountInput, moedaInput )

        event.preventDefault()
    }

      return (
          <div>
            <Nav />
      
            <div className="depositContainer">
                <div className="depositWrapper">
                    <p className="depositLogo">DEPOSIT</p>
                    <div className="depositTop">
                        <input className="depositInput" type="number" ref={amount} placeholder="Amount"></input>
                        <input className="depositInput" type="text" ref={moeda} placeholder="Moeda"></input>
                    </div>
                    <div className="depositBot">
                        <button className="depositButton" onClick={handleSubmit}>Deposit</button>
                    </div>
                    
                </div>
            </div>
          </div>  
        );
   
}

export default Deposit;
  