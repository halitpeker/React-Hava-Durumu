import React , { useState,useEffect} from 'react';
import './App.css';



function App(){
  const [loading,setLoading] = useState(null)
  const [coords,setCoords] = useState(null);
  const [current,setCurrent] = useState({ 
    icon:'',
    temp:''
  });
  const [location,setLocation] = useState({
    city:'',
    country:'',
    localtime:''
  });


  const getGeolocation = () => {
    setLoading(true);
    if(!navigator.geolocation){ 
      alert("geolocation aktif degil");
    }
    else {
      navigator.geolocation.getCurrentPosition((position) => { 
        setCoords(`${position.coords.latitude},${position.coords.longitude}`)
      })
    }
  };
  
  
 useEffect(() => { 
    getGeolocation();
  },[])

  useEffect(() => {  
    if(coords!==null){
        setLoading(true);
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=636b44be2b064b04a8a83359221804&q=${coords}&aqi=no`;
    fetch(apiURL).then(res =>  res.json()).then((data) => { 
      setCurrent({
        icon:data.current.condition.icon,
        temp:data.current.temp_c
      });
      setLocation({ 
        country:data.location.country,
        city: data.location.region,
        name: data.location.name ,
        localtime:data.location.localtime
      });
      setLoading(false)
    })
    }
  },[coords])



  return (
    <div className="App">  
       {!loading  && 
      <div>
        <div>
          <span className="time">Hava {current.temp} derece</span>
        </div>
    
        <div className="weather">
          <img src={current.icon} alt="Weather" />
          <span>{current.temp}</span>
        </div>
        <div className="location">
        <div>
          <span>{location.name}</span> / <span>{location.city}</span>
        </div>
        <div>
          <span className="time">{location.localtime}</span>
        </div>
      </div>
      </div>
      }
      {loading && <div className="loading"><span>Veriler Yükleniyor</span></div>}
      
     
    </div>
  );
}

export default App;
