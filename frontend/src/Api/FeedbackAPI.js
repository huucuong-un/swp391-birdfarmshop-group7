import axios from 'axios';
import axiosClinet from './AxiosClient';

const FeedbackAPI = {
    addAuthorizationHeader(config) {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        config.headers = {
            Authorization: `Bearer ${token}`,
            ...config.headers,
        };
        return config;
    },

    getAll(params) {
        return axiosClinet.get('/feedback/find-all-by-species-id-and-belong-to-or-rating-or-color-id', { params });
    },

    getAllFeedbackSystem(params) {
        const config = { params };
        return axiosClinet.get('/admin/feedback/search_sort', this.addAuthorizationHeader(config));
    },

    create(data) {
        return axiosClinet.post('/feedback', data);
    },

    checkFeedbacked(params) {
        return axiosClinet.get('/feedback/count-by-orderId', { params });
    },

    countReview(params) {
        return axiosClinet.get('/feedback/count-by-species-id-or-species-color-id-and-rating', { params });
    },

    countReview2(params) {
        return axiosClinet.get('/feedback/count-by-species-id', { params });
    },

    changeStatus(id) {
        const config = {};
        return axiosClinet.put(`/admin/feedback/change-status/${id}`, null, this.addAuthorizationHeader(config));
    },
};

export default FeedbackAPI;
