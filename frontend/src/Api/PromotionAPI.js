import axiosClient from './AxiosClient';

const PromotionAPI = {
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

    getCode(params) {
        const url = `/promotion/find-one-by-code`;
        return axiosClient.get(url, { params });
    },
    getAll() {
        const url = `/promotion`;
        return axiosClient.get(url);
    },
    // changeStatus(id, includeAuthorization = true) {
    //     const url = `/admin/promotion/change-status/${id}`;
    //     const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
    //     return axiosClient.put(url, authorizedConfig);
    // },

    changeStatus(id, includeAuthorization = true) {
        const url = `/admin/promotion/change-status/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
    add(data, includeAuthorization = true) {
        const url = `/admin/promotion`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },
    searchSortForPromotion(params, includeAuthorization = true) {
        const url = '/admin/promotion/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getAllForMarketer(params, includeAuthorization = true) {
        const url = '/marketer/promotion';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    getByCodeNotCheckDate(code, includeAuthorization = true) {
        const url = `/admin/promotion/find-one-by-code-new/${code}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },
};

export default PromotionAPI;
