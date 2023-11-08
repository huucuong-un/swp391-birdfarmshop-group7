import axiosClient from './AxiosClient';

const RoleAPI = {
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

    getRoles(params, includeAuthorization = false) {
        const url = '/role';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, includeAuthorization); // Use this to access the method
        return axiosClient.get(url, authorizedConfig);
    },

    getRolesForAdmin(params) {
        const url = '/admin/role';
        const config = { params };
        const authorizedConfig = this.addAuthorizationHeader(config, true); // Always include authorization for /admin routes
        return axiosClient.get(url, authorizedConfig);
    },

    addRole(data, includeAuthorization = false) {
        const url = '/admin/role';
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    updateRole(data, roleId, includeAuthorization = true) {
        const url = `/admin/role/${roleId}`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.put(url, authorizedConfig.data, authorizedConfig);
    },

    changeRoleStatus(roleId, includeAuthorization = true) {
        const url = `/admin/role/${roleId}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.delete(url, authorizedConfig);
    },
    getRoleName(roleId, includeAuthorization = false) {
        const url = `/role/find-one-by-id/${roleId}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default RoleAPI;
