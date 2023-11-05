import axios from 'axios';
import axiosClient from './AxiosClient';

const FAQSAPI = {
    getAll(params) {
        const url = '/faqs';
        return axiosClient.get(url, { params });
    },

    add(data) {
        const url = `/admin/faqs`;
        return axiosClient.post(url, data);
    },

    changeStatus(id) {
        const url = `/admin/faqs/${id}`;
        return axiosClient.delete(url);
    },
    sortSearchForFaqs(params) {
        const url = '/admin/faqs/search_sort';
        return axiosClient.get(url, { params });
    },
};

export default FAQSAPI;
