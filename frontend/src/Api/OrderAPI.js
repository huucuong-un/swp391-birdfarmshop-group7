import axiosClinet from './AxiosClient';

const OrderAPI = {
    getAll(params) {
        const url = '/order';
        return axiosClinet.get(url, { params });
    },

    findAllByUserId() {
        const url = `/order/findAllByUserId/1`;
        return axiosClinet.get(url);
    },

    findAllByOrderId(id) {
        const url = `/orderdetail/findAllByOrderId/${id}`;
        return axiosClinet.get(url);
    },

    add(data) {
        const url = `/order/cart`;
        return axiosClinet.post(url, data);
    },
};

export default OrderAPI;
