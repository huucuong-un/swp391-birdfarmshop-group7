import axiosClient from './AxiosClient';

const DeliveryInformation = {
    getAll(customerid, config) {
        const url = `/delivery-information/${customerid}`;
        return axiosClient.get(url, config);
    },

    addNewDeliveryInfo(data, config) {
        const url = `/delivery-information`;
        return axiosClient.post(url, data, config);
    },

    updateDeliveryInfo(data, config) {
        const url = `/delivery-information/${data.id}`;
        return axiosClient.put(
            url,
            {
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address,
                status: data.status,
                userId: data.userId,
            },
            config,
        );
    },

    getDeliveryInfoWithTruePickingStatusByCustomerId(customerid, config) {
        const url = `/delivery-information/picking-status/${customerid}`;
        return axiosClient.get(url, config);
    },

    updatePickingStatus(customerid, data, config) {
        const url = `/delivery-information/update-picking-status/${customerid}`;
        return axiosClient.put(url, data, config);
    },
};

export default DeliveryInformation;
