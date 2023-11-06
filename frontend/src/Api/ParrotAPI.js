import axiosClient from './AxiosClient';

const ParrotAPI = {
    getAll(params) {
        const url = '/parrot';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClient.get(url);
    },

    countAvailableParrotId(id) {
        const url = `/parrot/count-available-parrot-quantity-spcies-by-id/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/admin/parrot`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/admin/parrot-species/${data.id}`;
        return axiosClient.put(url, data);
    },
    updateParrot(data) {
        const url = `/admin/parrot/${data.id}`;
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/admin/parrot-species/${id}`;
        return axiosClient.delete(url);
    },
    searchSortForParrot(params) {
        const url = '/admin/parrot/search_sort';
        return axiosClient.get(url, { params });
    },

    changeStatus(id) {
        const url = `/admin/parrot/${id}`;
        return axiosClient.delete(url);
    },
};

export default ParrotAPI;
