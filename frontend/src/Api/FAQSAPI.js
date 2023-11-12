import axios from 'axios';
import axiosClient from './AxiosClient';
const FAQSAPI = {
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
        const url = '/faqs';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = `/admin/faqs`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    changeStatus(id, includeAuthorization = true) {
        const url = `/admin/faqs/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },

    sortSearchForFaqs(params, includeAuthorization = true) {
        const url = '/admin/faqs/search_sort';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    updateFaqs(data, id) {
        const url = `/admin/faqs/${id}`; //done
        return axiosClient.put(url, data);
    },
};

export default FAQSAPI;
