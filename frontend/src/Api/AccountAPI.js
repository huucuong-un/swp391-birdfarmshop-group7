import axiosClient from './AxiosClient';

const AccountAPI = {
    getAccounts() {
        const url = '/admin/user';
        return axiosClient.get(url);
    },

    addAccount(data) {
        const url = '/admin/user';
        return axiosClient.post(url, data);
    },

    changeAccountStatus(id) {
        const url = `/admin/user/${id}`;
        return axiosClient.delete(url);
    },
};

export default AccountAPI;
