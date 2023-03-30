import axios from "axios";

const KEY = 'AIzaSyBOWOcjbcIIfXG-vW86_L0T72C1K3UJcVg'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    },
    headers: {}
})