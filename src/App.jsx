import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null);

  {/*Converting the api data from the url to json*/}
  const getData = () => {
    fetch("https://api.weatherapi.com/v1/current.json?key=0c0fb78404de4442a25213712251410&q=London&aqi=no")
      .then(res => res.json()) 
      .then(data => setData(data));
  }

  return (
    <>
      <h1>Weather App</h1>
      <button onClick={getData}>Get Weather</button>

      {/*Only rendering IF there is api data present*/}
      {data && 
        <div>
          <img src={data.current.condition.icon} alt="" />
          <p>Location: {data.location.name}</p>
          <p>Temperature: {data.current.temp_c}</p>
        </div>
      }
      
    </>  
  )
}

export default App
