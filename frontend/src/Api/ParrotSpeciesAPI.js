import axiosClinet from './AxiosClient';

const ParrotSpeciesAPI = {
    getAll(params) {
        const url = '/parrot-species';
        return axiosClinet.get(url, { params });
    },
    getAllTrue(params) {
        const url = '/parrot-species-true';
        return axiosClinet.get(url, { params });
    },
    getListBySpeciesId(speciesId) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        return axiosClinet.get(url);
    },
    get(id) {
        const url = `/parrot-species/find-one-species-by-id/${id}`;
        return axiosClinet.get(url);
    },
    getSpeciesBySpeciesIdObject(id) {
        const url = `/parrot-species/find-one-species-by-id-object/${id}`;
        return axiosClinet.get(url);
    },
    getListBySpeciesId(speciesId) {
        const url = `/parrot-species-color/find-by-parrot-species-id/${speciesId}`;
        return axiosClinet.get(url);
    },

    getSpeciesByColorId(id) {
        const url = `/parrot-species/find-one-species-by-color-id/${id}`;
        return axiosClinet.get(url);
    },

    count() {
        const url = '/parrot-species/total-item';
        return axiosClinet.get(url);
    },

    add(data) {
        const url = `/admin/parrot-species/create`;
        return axiosClinet.post(url, data);
    },

    update(data) {
        const url = `/admin/parrot-species/update/${data.id}`;
        return axiosClinet.put(url, data);
    },

    remove(id) {
        const url = `/admin/parrot-species/change-status/${id}`;
        return axiosClinet.delete(url);
    },
    sort(params) {
        const url = `/parrot-species/sort`;
        return axiosClinet.get(url, { params });
    },
    search(params) {
        const url = `/parrot-species/search`;
        return axiosClinet.get(url, { params });
    },
    searchSortParrotSpeciesPublic(params) {
        const url = '/parrot-species/search_sort';
        return axiosClinet.get(url, { params });
    },

    getTop3SpeciesWithHighestOrderMoney() {
        const url = '/admin/parrot-species/find-top3-sale';
        return axiosClinet.get(url);
    },
};

export default ParrotSpeciesAPI;
