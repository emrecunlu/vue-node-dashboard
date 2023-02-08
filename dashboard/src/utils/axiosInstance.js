import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.VUE_APP_ENDPOINT,
});

export default instance;
