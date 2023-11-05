import axiosClinet from './AxiosClient';

const NestUsageHistoryAPI = {
    add(data) {
        const url = `/customer/nest-usage-history`;
        return axiosClinet.post(url, data);
    },
};

export default NestUsageHistoryAPI;
