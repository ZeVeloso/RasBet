import "./Bet.css"
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState, useRef } from "react"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Select from 'react-select';
import { addBet, addResultado, updateOdds } from "../../EventAPI";
function Bet( props) {

    const amountInputRef = useRef();
    const oddTeam1ChangeRef = useRef();
    const oddDrawChangeRef = useRef();
    const oddTeam2ChangeRef = useRef();
    const [currentAlignment, setCurrentAlignment] = useState(props.bet.id);
    const [currentAlignmentWinner, setCurrentAlignmentWinner] = useState(props.bet.id);
    //console.log(currentAlignment);

    const handleSubmit = (event) => 
    {
        const enteredAmount = amountInputRef.current.value

        addBet( enteredAmount, currentAlignment, JSON.parse(sessionStorage.getItem('token')), props.bet.id).then()

        // console.log(currentAlignment)

        event.preventDefault()
    }

    const handleSubmitAdmin = (id) => 
    {

        console.log(currentAlignmentWinner)
        addResultado(id, currentAlignmentWinner)
        //const enteredAmount = amountInputRef.current.value

        //addBet( enteredAmount, currentAlignment, JSON.parse(sessionStorage.getItem('token')), props.bet.id).then()

        // console.log(currentAlignment)

        //event.preventDefault()
    }

    const handleUpdate = (id) => 
    {

        const odd1Input = oddTeam1ChangeRef.current.value
        const odd2Input = oddDrawChangeRef.current.value
        const odd3Input = oddTeam2ChangeRef.current.value
        updateOdds(id, odd1Input, odd2Input, odd3Input)
        //addResultado(id, currentAlignmentWinner)
        //const enteredAmount = amountInputRef.current.value

        //addBet( enteredAmount, currentAlignment, JSON.parse(sessionStorage.getItem('token')), props.bet.id).then()

        // console.log(currentAlignment)

        //event.preventDefault()
    }


    return (
        <div>
        {((props.bet.status) == 'ongoing') ? (<div className="betBox">
           
        <div className="betWrapper">
            { (props.bet.sport==='soccer') ? (
                <div className="betLeft">
                    <SportsSoccerIcon color='warning'/> 
                    <p className='betText'>{props.bet.status}</p>
                </div>) : <div className="betLeft">{props.bet.sport}</div> }
           

            {!props.isAdmin && <div className="betMiddle">
                <ToggleButtonGroup className="betWrapper2" fullWidth value={currentAlignment} onChange={(event, newAlignment) => {setCurrentAlignment(newAlignment);}} exclusive>
                    <ToggleButton className="betButton"  size="small" value={"team1"} aria-label="HOME">{props.bet.team1} - {props.bet.odd1}</ToggleButton>
                    <ToggleButton className="betButton"  size="small" value={"draw"} aria-label="DRAW">DRAW - {props.bet.odd2}</ToggleButton>
                    <ToggleButton className="betButton"  size="small" value={"team2"} aria-label="AWAY">{props.bet.team2} - {props.bet.odd3}</ToggleButton>
                </ToggleButtonGroup>
            </div>}
               
               {/* OMITIR CASO SEJA ADMIN */}
            {!props.isAdmin &&<div className="betRight">
                <div className="betWrapper3">
                   
                    <input className="betInput" type="number" placeholder="Amount" ref={amountInputRef}></input>
                    <button className="betButton" onClick={handleSubmit}>BET</button>
                </div>
              
            </div>}
             
            {/* CASO SEJA ADMIN PODE SIMPLESMENTE EDITAR - INSERIR BOTÃO PARA EDITAR OU EDITAR "INLINE" - CAIXA DE TEXTO PARA CADA ODD E BOTÃO PARA TERMINAR EVENTO*/}

            {props.isAdmin && <div className="betMiddle">
                <ToggleButtonGroup className="betWrapper2" fullWidth value={currentAlignmentWinner} onChange={(event, newAlignmentWinner) => {setCurrentAlignmentWinner(newAlignmentWinner);}} exclusive>
                    <ToggleButton className="betButton"  size="small" value={"team1"} aria-label="HOMEW">{props.bet.team1} - {props.bet.odd1}</ToggleButton>
                    <ToggleButton className="betButton"  size="small" value={"draw"} aria-label="DRAWW">DRAW - {props.bet.odd2}</ToggleButton>
                    <ToggleButton className="betButton"  size="small" value={"team2"} aria-label="AWAYW">{props.bet.team2} - {props.bet.odd3}</ToggleButton>
                </ToggleButtonGroup>
            </div>}
               

            {props.isAdmin && <div className="betRight">
            <div className="betWrapper3">
                    <input className="betInput" type="text" placeholder="1" defaultValue={props.bet.odd1} ref={oddTeam1ChangeRef}></input>
                    <input className="betInput"  placeholder="D" defaultValue={props.bet.odd2} ref={oddDrawChangeRef}></input>
                    <input className="betInput"  placeholder="2" defaultValue={props.bet.odd3} ref={oddTeam2ChangeRef}></input>
                    <button className="betButton" onClick={() => handleUpdate(props.bet.id)}>Atualizar</button>
                    <button className="betButton" onClick={() => handleSubmitAdmin(props.bet.id)}>OK</button>
                    </div>
                </div>}
        </div> 


        
    </div>) : (!((props.bet.status) == 'ongoing') && props.isAdmin) ? (<div className="betBox">
           
           <div className="betWrapper">
               { (props.bet.sport==='soccer') ? ( 
                    <div className="betLeft">
                        <SportsSoccerIcon color='warning'/> 
                        <p className='betText'>{props.bet.status}</p>
                    </div>) : <div className="betLeft">{props.bet.sport}</div> }
              
   
               {!props.isAdmin && <div className="betMiddle">
                   <ToggleButtonGroup className="betWrapper2" fullWidth value={currentAlignment} onChange={(event, newAlignment) => {setCurrentAlignment(newAlignment);}} exclusive>
                       <ToggleButton className="betButton"  size="small" value={"team1"} aria-label="HOME">{props.bet.team1} - {props.bet.odd1}</ToggleButton>
                       <ToggleButton className="betButton"  size="small" value={"draw"} aria-label="DRAW">DRAW - {props.bet.odd2}</ToggleButton>
                       <ToggleButton className="betButton"  size="small" value={"team2"} aria-label="AWAY">{props.bet.team2} - {props.bet.odd3}</ToggleButton>
                   </ToggleButtonGroup>
               </div>}
                  
                  {/* OMITIR CASO SEJA ADMIN */}
               {!props.isAdmin &&<div className="betRight">
                   <div className="betWrapper3">
                      
                       <input className="betInput" type="number" placeholder="Amount" ref={amountInputRef}></input>
                       <button className="betButton" onClick={handleSubmit}>BET</button>
                   </div>
                 
               </div>}
                
               {/* CASO SEJA ADMIN PODE SIMPLESMENTE EDITAR - INSERIR BOTÃO PARA EDITAR OU EDITAR "INLINE" - CAIXA DE TEXTO PARA CADA ODD E BOTÃO PARA TERMINAR EVENTO*/}
   
               {props.isAdmin && <div className="betMiddle">
                   <ToggleButtonGroup className="betWrapper2" fullWidth value={currentAlignmentWinner} onChange={(event, newAlignmentWinner) => {setCurrentAlignmentWinner(newAlignmentWinner);}} exclusive>
                       <ToggleButton className="betButton"  size="small" value={"team1"} aria-label="HOMEW">{props.bet.team1} - {props.bet.odd1}</ToggleButton>
                       <ToggleButton className="betButton"  size="small" value={"draw"} aria-label="DRAWW">DRAW - {props.bet.odd2}</ToggleButton>
                       <ToggleButton className="betButton"  size="small" value={"team2"} aria-label="AWAYW">{props.bet.team2} - {props.bet.odd3}</ToggleButton>
                   </ToggleButtonGroup>
               </div>}
                  
   
               {props.isAdmin && <div className="betRight">
               <div className="betWrapper3">
               <input className="betInput"  placeholder="1" defaultValue={props.bet.odd1} ref={oddTeam1ChangeRef}></input>
                    <input className="betInput"  placeholder="D" defaultValue={props.bet.odd2} ref={oddDrawChangeRef}></input>
                    <input className="betInput"  placeholder="2" defaultValue={props.bet.odd3} ref={oddTeam2ChangeRef}></input>
                       <button className="betButton" onClick={() => handleUpdate(props.bet.id)}>Atualizar</button>
                       <button className="betButton" onClick={() => handleSubmitAdmin(props.bet.id)}>OK</button>
                       </div>
                   </div>}
           </div> 
   
   
           
       </div>) : <></>}
      

    </div>
        
    );

}

export default Bet;