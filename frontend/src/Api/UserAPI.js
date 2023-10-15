import axios from 'axios';

import axiosClient from './AxiosClient';

const UserAPI = {
    getUserById(param) {
        const url = '/user';
        return axiosClient.get(url, { param });
    },

    updateUserProfile(data) {
        const url = `/user/update-profile`;
        return axiosClient.put(url, data);
    },
};
export default UserAPI;
