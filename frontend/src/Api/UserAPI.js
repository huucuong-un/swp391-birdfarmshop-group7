import axios from 'axios';

import axiosClinent from './AxiosClient';

const UserAPI = {
    getUserById(param) {
        const url = '/user';
        return axiosClinent.get(url, { param });
    },
};
export default UserAPI;
