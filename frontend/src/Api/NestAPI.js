import axiosClinet from './AxiosClient';
const NestAPI = {
    //Nest
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

    getAllNest(params, includeAuthorization = true) {
        const url = '/admin/parrot-egg-nest';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getNestById(id, includeAuthorization = true) {
        const url = `/admin/parrot-egg-nest/find-one-by-id?id=${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    changeStatusForNest(id, includeAuthorization = true) {
        const url = `/admin/parrot-egg-nest/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.delete(url, authorizedConfig);
    },

    addNest(data, includeAuthorization = true) {
        const url = `/admin/parrot-egg-nest`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },

    findOneBySpeciesId(params, includeAuthorization = false) {
        const url = '/parrot-egg-nest/find-one-by-species-id';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    // Nest-usage-history
    getAllNestUsageHistory(params, includeAuthorization = true) {
        const url = '/staff/nest-usage-history';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getOneByOrderId(id, includeAuthorization = true) {
        const url = `/customer/nest-usage-history/find-by-parrot-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = `/customer/nest-usage-history`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },

    // Nest Price
    getAll(params, includeAuthorization = false) {
        const url = '/nest-price';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getNestPriceById(id, includeAuthorization = true) {
        const url = `/admin/nest-price/find-one-by-id?id=${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getNestPriceBySpeciesId(id, includeAuthorization = false) {
        const url = `nest-price/find-by-species-id?speciesId=${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    addNestPrice(data, includeAuthorization = true) {
        const url = `/admin/nest-price`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },

    changeStatusForNestPrice(id, includeAuthorization = true) {
        const url = `/admin/nest-price/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.delete(url, authorizedConfig);
    },

    updateNestPrice(data, id, includeAuthorization = true) {
        const url = `/admin/nest-price/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.put(url, authorizedConfig.data, authorizedConfig);
    },

    // Nest-development-status
    getAllNestDevelopmentStatus(params, includeAuthorization = true) {
        const url = '/customer/nest-development-status';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getNestDevelopmentStatusById(id, includeAuthorization = true) {
        const url = `/customer/nest-development-status/find-one-status-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getNestDevelopmentStatusBySequence(id, includeAuthorization = true) {
        const url = `/admin/nest-development-status/find-one-by-sequence/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    addNestDevelopmentStatus(data, includeAuthorization = true) {
        const url = `/admin/nest-development-status`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },

    changeStatusForNestDevelopmentStatus(id, includeAuthorization = true) {
        const url = `/admin/nest-development-status/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.delete(url, authorizedConfig);
    },

    searchSortForNestPrice(params, includeAuthorization = true) {
        const url = '/admin/nest-price/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    searchSortForNest(params, includeAuthorization = true) {
        const url = '/admin/parrot-egg-nest/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    changeSequenceForNestDevelopmentStatus(data, includeAuthorization = false) {
        const url = `nest-development-status/update-sequence?id=${data.id}&sequence=${data.sequence}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.put(url, authorizedConfig);
    },

    // Nest-development
    getAllNestDevelopment(params, includeAuthorization = true) {
        const url = '/admin/nest-development';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getAllNestDevelopmentWithUsageId(id, includeAuthorization = true) {
        const url = `/customer/nest-development/find-all-by-nest-usage-history-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    addNestDevelopment(data, includeAuthorization = true) {
        const url = `/staff/nest-development`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },
};

export default NestAPI;
