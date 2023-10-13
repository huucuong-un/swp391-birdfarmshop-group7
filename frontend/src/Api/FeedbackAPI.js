import axios from 'axios';
import axiosClinet from './AxiosClient';

const FeedbackAPI = {
    getAll(params) {
        const url = '/feedback/find-all-by-species-id-and-belong-to-or-rating-or-color-id';
        return axiosClinet.get(url, { params });
    },

    countReview(params) {
        const url = '/feedback/count-by-species-id-or-species-color-id-and-rating';
        return axiosClinet.get(url, { params });
    },
};

export default FeedbackAPI;
