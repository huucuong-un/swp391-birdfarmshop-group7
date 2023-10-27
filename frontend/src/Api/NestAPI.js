import axiosClinet from './AxiosClient';

const NestAPI = {
    getAll(params) {
        const url = '/nest-price';
        return axiosClinet.get(url, { params });
    },
    getNestPriceBySpeciesId(id) {
        const url = `/nest-price/find-by-species-id?speciesId=${id}`;
        return axiosClinet.get(url);
    },
    add(data) {
        const url = `/nest-usage-history`;
        return axiosClinet.post(url, data);
    },
    findOneBySpeciesId(params) {
        const url = '/parrot-egg-nest/find-one-by-species-id';
        return axiosClinet.get(url, { params });
    },
};

export default NestAPI;
