import { useEffect, useState } from "react"
import './App.css';
import {fetchEvents} from './EventAPI'
import TestPage from "./TestPage";
function Events() {
  const [resources, setResources] = useState([]);
  const [isLoading, setLoading] = useState(true)

useEffect(()=>
{
  fetchEvents().then(response => {
    setResources(response)
    setLoading(false);
  });   
}, [])


if (isLoading) {
    return <div className="App">Loading...</div>;
}
  
  
return (
     <TestPage items={resources}></TestPage>
    );
}
  
export default Events;
  