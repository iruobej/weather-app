import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const[query, setQuery] = useState('');

  {/*Converting the api data from the url to json*/}
  const getData = () => {
    if (!query) return; 

    fetch(`https://api.weatherapi.com/v1/current.json?key=0c0fb78404de4442a25213712251410&q=${query}&aqi=no`)
      .then(res => res.json()) 
      .then(data => setData(data));

    setQuery('');
  }

  return (
    <>
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Please enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={getData}>Get Weather</button>

      {/*Only rendering IF there is api data present*/}
      {data && 
        <div>
          <img src={data.current.condition.icon} alt="" />
          <h2>{data.location.name}, {data.location.country}</h2>
          <h3>{data.current.condition.text}</h3>
          <p>Temperature: {data.current.temp_c}°C</p>
          <p>Feels like: {data.current.feelslike_c}°C</p>
          <p>Humidity: {data.current.humidity}</p>
        </div>
      }
      
    </>  
  )
}

export default App
