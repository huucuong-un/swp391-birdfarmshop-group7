import axiosClient from './AxiosClient';

const VnpayAPI = {
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

    add(data, includeAuthorization = true) {
        const url = `/customer/vnpay/payment`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },
};

export default VnpayAPI;
