import axios from 'axios';      /*Used for API Authentication->KEY to get info for movies OR shows*/

const instance=axios.create({
    baseURL: "https://api.themoviedb.org/3",
});  /*Creates a new instance of axios*/

export default instance;