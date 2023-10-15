import axiosClinet from './AxiosClient';

const PromotionAPI = {
    getCode(params) {
        const url = `/promotion/find-one-by-code`;
        return axiosClinet.get(url, { params });
    },
};

export default PromotionAPI;
