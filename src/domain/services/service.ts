import axios from "axios";
import config from '@/domain/config';


const service = axios.create({
    baseURL: `${config.api.url}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: '',
    },
});

export default service;