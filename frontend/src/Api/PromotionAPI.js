import axiosClinet from './AxiosClient';

const PromotionAPI = {
    getCode(params) {
        const url = `/promotion/find-one-by-code`;
        return axiosClinet.get(url, { params });
    },
    getAll() {
        const url = `/promotion`;
        return axiosClinet.get(url);
    },
    changeStatus(id) {
        const url = `/promotion/change-status/${id}`;
        return axiosClinet.put(url);
    },

    add(data) {
        const url = `/promotion`;
        return axiosClinet.post(url, data);
    },
    searchSortForPromotion(params) {
        const url = '/admin/promotion/search_sort';
        return axiosClinet.get(url, { params });
    },
};

export default PromotionAPI;
