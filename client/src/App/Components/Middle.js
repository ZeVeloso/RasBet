import "./Middle.css"
import Bet from './Bet';
import { useState } from "react";
function Middle(props) {
    
    return (
      <div className="middle">
          
        <ul>
            {props.items.map((item, index) => 
                <Bet isAdmin={props.isAdmin} key={index} bet={item}></Bet>
            )}
        </ul>
    </div>  
        
    );

}

export default Middle;