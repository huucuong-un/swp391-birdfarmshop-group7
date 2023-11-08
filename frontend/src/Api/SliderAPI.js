import axiosClient from './AxiosClient';

const SliderAPI = {
    addAuthorizationHeader(config, includeAuthorization) {
        if (includeAuthorization) {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            config.headers = {
                Authorization: `Bearer ${token}`,
                ...config.headers,
            };
        }
        return config;
    },

    getAll(params, includeAuthorization = true) {
        const url = '/marketer/slider';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    update(data, includeAuthorization = true) {
        const url = `/marketer/slider/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data, authorizedConfig);
    },

    searchSortForSlider(params, includeAuthorization = true) {
        const url = '/marketer/slider/search_sort';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getAllWithTrueStatus(includeAuthorization = false) {
        const url = '/slider/true-status';
        const config = {};
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
    addSlider(data, includeAuthorization = true) {
        const url = '/marketer/slider';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },
    changeSliderStatus(id, includeAuthorization = true) {
        const url = `/marketer/slider/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
};

export default SliderAPI;
