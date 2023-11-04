import axiosClient from './AxiosClient';

const PostAPI = {
    getAll(params) {
        const url = '/marketer/post';
        return axiosClient.get(url, { params });
    },
    searchSortForPost(params) {
        const url = '/marketer/post/search_sort';
        return axiosClient.get(url, { params });
    },

    get(params) {
        const url = `/marketer/post/find-one-by-id`;
        return axiosClient.get(url, { params });
    },
    update(data) {
        const url = `/marketer/post/${data.id}`;
        return axiosClient.put(url, data);
    },
    getAllByTrueStatus() {
        const url = `/post/true-status`;
        return axiosClient.get(url);
    },
    addPost(data) {
        const url = `/marketer/post`;
        return axiosClient.post(url, data);
    },
    changePostStatus(id) {
        const url = `/marketer/post/${id}`;
        return axiosClient.delete(url);
    },
};

export default PostAPI;
