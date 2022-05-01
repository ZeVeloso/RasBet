import { useEffect, useState } from "react"
import './App.css';
import {fetchEvents} from './EventAPI'
import Events from "./Events";
import Registar from "./User/Registar"
import Login from "./User/Login";
import Deposit from "./User/Deposit";
import Convert from "./User/Convert";
import Withdraw from "./User/Withdraw";
import Main from "./App/Main";
import Mybet from "./App/Mybet";
import UserPage from "./User/UserPage"
import Currency from "./Admin/Currency";
import CurrencyPage from "./Admin/CurrencyPage";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import useToken from './User/useToken'

function App() {

  const { token, setToken } = useToken();

   //if(!JSON.parse(sessionStorage.getItem('token'))) {
   //  <Login setToken={setToken} />
   //}

return(

<BrowserRouter>
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/home" element={<Main/>}></Route>
        <Route path="/mybets" element={<Mybet/>}></Route>
        <Route path="/user" element={<UserPage/>}></Route>
        <Route path="/deposit" element={<Deposit/>}></Route>
        <Route path="/convert" element={<Convert/>}></Route>
        <Route path="/withdraw" element={<Withdraw/>}></Route>
        <Route path="/registar" element={<Registar/>}></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
        <Route path="/managecurrencies" element={<CurrencyPage/>}> </Route>
        <Route path="/managecurrencies/:currencyId" element={<Currency/>}> </Route>
      </Routes>
    </BrowserRouter>

)
}

export default App;
