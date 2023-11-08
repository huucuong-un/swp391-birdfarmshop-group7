import axiosClient from './AxiosClient';
const ParrotSpeciesColorAPI = {
    addAuthorizationHeader(config, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },

    getAll(params, includeAuthorization = false) {
        const url = '/parrot-species-color';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    get(id, includeAuthorization = false) {
        const url = `/parrot-species-color/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findByParrotId(id, includeAuthorization = false) {
        const url = `/parrot-species-color/find-by-parrot-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findByParrotSpecieId(id, includeAuthorization = false) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findOneSpeciesByParrotID(id, includeAuthorization = false) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findOneSpeciesColorById(id, includeAuthorization = false) {
        const url = `/parrot-species-color/find-one-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findOneSpeciesByColorId(id, includeAuthorization = false) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = '/admin/parrot-species-color';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    update(data, includeAuthorization = true) {
        const url = `/admin/parrot-species-color/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data, authorizedConfig);
    },

    remove(id, includeAuthorization = true) {
        const url = `/admin/parrot-species-color/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },

    getImagesByColorId(id, includeAuthorization = false) {
        const url = `/color-image/find-by-color/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },

    getImagesBySpeciesId(id, includeAuthorization = false) {
        const url = `/color-image/find-by-species/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },

    getImageURLsBySpeciesId(id, includeAuthorization = false) {
        const url = `/color-image/find-by-species/images/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },

    searchSortParrotSpecies(params, includeAuthorization = true) {
        const url = '/admin/parrot-species/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    addColorImage(data, includeAuthorization = true) {
        const url = '/admin/color-image';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    deleteImage(id, includeAuthorization = true) {
        const url = `/admin/color-image/delete-image/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },

    changeStatus(id, includeAuthorization = true) {
        const url = `/admin/parrot-species/change-status/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
};

export default ParrotSpeciesColorAPI;
