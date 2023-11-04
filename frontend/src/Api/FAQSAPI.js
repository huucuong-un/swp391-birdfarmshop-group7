import axios from 'axios';
import axiosClinet from './AxiosClient';
import axiosClient from './AxiosClient';

const FAQSAPI = {
    getAll(params) {
        const url = '/faqs';
        return axiosClinet.get(url, { params });
    },

    add(data) {
        const url = `/faqs`;
        return axiosClinet.post(url, data);
    },

    changeStatus(id) {
        const url = `/faqs/${id}`;
        return axiosClinet.delete(url);
    },
    sortSearchForFaqs(params) {
        const url = '/admin/faqs/search_sort';
        return axiosClient.get(url, { params });
    },
};

export default FAQSAPI;
