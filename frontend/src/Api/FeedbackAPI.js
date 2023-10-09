import axios from 'axios';
import axiosClinet from './AxiosClient';

const FeedbackAPI = {
    getAll(params) {
        const url = '/feedback/find-all-by-species-id-and-belong-to';
        return axiosClinet.get(url, { params });
    },
};

export default FeedbackAPI;
