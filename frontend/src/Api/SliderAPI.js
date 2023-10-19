import axiosClinet from './AxiosClient';
const SliderAPI = {
    getAll(params) {
        const url = '/slider';
        return axiosClinet.get(url, { params });
    },
    update(data) {
        const url = `/slider/${data.id}`;
        return axiosClinet.put(url, data);
    },
};
export default SliderAPI;
