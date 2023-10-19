import axios from 'axios';
import axiosClinet from './AxiosClient';

const FAQSAPI = {
    getAll(params) {
        const url = '/faqs';
        return axiosClinet.get(url, { params });
    },

    add(data) {
        const url = `/faqs`;
        return axiosClinet.post(url, data);
    },
};

export default FAQSAPI;
