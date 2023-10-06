import axios from 'axios';
import axiosClient from './AxiosClient';

const LoginAPI = {
    login(data, config) {
        const url = `/user/authenticate`;
        return axiosClient.post(url, data, config);
    },

    getUserByEmail(email) {
        const url = `/user/get-user-by-email/${email}`;
        return axiosClient.get(url);
    },
};

export default LoginAPI;
