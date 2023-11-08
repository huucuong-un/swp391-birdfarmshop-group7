import axiosClient from './AxiosClient';

const AccountAPI = {
    addAuthorizationHeader(config, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },

    getAccounts(includeAuthorization = true) {
        const url = '/admin/user';
        const config = {};
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    addAccount(data, includeAuthorization = true) {
        const url = '/admin/user';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    changeAccountStatus(id, includeAuthorization = true) {
        const url = `/admin/user/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
};

export default AccountAPI;
