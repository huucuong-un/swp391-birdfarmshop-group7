import axiosClinet from './AxiosClient';

const ParrotAPI = {
    getAll(params) {
        const url = '/parrot';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    },

    countAvailableParrotId(id) {
        const url = `/parrot/count-available-parrot-quantity-spcies-by-id/${id}`;
        return axiosClinet.get(url);
    },

    add(data) {
        const url = `/parrot-species`;
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

export default ParrotAPI;
