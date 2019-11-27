import axios from 'axios';

export default axios.create({
    // baseURL: 'http://localhost:2323/api'
    baseURL: 'http://murmuring-citadel-92335.herokuapp.com/api'
});