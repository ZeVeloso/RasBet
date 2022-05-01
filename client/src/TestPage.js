import { useEffect, useState } from "react"
import './App.css';
import {fetchEvents} from './EventAPI'
function TestPage(props) {
  console.log(props);
  return (
      
    <div>
        {props.items.map((item, index) => (
            <p>{item.team1}</p>
        ))}
    </div>
  );
}

export default TestPage;
