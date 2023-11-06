import axiosClinet from './AxiosClient';

const VnpayAPI = {
    add(data) {
        const url = `customer/vnpay/payment`;
        return axiosClinet.post(url, data);
    },
};

export default VnpayAPI;
