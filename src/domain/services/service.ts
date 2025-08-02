import axios from "axios";
import config from '@/domain/config';
import {getUser, setUser} from "@/domain/storage/user.ts";

const user = getUser();

const service = axios.create({
    baseURL: `${config.api.url}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: user ? `${user.token_type} ${user.access_token}` : '',
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: "X-XSRF-TOKEN",
});

service.interceptors.request.use(
    config => {
        const user = getUser();
        if(user) {
            config.headers['Authorization'] = user ? `${user.token_type} ${user.access_token}` : '';
        }

        return config;
    },
    error => Promise.reject(error)
);

service.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            setUser(null);
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default service;