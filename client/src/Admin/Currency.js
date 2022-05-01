import { useEffect, useState, useRef } from "react"
import '../App.css';
import { addChange, fetchChanges, fetchCurrencies } from "../EventAPI";
import { useParams } from "react-router-dom";
import './Currency.css'
import Nav from '.././App/Components/Nav';
function Currency(props) {

    const taxaInputRef = useRef();
    const nameInputRef = useRef();
    
    const { currencyId } = useParams();

    const [currencies, setCurrencies] = useState([]);
    const[changes, setChanges] = useState([])
    const [isLoading, setLoading] = useState(true)
  
    useEffect(()=>
    {
        fetchChanges(currencyId).then(response => {
      setChanges(response)
      console.log(response)
      setLoading(false);
    }).then(fetchCurrencies().then(response => { setCurrencies(response)} ));   
    }, [])


    const add = (event) =>{
        const taxa = taxaInputRef.current.value
        const name = nameInputRef.current.value
        addChange(currencyId, taxa, name).then(console.log("added"));
        event.preventDefault();
    }

  if (isLoading)
  {
    return (<div>Loading...</div>)
  }
  else
  {
    return (
      <div>
        <Nav></Nav>
        <div className="homeCurrencyBox">
        {/* <CurrencyList items={currencies}></CurrencyList> */}
          <div className="currencyLeftBox">
            <div className="currencyWrapper1">
              <h3 className="currencyTaxLogo">Conversion rate</h3>
              {changes.map((item, index) => (
                  <p className='currencyTaxText'>* {item.taxa} = {item.currency.name}</p>
              ))}
            </div>
             

          </div>
         
          <form className="currencyRightBox">
         
            <div className="currencyWrapper2">
              <h3 className="currencyTaxLogo">Add Conversion rate</h3>
              <input className="currencyTaxInput" placeholder='Rate' ref={taxaInputRef}/>
              <input className="currencyTaxInput" placeholder='Coin'ref={nameInputRef}/>
              <input className="currencySubmitButton" type="submit" value="Submit" onClick={add} />
            </div>  
          </form>
       </div>
       </div>
      
      );
  }
}

export default Currency;