import axiosClinet from './AxiosClient';

const RegisterAPI = {
    add(data) {
        const url = '/user/register';
        return axiosClinet.post(url, data);
    },
};

export default RegisterAPI;
