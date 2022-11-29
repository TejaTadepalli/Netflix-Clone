import axios from './axios';
import React, { useEffect,useState } from 'react'
import './Row.css'

function Row({title,fetchURL,isLargeRow=false}) { /*Using props to show each row value w/o manipulating each time*/

const [movies,setMovies]=useState([]); /*Using useState to store the movies in the array*/

const base_URL="https://image.tmdb.org/t/p/original/"; /*baseURL to get the image from the API*/

useEffect(()=>{
    //if [], run once when the row loads, and don't run again
    async function fetchData(){
        const request=await axios.get(fetchURL);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
},[fetchURL]); /*fetchURL is the dependency, so it will run everytime the fetchURL changes*/

console.table(movies);

return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row_posters">
        {movies.map(movie=>   /*Iterate through movies and return an image*/
          ((isLargeRow && movie.poster_path) ||  /*added condition to remove the movies without poster*/
          (!isLargeRow && movie.backdrop_path)) &&
          (<img  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                src={`${base_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
                }`} 
                alt={movie.name} />)
        )}
        </div>
    </div>
  );
}

export default Row