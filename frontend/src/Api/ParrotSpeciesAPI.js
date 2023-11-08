import axiosClinet from './AxiosClient';
const ParrotSpeciesAPI = {
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
        const url = '/parrot-species';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getAllTrue(params, includeAuthorization = false) {
        const url = '/parrot-species-true';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getListBySpeciesId(speciesId, includeAuthorization = false) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    get(id, includeAuthorization = false) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getSpeciesBySpeciesIdObject(id, includeAuthorization = false) {
        const url = `/parrot-species/find-one-species-by-id-object/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    // getListBySpeciesId(speciesId, includeAuthorization = false) {
    //     const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
    //     const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
    //     return axiosClinet.get(url, authorizedConfig);
    // },

    getSpeciesByColorId(id, includeAuthorization = false) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    count(includeAuthorization = false) {
        const url = '/parrot-species/total-item';
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = '/admin/parrot-species/create';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },

    update(data, includeAuthorization = true) {
        const url = `/admin/parrot-species/update/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.put(url, authorizedConfig.data, authorizedConfig);
    },

    remove(id, includeAuthorization = true) {
        const url = `/admin/parrot-species/change-status/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.delete(url, authorizedConfig);
    },

    sort(params, includeAuthorization = false) {
        const url = `/parrot-species/sort`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    search(params, includeAuthorization = false) {
        const url = `/parrot-species/search`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    searchSortParrotSpeciesPublic(params, includeAuthorization = false) {
        const url = '/parrot-species/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getTop3SpeciesWithHighestOrderMoney(includeAuthorization = true) {
        const url = '/marketer/parrot-species/find-top3-sale';
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    getTop3SpeciesWithHighestOrderMoneyForAdmin(includeAuthorization = true) {
        const url = '/admin/parrot-species/find-top3-sale';
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClinet.get(url, authorizedConfig);
    },

    addSpecies(data, includeAuthorization = true) {
        const url = `/admin/parrot-species-color`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClinet.post(url, authorizedConfig.data, authorizedConfig);
    },
};

export default ParrotSpeciesAPI;
