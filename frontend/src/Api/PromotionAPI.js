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
};

export default PromotionAPI;
