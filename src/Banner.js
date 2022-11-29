import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from './axios';      /*IMPORT FROM LOCAL AXIOS*/
import requests from './Requests';

function Banner() {

    const[movie,setMovie]=useState([]);
    
    useEffect(()=>{
        //run once when the banner loads
        async function fetchData(){ /*async function to get the data from the API*/
            const request=await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1) /*random no of results that we get*/
                ]
            );
            return request; /*return the request(ALWAYS A GOOD PROGRAMMING WAY TO DO THAT)*/
        }
        fetchData();
    },[]);
    console.log(movie);

    function truncate(string, n) {
        // truncate the description if longer than "n" characters
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }

return (
    <header 
        className="banner" 
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
    }}
    >
        <div className="banner_contents">
            <h1 className="banner_title">
                {movie?.title || movie?.name || movie?.original_name}   {/*cuz there are multiple fields giving same thingy*/}
            </h1>
            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>
            <h1 className="banner_description">
                {truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="banner--fadeBottom" />
    </header>
);
}

export default Banner