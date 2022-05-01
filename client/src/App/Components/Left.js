import { useRef } from "react";
import { addEvento, fetchAPI } from "../../EventAPI";
import "./Left.css"

function Left(props) {

    const team1 = useRef()
    const team2 = useRef()
    const tipo = useRef()
    const odd1 = useRef()
    const oddDraw = useRef()
    const odd2 = useRef()

    const submit = () => {

        const team1Input = team1.current.value
        const team2Input = team2.current.value
        const tipoInput = tipo.current.value
        const odd1Input = odd1.current.value
        const oddDrawInput = oddDraw.current.value
        const odd2Input = odd2.current.value

        addEvento(team1Input, team2Input, tipoInput, odd1Input, oddDrawInput, odd2Input)

    }
    const submit2 = () => {

        fetchAPI()

    }


    return (
      <div className="left">
        {props.isAdmin && <div className="leftWrapper">
            <h3 className="textLogo">Add Events</h3>
            <div className="leftCampWrapper">
                <input className="partidaInput" type="text" ref={team1} placeholder="Team1"></input>
                <input className="partidaInput" type="text" ref={team2} placeholder="Team2"></input>
                <input className="partidaInput" type="text" ref={tipo} placeholder="Tipo" ></input>
            </div>
            <div className="leftCampWrapper">
                <input className="partidaInput" type="number" ref={odd1} placeholder="Odd1" ></input>
                <input className="partidaInput" type="number" ref={oddDraw} placeholder="OddDraw"></input>
                <input className="partidaInput" type="number" ref={odd2} placeholder="Odd2" ></input>
            </div>       
            <div className="leftCampWrapper">
                
            </div>       
            <div className="leftCampWrapper"> 
                  <button onClick={submit} className="partidaButton" >Submit</button>      
            </div>     
                    
        </div>}

        <div className="leftCampWrapper"> 
            <button onClick={submit2} className="partidaButton" >Fetch API Data</button>    
            </div> 

        

    </div>  
        
    );

}

export default Left;