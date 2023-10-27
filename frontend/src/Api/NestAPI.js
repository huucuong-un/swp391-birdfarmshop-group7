import axiosClinet from './AxiosClient';

const NestAPI = {
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
