import axios from 'axios';

export default axios.create({
    // backend url
    baseURL: 'http://127.0.0.1:4444'
});