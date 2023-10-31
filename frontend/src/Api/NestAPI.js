import axiosClinet from './AxiosClient';

const NestAPI = {
    //Nest
    getAllNest(params) {
        const url = '/parrot-egg-nest';
        return axiosClinet.get(url, { params });
    },
    changeStatusForNest(id) {
        const url = `/parrot-egg-nest/${id}`;
        return axiosClinet.delete(url);
    },

    addNest(data) {
        const url = `/parrot-egg-nest`;
        return axiosClinet.post(url, data);
    },
    findOneBySpeciesId(params) {
        const url = '/parrot-egg-nest/find-one-by-species-id';
        return axiosClinet.get(url, { params });
    },
    //Nest-usage-history
    getAllNestUsageHistory(params) {
        const url = '/nest-usage-history';
        return axiosClinet.get(url, { params });
    },
    add(data) {
        const url = `/nest-usage-history`;
        return axiosClinet.post(url, data);
    },
    //Nest Price
    getAll(params) {
        const url = '/nest-price';
        return axiosClinet.get(url, { params });
    },
    getNestPriceById(id) {
        const url = `/nest-price/find-one-by-id?id=${id}`;
        return axiosClinet.get(url);
    },
    getNestPriceBySpeciesId(id) {
        const url = `/nest-price/find-by-species-id?speciesId=${id}`;
        return axiosClinet.get(url);
    },
    addNestPrice(data) {
        const url = `/nest-price`;
        return axiosClinet.post(url, data);
    },
    changeStatusForNestPrice(id) {
        const url = `/nest-price/${id}`;
        return axiosClinet.delete(url);
    },
    //Nest-development-status
    getAllNestDevelopmentStatus(params) {
        const url = '/nest-development-status';
        return axiosClinet.get(url, { params });
    },
    getNestDevelopmentStatusById(id) {
        const url = `/nest-development-status/find-one-status-by-id/${id}`;
        return axiosClinet.get(url);
    },
    addNestDevelopmentStatus(data) {
        const url = `/nest-development-status`;
        return axiosClinet.post(url, data);
    },
    changeStatusForNestDevelopmentStatus(id) {
        const url = `/nest-development-status/${id}`;
        return axiosClinet.delete(url);
    },
    changeSequenceForNestDevelopmentStatus(data) {
        const url = `/nest-development-status/admin/update-sequence?id=${data.id}&sequence=${data.sequence}`;
        return axiosClinet.put(url, data);
    },
    //Nest-development
    getAllNestDevelopment(params) {
        const url = '/nest-development';
        return axiosClinet.get(url, { params });
    },
    addNestDevelopment(data) {
        const url = `/nest-development`;
        return axiosClinet.post(url, data);
    },
};

export default NestAPI;
