import React from "react";
import "./HomeScreen.css";
import Nav from "../Nav";   //we import something outside the folder.. hence two dots
import Banner from "../Banner";
import requests from "../Requests";
import Row from "../Row";

function HomeScreen() {
    return <div className="homeScreen">
        {/* Nav */}
        <Nav />

        {/* Banner */}
        <Banner />
        {/* Row */}
        <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>;
}

export default HomeScreen;