import React, {useState, useEffect } from 'react';
import '../css/App.css';
import sun from '../assets/sun.png';
import { MDBIcon } from 'mdb-react-ui-kit';
// import {DeleteIcon} from '@mui/icons-material';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Search = () => { 
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchTime, setSearchTime] = useState(null);

    const handleSearch = e => {
        e.preventDefault();
        // API
        const API_KEY = '171c54e68326e2c60a0fc13eaf28643c';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        //Search time
        const searchDate = new Date();
        const searchTime = searchDate.toLocaleTimeString();
        const searchDateTime = `${searchDate.toLocaleDateString()} ${searchTime}`;
       
        // Fetch Search data
        fetch(API_URL)
        .then(response => {
          if (!response.ok) {
            throw new Error('City not found.');
          }
          return response.json();
        })
        .then(data => {
          setWeatherData(data);
          const searchCountry = `${data.sys.country}`;
          setSearchTime(searchDateTime);
          setSearchHistory(prevSearches => {
            if (prevSearches.length >= 10) {
              prevSearches.shift();
            }
            return [...prevSearches, { city, searchCountry, searchDateTime }];
          });
            
          setErrorMessage(null);
        })
        .catch(error => {
          console.error(error);
          setErrorMessage(<div className="error"> City not found</div>);
          
          setWeatherData(null);
        });
      };

        // Delete handler
        const handleDelete = index => {
            setSearchHistory(prevSearches => {
            const newSearches = [...prevSearches];
            newSearches.splice(index, 1);
            return newSearches;
            });
        };

        // Country Name convertor
        const [countryName, setCountryName] = useState(null);

        useEffect(() => {
            if (weatherData) {
            const countryCode = weatherData.sys.country;
            const API_URL = `https://restcountries.com/v2/alpha/${countryCode}`;

            fetch(API_URL)
            .then(response => {
              if (!response.ok) {
                throw new Error('Country not found.');
              }
              return response.json();
            })
            .then(data => {
              setCountryName(data.name);
              setErrorMessage(null);
            })
            .catch(error => {
              console.error(error);
              setCountryName(null);
              setErrorMessage('Country not found.');
            });
            }
        }, [weatherData]);


    return(
        <>
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-lg-8 col-md-12 col-sm-12 ">
                        <div className='search'>
                            <form onSubmit={handleSearch}>
                                <input
                                type="text"
                                name="city"
                                placeholder="Enter a city"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>
                            {errorMessage && (
                                <p>{errorMessage}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 ">
                        <div className="card background-colorfour clearance">
                        <div className="row p-4"><h3>Today's Weather</h3></div>
                            <img className='image2' src={sun}  />
                                {weatherData && (
                                     <>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                             <div className="row">
                                                 <div className="col ">
                                                    <div className='temp'>
                                                    {Math.round(weatherData.main.temp)}°
                                                    </div>
                                                 </div>
                                            </div>
                                            <div className="row">
                                                 <div className="col">
                                                 H: {Math.round(weatherData.main.temp_max)}° L: {Math.round(weatherData.main.temp_min)}°
                                                 </div>
                                            </div>
                                        </div>
                                        <div className="row p-4">
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                <b> {weatherData.name}, {countryName}</b>
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                {new Date(searchTime).toLocaleString("en-GB")}
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                Humidity: {weatherData.main.humidity}%
                                            </div>
                                            <div className="col-lg-3 col-md-12 col-sm-12">
                                                Clouds: {weatherData.clouds.all}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className="col-lg-12 col-md-12 col-sm-12 eightypercent ">
                                            <div className="card p-4 background-colorfive ">
                                                <h5>Search History</h5>
                                                <div className="row p-4 ">
                                                    
                                                    {searchHistory.map((search, index) => (
                                                        <div  key={index}>
                                                             <div className="col-lg-12 col-md-12 col-sm-12  background-colorsix" >
                                                                <div className="row p-2 ">
                                                                    <div className="col-lg-6">
                                                                        {console.log(search)}
                                                                        {search.city}, {search.searchCountry}
                                                                    </div>
                                                                    <div className="col-lg-6 right">
                                                                    {new Date(search.searchDateTime).toLocaleString("en-GB")}
                                                                        <span onClick={() => handleDelete(index)}>
                                                                            <MDBIcon fas icon="trash" alt='del'/>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div> 
                                 </div>                       
                                <div className="col-lg-12 col-md-12 col-sm-12 ">
                                            
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Search;