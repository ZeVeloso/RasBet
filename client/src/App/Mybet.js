import "./mybet.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Select from "react-select";
import Nav from "./Components/Nav";
import BetHistory from "./Components/BetHistory";
import { useNavigate } from "react-router-dom";
import { fetchApostas } from "../EventAPI";

function Mybet() {
  const history = useNavigate();
  const [resources, setResources] = useState([]);
  const [isLoading, setLoading] = useState(true);
  

  useEffect(() => {

    if (JSON.parse(sessionStorage.getItem("token")) == null) {
      console.log("Not logged in");
      history("/");
    }
    console.log("fetching");
    fetchApostas(JSON.parse(sessionStorage.getItem("token"))).then(
      (response) => {
        setResources(response);
        setLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return(<div>Loading ...</div>);
  } else {
    return (
      <div>
        <Nav></Nav>

        <div className="homeContainer">
        <ul>
          {resources.map((item, index) => (
            <li>              
                <BetHistory items={item}></BetHistory>
            </li>
          ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Mybet;
