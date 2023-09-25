import axiosClinet from './AxiosClient';

const ParrotSpeciesAPI = {
    getAll(params) {
        const url = '/parrot-species';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species/${id}`;
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

export default ParrotSpeciesAPI;
