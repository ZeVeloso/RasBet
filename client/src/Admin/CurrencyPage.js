import { useEffect, useState } from "react"
import '../App.css';
import {fetchCurrencies} from '../EventAPI'
import CurrencyList from "./CurrencyList";
import "./CurrencyPage.css"
import Nav from '.././App/Components/Nav';

function CurrencyPage() {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setLoading] = useState(true)

useEffect(()=>
{
  fetchCurrencies().then(response => {
    setCurrencies(response)
    setLoading(false);
  });   
}, [])


if (isLoading) {
    return <div className="App">Loading...</div>;
}
  
  
return (
  <div>
    <Nav isAdmin={true}></Nav>
    <div className=".homeCurrencyContainer">
      <CurrencyList items={currencies}></CurrencyList>
    </div>
    </div>
     
    );
}
  
export default CurrencyPage;
  