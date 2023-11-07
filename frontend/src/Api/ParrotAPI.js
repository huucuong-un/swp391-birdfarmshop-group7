import axiosClient from './AxiosClient';
const ParrotAPI = {
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
        const url = '/parrot';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    get(id, includeAuthorization = false) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    countAvailableParrotId(id, includeAuthorization = false) {
        const url = `/parrot/count-available-parrot-quantity-spcies-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = `/admin/parrot`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    update(data, includeAuthorization = true) {
        const url = `/admin/parrot-species/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data, authorizedConfig);
    },

    updateParrot(data, includeAuthorization = true) {
        const url = `/admin/parrot/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data, authorizedConfig);
    },

    remove(id, includeAuthorization = true) {
        const url = `/admin/parrot-species/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },

    searchSortForParrot(params, includeAuthorization = true) {
        const url = '/admin/parrot/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    changeStatus(id, includeAuthorization = true) {
        const url = `/admin/parrot/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
};

export default ParrotAPI;
