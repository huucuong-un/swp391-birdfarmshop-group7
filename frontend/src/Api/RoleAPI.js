import axiosClient from './AxiosClient';

const RoleAPI = {
    getRoles() {
        const url = '/role';
        return axiosClient.get(url);
    },

    getRolesForAdmin() {
        const url = '/admin/role';
        return axiosClient.get(url);
    },

    addRole(data) {
        const url = '/admin/role';
        return axiosClient.post(url, data);
    },

    updateRole(data, roleId) {
        const url = `/admin/role/${roleId}`;
        return axiosClient.put(url, data);
    },

    changeRoleStatus(roleId) {
        const url = `/admin/role/${roleId}`;
        return axiosClient.delete(url);
    },
};

export default RoleAPI;
