import axiosClient from './AxiosClient';

const RoleAPI = {
    getRoles() {
        const url = '/role';
        return axiosClient.get(url);
    },

    addRole(data) {
        const url = '/role';
        return axiosClient.post(url, data);
    },
};

export default RoleAPI;
