import "./Nav.css"
import {useNavigate} from "react-router-dom";
import {fetchEvents, checkAdmin} from '../.././EventAPI';
import { useEffect, useState } from "react"
import { fetchUser, sendLogin } from "../.././EventAPI";
function Nav(props) {

    const isLoggedIn = JSON.parse(sessionStorage.getItem('token'));
    const history = useNavigate()
    const [user, setUser] = useState();
    const [isLoading, setLoading] = useState(true)
    const[isAdmin, setAdmin] = useState(false)
    
    useEffect(() => {
     
      fetchUser(JSON.parse(sessionStorage.getItem('token'))).then((response) => {
        setUser(response);
        console.log(response)
        setLoading(false)
      });
    }
    setLoading(false)
  }, []);
  
    const handleRedirect = (event) => 
    {
      history("/home")
    }
    const handleRedirect1 = (event) => 
    {
      history("/user")
    }
    const handleRedirect2 = (event) => 
    {
      history("/managecurrencies")
    }

    const handleRedirectMybets = (event) => 
    {
      history("/mybets")
    }
console.log(isLoggedIn)
    if (isLoading) {
      return <div className="homeContainer">Loading...</div>;
    }
    return (
      <div>
        <nav className="navbar">
      
        <div className="logo" onClick={handleRedirect}>RasBet</div>
        
        <ul className="nav-links">
        {(isLoggedIn != null) ? (
        
        <div className="menu">
            <li ><a onClick={handleRedirectMybets}>My Bets</a></li>
            {isAdmin && <li>
              
                <a onClick={handleRedirect2}>Currencies</a>
             
            </li>}
            {(user != null) ? <li><a >{user.wallet.amount} {user.wallet.currency.name}</a></li> : <></>}
            {(user!= null) ? <li><a onClick={handleRedirect1}>{user.name}</a></li> : <></>}

    
            </div>) :  
        <div className="menu">
            <li><a href="/">Competitions</a></li>
            <li><a href="/">Sports</a></li>
            <li><a href="/">My Bets</a></li>
           
            <li><a href="/login">Login</a></li>
            <li><a href="/registar">Registar</a></li>
           
           
            </div>
        }
        </ul>
        </nav>
    </div>  
        
    );

}

export default Nav;