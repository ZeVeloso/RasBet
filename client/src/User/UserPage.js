import { useState, useEffect } from "react";
import { useRef } from "react";
import { fetchUser, sendLogin } from "../EventAPI";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./userPage.css";
import Nav from ".././App/Components/Nav";
function UserPage() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)
  const history = useNavigate()

  const handleRedirectDeposit = (event) => 
    {
      history("/deposit")
    }
    const handleRedirectConvert = (event) => 
    {
      history("/convert")
    }  
    const handleLogout = (event) => 
    {
      sessionStorage.removeItem("token")
    }
    const handleRedirectWithdraw = (event) => 
    {
      history("/withdraw")
    }
  useEffect(() => {
    fetchUser(JSON.parse(sessionStorage.getItem('token'))).then((response) => {
      setUser(response);
      console.log(response)
      setLoading(false)
    });
  }, []);


 if (loading)
 {
     return( <div>Loading ...</div>)
 }
 else
 {
    return (
        <div>
          <Nav />
    
          <div className="userContainer">
            <div className="userWrapper">
              <div className="userTop">
                <a className="userName">{user.name}</a>
                <div className="userTopWrapper">
                  <button className="userButton" onClick={handleRedirectDeposit}>Depositar</button>
                  <a className="userBalance">{user.wallet.amount} {user.wallet.currency.name} </a>
                  <button className="userButton" onClick={handleRedirectConvert}>Convert</button>
                </div>
              </div>
              <div className="userBot">
                <button className="userButton" onClick={handleRedirectWithdraw}>Withdraw</button>
                <button className="userButton">Betting History</button>
                <button className="userButton">Definitions</button>
                <button className="userButton" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      );
 }

}

export default UserPage;
