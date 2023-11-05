import axiosClient from './AxiosClient';

const PromotionAPI = {
    getCode(params) {
        const url = `/promotion/find-one-by-code`;
        return axiosClient.get(url, { params });
    },
    getAll() {
        const url = `/promotion`;
        return axiosClient.get(url);
    },
    changeStatus(id) {
        const url = `/admin/promotion/change-status/${id}`;
        return axiosClient.put(url);
    },

    add(data) {
        const url = `/admin/promotion`;
        return axiosClient.post(url, data);
    },
    searchSortForPromotion(params) {
        const url = '/admin/promotion/search_sort';
        return axiosClient.get(url, { params });
    },
    getAllForMarketer() {
        const url = '/marketer/promotion';
        return axiosClient.get(url);
    },

    getByCodeNotCheckDate(code) {
        const url = `/admin/promotion/find-one-by-code-new/${code}`;
        return axiosClient.post(url);
    },
};

export default PromotionAPI;
