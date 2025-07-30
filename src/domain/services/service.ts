import axios from "axios";
import config from '@/domain/config';
import {getUser} from "@/domain/storage/user.ts";

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
export default service;