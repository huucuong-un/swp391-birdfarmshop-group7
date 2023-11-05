import axiosClinet from './AxiosClient';

const NestAPI = {
    //Nest
    getAllNest(params) {
        const url = '/admin/parrot-egg-nest'; //done
        return axiosClinet.get(url, { params });
    },
    getNestById(id) {
        const url = `/admin/parrot-egg-nest/find-one-by-id?id=${id}`; //done
        return axiosClinet.get(url);
    },
    changeStatusForNest(id) {
        const url = `/admin/parrot-egg-nest/${id}`; //done
        return axiosClinet.delete(url);
    },

    addNest(data) {
        const url = `/admin/parrot-egg-nest`;
        return axiosClinet.post(url, data); //done
    },
    findOneBySpeciesId(params) {
        const url = '/parrot-egg-nest/find-one-by-species-id'; //done
        return axiosClinet.get(url, { params });
    },
    //Nest-usage-history
    getAllNestUsageHistory(params) {
        const url = '/staff/nest-usage-history'; //done
        return axiosClinet.get(url, { params });
    },
    getOneByOrderId(id) {
        const url = `/customer/nest-usage-history/find-by-parrot-id/${id}`; //done
        return axiosClinet.get(url);
    },
    add(data) {
        const url = `/customer/nest-usage-history`; //done
        return axiosClinet.post(url, data);
    },
    //Nest Price
    getAll(params) {
        const url = '/nest-price'; //done
        return axiosClinet.get(url, { params });
    },
    getNestPriceById(id) {
        const url = `/admin/nest-price/find-one-by-id?id=${id}`; //done
        return axiosClinet.get(url);
    },
    getNestPriceBySpeciesId(id) {
        const url = `nest-price/find-by-species-id?speciesId=${id}`; //done
        return axiosClinet.get(url);
    },
    addNestPrice(data) {
        const url = `/admin/nest-price`; //done
        return axiosClinet.post(url, data);
    },
    changeStatusForNestPrice(id) {
        const url = `/admin/nest-price/${id}`; //done
        return axiosClinet.delete(url);
    },
    updateNestPrice(data, id) {
        const url = `/admin/nest-price/${id}`; //done
        return axiosClinet.put(url, data);
    },
    //Nest-development-status
    getAllNestDevelopmentStatus(params) {
        const url = '/customer/nest-development-status'; //done
        return axiosClinet.get(url, { params });
    },
    getNestDevelopmentStatusById(id) {
        const url = `/customer/nest-development-status/find-one-status-by-id/${id}`; //done
        return axiosClinet.get(url);
    },
    getNestDevelopmentStatusBySequence(id) {
        const url = `/admin/nest-development-status/find-one-by-sequence/${id}`; //done
        return axiosClinet.get(url);
    },
    addNestDevelopmentStatus(data) {
        const url = `/admin/nest-development-status`; //done
        return axiosClinet.post(url, data);
    },
    changeStatusForNestDevelopmentStatus(id) {
        const url = `/admin/nest-development-status/${id}`; //done
        return axiosClinet.delete(url);
    },

    searchSortForNestPrice(params) {
        const url = '/admin/nest-price/search_sort'; //done
        return axiosClinet.get(url, { params });
    },
    searchSortForNest(params) {
        const url = '/admin/parrot-egg-nest/search_sort'; //done
        return axiosClinet.get(url, { params });
    },
    changeSequenceForNestDevelopmentStatus(data) {
        const url = `/admin/nest-development-status/update-sequence?id=${data.id}&sequence=${data.sequence}`; //done
        return axiosClinet.put(url, data);
    },
    //Nest-development
    getAllNestDevelopment(params) {
        const url = '/admin/nest-development'; //done
        return axiosClinet.get(url, { params });
    },
    getAllNestDevelopmentWithUsageId(id) {
        const url = `/customer/nest-development/find-all-by-nest-usage-history-id/${id}`; //done
        return axiosClinet.get(url);
    },
    addNestDevelopment(data) {
        const url = `/staff/nest-development`; //done
        return axiosClinet.post(url, data);
    },
};

export default NestAPI;
