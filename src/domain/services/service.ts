import axios from "axios";
import config from '@/domain/config';
import {getUser, setUser} from "@/domain/storage/user.ts";
import {useNavigate} from "react-router";

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

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            setUser(null);
            const navigate = useNavigate();
            if(navigate) {
                navigate('signin')
            } else {
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);
export default service;