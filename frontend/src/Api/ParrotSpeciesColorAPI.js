import axiosClinet from './AxiosClient';

const ParrotSpeciesColorAPI = {
    getAll(params) {
        const url = '/parrot-species-color';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species-color/${id}`;
        return axiosClinet.get(url);
    },

    findByParrotId(id) {
        const url = `/parrot-species-color/find-by-parrot-id/${id}`;
        return axiosClinet.get(url);
    },

    findOneSpeciesByParrotID(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    },

    add(data) {
        const url = '/parrot-species-color';
        return axiosClinet.post(url, data);
    },

    update(data) {
        const url = `/parrot-species-color/${data.id}`;
        return axiosClinet.put(url, data);
    },

    remove(id) {
        const url = `/parrot-species-color/${id}`;
        return axiosClinet.delete(url);
    },
};

export default ParrotSpeciesColorAPI;
