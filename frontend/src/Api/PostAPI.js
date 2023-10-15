import axiosClinet from './AxiosClient';

const PostAPI = {
    getAll(params) {
        const url = '/post';
        return axiosClinet.get(url, { params });
    },

    get(params) {
        const url = `/post/find-one-by-id`;
        return axiosClinet.get(url, { params });
    },
};

export default PostAPI;
