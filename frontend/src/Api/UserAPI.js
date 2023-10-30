import axios from 'axios';

import axiosClient from './AxiosClient';

const UserAPI = {
    getUserById(id) {
        const url = `/user/get-user-by-id?id=${id}`;
        return axiosClient.get(url);
    },

    updateUserProfile(data) {
        const url = `/user/update-profile`;
        return axiosClient.put(url, data);
    },
    getUserByToken(data) {
        const url = `/user/generate-token?token=${data}`;
        return axiosClient.get(url);
    },
};
export default UserAPI;
