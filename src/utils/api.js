
import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3";


const VITE_KEY = import.meta.env.VITE_APP_TMDB_T0KEN;

const headers ={ 
    Authorization: "Bearer " + VITE_KEY,
};

export const fetchDataFromApi = async(url,params) => {
    try{
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params,
        });
        return data;

    } catch(err) {
        console.log(err)
        return err;
    }
}