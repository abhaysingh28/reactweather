import axios from "axios";
import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [search, setsearch] = useState("");
  const [weather, setweather] = useState([]);
  const ref = useRef();
  const [Loader, setLoader] = useState(false);

  const fetweatherdata = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=6243aaf48b62471c43490a0d129cb8dc&units=metric`
    );
    console.log(data);
    setweather(data);
  };
  const submithandler = (e) => {
    e.preventDefault();
    fetweatherdata();
    setsearch("");
  };
  return (
    <div>
      <div className="search">
        <div className="input">
          <form onSubmit={submithandler}>
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="enter your city name"
            />
            <button onClick={() => (ref.current.style.display = "initial")}>
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        <div  ref={ref} className="show">
          <h1>{weather?.name}, {weather?.sys?.country}</h1>
          <h3> {weather?.main?.temp} C </h3>
          {/* <h4><i class="bi bi-arrow-up">{weather?.main?.temp_min} ,  <i class="bi bi-arrow-down"></i> {weather?.main?.temp_max}</i></h4> */}
          <h1> Humidity: {weather?.main?.humidity} </h1>
          <h1> Wind Speed: {weather?.wind?.speed} kts </h1>

          {weather?.weather?.map((e,i)=>(
            <div className="name" key={i} >
              <h6>
              <img src={`http://openweathermap.org/img/w/${e.icon}.png`} alt="icon" />
                {e.description}</h6>
            </div>
          ))}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default App;
