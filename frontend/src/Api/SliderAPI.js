import axiosClient from './AxiosClient';
const SliderAPI = {
    getAll(params) {
        const url = '/marketer/slider';
        return axiosClient.get(url, { params });
    },
    update(data) {
        const url = `/marketer/slider/${data.id}`;
        return axiosClient.put(url, data);
    },
    searchSortForSlider(params) {
        const url = '/marketer/slider/search_sort';
        return axiosClient.get(url, { params });
    },
    getAllWithTrueStatus() {
        const url = '/marketer/slider/true-status';
        return axiosClient.get(url);
    },
};
export default SliderAPI;
