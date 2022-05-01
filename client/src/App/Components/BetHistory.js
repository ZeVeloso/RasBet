import "./BetHistory.css"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState, useRef } from "react"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Select from 'react-select';


function BetHistory(props ) {
    console.log(props.items)
    
    return (
    
 
       <div className='betHistoryBox'>
       <div className='betHistoryWrapper'>
           <div className='betHistoryLeft'>
               <a className="betHistoryLogo">{props.items.event.team1} vs {props.items.event.team2}</a> 
            </div>
           <div className="betHistoryMiddle">
           {(props.items.equipa_apostada == "team1") ? (<a className="betHistoryGreen">{props.items.event.team1}</a>) : <></>}
           {(props.items.equipa_apostada == "draw") ? (<a className="betHistoryGreen">Empate</a>) : <></>}
           {(props.items.equipa_apostada == "team2") ? (<a className="betHistoryGreen">{props.items.event.team2}</a>) : <></>}
               </div>    
           <div className="betHistoryRight">
               <div className='betHistoryOdd'>
                   {(props.items.equipa_apostada == "team1") ? (<a className="betHistoryLogo">odd : {props.items.event.odd1}</a>) : <></>}
                {(props.items.equipa_apostada == "draw") ? (<a className="betHistoryLogo">odd : {props.items.event.odd2}</a>) : <></>}
                {(props.items.equipa_apostada == "team2") ? (<a className="betHistoryLogo">odd : {props.items.event.odd3}</a>) : <></>}
               </div>
               <div className='betHistoryAmount'>
               {(props.items.event.status == "ended" && props.items.event.result == props.items.equipa_apostada && props.items.event.result == "team1" ) ? (<a className="betHistoryLogo">Winnings :{props.items.event.odd1 * props.items.amount}</a>) : <></>}
               {(props.items.event.status == "ended" && props.items.event.result == props.items.equipa_apostada  && props.items.event.result == "draw") ? (<a className="betHistoryLogo">Winnings :{props.items.event.odd2 * props.items.amount}</a>) : <></>}
               {(props.items.event.status == "ended" && props.items.event.result == props.items.equipa_apostada  && props.items.event.result == "team2") ? (<a className="betHistoryLogo">Winnings :{props.items.event.odd3 * props.items.amount}</a>) : <></>}
               {(props.items.event.status == "ended" && props.items.event.result != props.items.equipa_apostada ) ? (<a className="betHistoryLogo">Loss :{props.items.amount}</a>) : <></>}
               {(props.items.event.status == "ongoing" ) ? (<a className="betHistoryLogo">Ongoing</a>) : <></>}
               </div>
            </div>   
        </div>
        </div>
 
        
    );

}

export default BetHistory;