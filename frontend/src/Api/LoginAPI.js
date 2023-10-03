import axiosClinet from './AxiosClient';

const LoginAPI = {
    getAll(params) {
        const url = '/parrot-species';
        return axiosClinet.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    },

    getListBySpeciesId(speciesId) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        return axiosClinet.get(url);
    },

    login(data, config) {
        const url = `/user/authenticate`;
        return axiosClinet.post(url, data, config);
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

export default LoginAPI;
