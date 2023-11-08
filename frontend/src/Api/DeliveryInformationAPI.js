import axiosClient from './AxiosClient';
const DeliveryInformation = {
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

    getAll(customerid, config, includeAuthorization = true) {
        const url = `/customer/delivery-information/${customerid}`;
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    addNewDeliveryInfo(data, config, includeAuthorization = true) {
        const url = `/customer/delivery-information`;
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.post(url, data, authorizedConfig);
    },

    updateDeliveryInfo(data, config, includeAuthorization = true) {
        const url = `/customer/delivery-information`;
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.put(url, data, authorizedConfig);
    },

    getDeliveryInfoWithTruePickingStatusByCustomerId(customerid, config, includeAuthorization = true) {
        const url = `/customer/delivery-information/picking-status/${customerid}`;
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    updatePickingStatus(data, includeAuthorization = true) {
        const url = `/customer/delivery-information/update-picking-status`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.put(url, data, authorizedConfig);
    },

    getOneById(id, includeAuthorization = true) {
        const url = `/customer/delivery-information/admin/find-one-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default DeliveryInformation;
