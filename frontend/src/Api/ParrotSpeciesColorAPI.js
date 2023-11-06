import axiosClient from './AxiosClient';

const ParrotSpeciesColorAPI = {
    getAll(params) {
        const url = '/parrot-species-color';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/parrot-species-color/${id}`;
        return axiosClient.get(url);
    },

    findByParrotId(id) {
        const url = `/parrot-species-color/find-by-parrot-id/${id}`;
        return axiosClient.get(url);
    },

    findByParrotSpecieId(id) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        return axiosClient.get(url);
    },
    findOneSpeciesByParrotID(id) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${id}`;
        return axiosClient.get(url);
    },

    findOneSpeciesColorById(id) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        return axiosClient.get(url);
    },

    findOneSpeciesByColorId(id) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/admin/parrot-species-color';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/admin/parrot-species-color/${data.id}`;
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/admin/parrot-species-color/${id}`;
        return axiosClient.delete(url);
    },

    getImagesByColorId(id) {
        const url = `/color-image/find-by-color/${id}`;
        return axiosClient.post(url);
    },

    getImagesBySpeciesId(id) {
        const url = `/color-image/find-by-species/${id}`;
        return axiosClient.post(url);
    },

    getImageURLsBySpeciesId(id) {
        const url = `/color-image/find-by-species/images/${id}`;
        return axiosClient.post(url);
    },
    searchSortParrotSpecies(params) {
        const url = '/admin/parrot-species/search_sort';
        return axiosClient.get(url, { params });
    },
    addColorImage(data) {
        const url = '/admin/color-image';
        return axiosClient.post(url, data);
    },

    deleteImage(id) {
        const url = `/admin/color-image/delete-image/${id}`;
        return axiosClient.delete(url);
    },

    changeStatus(id) {
        const url = `/admin/parrot-species/change-status/${id}`;
        return axiosClient.delete(url);
    },
};

export default ParrotSpeciesColorAPI;
