import { useEffect, useState, useRef } from "react"
import '../App.css';
import { addCurrency } from "../EventAPI";
import {useNavigate} from "react-router-dom";
import "./CurrencyList.css"

function CurrencyList(props) {

    const nameInputRef = useRef();
    const history = useNavigate();

    const handleSubmit = (event) => 
    {
        const enteredName = nameInputRef.current.value
        console.log(enteredName)
        addCurrency(enteredName)
        event.preventDefault()
    }

    const Edit = (id) =>{
      history(`/managecurrencies/${id}`)
    }

  return (
      
    <div className="currencyBox">
       <div className='currencyLeftBox'>
        {props.items.map((item, index) => (
            <div className='currencyLeftBoxWrapper'>
              <p className="currencyLogo">{item.name}</p>
              <button className="currencyButton" onClick={() => Edit(item.id)}> Editar Taxas</button>
            </div>
        ))}
        </div>
       
            <form className='currencyRightBox'>
              <p className="currencyLogo">Insert new coin</p>
              <div className="currencySubmitBox">
                <input  className="currencyInput" placeholder="Currency" type="text" id="Email" ref={nameInputRef}/>
                <input className="currencyButton" type="submit" value="Submit" onClick={handleSubmit} />
              </div>
              
            </form>
               
    </div>
  );
}

export default CurrencyList;
