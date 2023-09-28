import axiosClinet from './AxiosClient';

const OrderAPI = {
    getAll(params) {
        const url = '/order';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    }, //chua co

    add(data, id) {
        const url = `/order/${id}/parrot`;
        return axiosClinet.post(url, data);
    },

    update(data) {
        const url = `/parrot-species/${data.id}`;
        return axiosClinet.put(url, data);
    },

    remove(id) {
        const url = `/parrot-species/${id}`;
        return axiosClinet.delete(url);
    },
};

export default OrderAPI;
