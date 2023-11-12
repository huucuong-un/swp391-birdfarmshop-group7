import axiosClinet from './AxiosClient';
const FeedbackAPI = {
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
        const config = { params };
        return axiosClinet.get(
            '/feedback/find-all-by-species-id-and-belong-to-or-rating-or-color-id',
            this.addAuthorizationHeader(config, includeAuthorization),
        );
    },

    getAllFeedbackSystem(params, includeAuthorization = true) {
        const config = { params };
        return axiosClinet.get(
            '/staff/feedback/search_sort',
            this.addAuthorizationHeader(config, includeAuthorization),
        );
    },

    create(data, includeAuthorization = false) {
        return axiosClinet.post('/feedback', data, this.addAuthorizationHeader({}, includeAuthorization));
    },

    checkFeedbacked(params, includeAuthorization = false) {
        return axiosClinet.get(
            '/feedback/count-by-orderId',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    countReview(params, includeAuthorization = false) {
        return axiosClinet.get(
            '/feedback/count-by-species-id-or-species-color-id-and-rating',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    countReview2(params, includeAuthorization = false) {
        return axiosClinet.get(
            '/feedback/count-by-species-id',
            { params },
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },

    changeStatus(id, includeAuthorization = true) {
        return axiosClinet.put(
            `/staff/feedback/change-status/${id}`,
            null,
            this.addAuthorizationHeader({}, includeAuthorization),
        );
    },
};

export default FeedbackAPI;
