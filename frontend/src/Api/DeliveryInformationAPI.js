import axiosClient from './AxiosClient';

const DeliveryInformation = {
    getAll(customerid) {
        const url = `/delivery-information/${customerid}`;
        return axiosClient.get(url);
    },

    addNewDeliveryInfo(data) {
        const url = `/delivery-information`;
        return axiosClient.post(url, data);
    },

    updateDeliveryInfo(data) {
        const url = `/delivery-information/${data.id}`;
        return axiosClient.put(url, data);
    },
};

export default DeliveryInformation;
