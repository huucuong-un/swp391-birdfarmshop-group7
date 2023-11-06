import axiosClient from './AxiosClient';

const PostAPI = {
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
        const url = '/marketer/post';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    searchSortForPost(params, includeAuthorization = true) {
        const url = '/marketer/post/search_sort';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    get(params, includeAuthorization = true) {
        const url = `/marketer/post/find-one-by-id`;
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    update(data, includeAuthorization = true) {
        const url = `/marketer/post/${data.id}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data);
    },

    getAllByTrueStatus(includeAuthorization = true) {
        const url = `/post/true-status`;
        const config = {};
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    addPost(data, includeAuthorization = true) {
        const url = `/marketer/post`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data);
    },

    changePostStatus(id, includeAuthorization = true) {
        const url = `/marketer/post/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
};

export default PostAPI;
