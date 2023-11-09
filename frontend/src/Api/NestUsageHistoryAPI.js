import axiosClinet from './AxiosClient';
const NestUsageHistoryAPI = {
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
        const url = `/customer/nest-usage-history`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },
};

export default NestUsageHistoryAPI;
