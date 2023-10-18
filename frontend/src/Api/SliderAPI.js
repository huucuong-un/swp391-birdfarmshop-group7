import axiosClinet from './AxiosClient';
const SliderAPI = {
    getAll(params) {
        const url = '/slider';
        return axiosClinet.get(url, { params });
    },
};
export default SliderAPI;
