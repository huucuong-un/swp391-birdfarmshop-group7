import axiosClient from './AxiosClient';
const OrderAPI = {
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
        const url = '/admin/order/order_management/list';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    getOneByUsageHistory(id, includeAuthorization = true) {
        const url = `/staff/order/find-one-by-usage-history-id/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    searchByEmailAndPhone(params, includeAuthorization = true) {
        const url = '/staff/order/order_management/search';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findAllByUserIdAndSearchSort(params, includeAuthorization = true) {
        const url = `/customer/order/order-history-search-sort`;
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findAllByOrderId(id, includeAuthorization = true) {
        const url = `/customer/orderdetail/findAllByOrderId/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findAllOrderWithUser(includeAuthorization = false) {
        const url = '/order/find-all-order-with-user';
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.post(url, authorizedConfig);
    },

    add(data, includeAuthorization = true) {
        const url = `/customer/order/cart`;
        const authorizedConfig = this.addAuthorizationHeader({ data }, includeAuthorization);
        return axiosClient.post(url, authorizedConfig.data, authorizedConfig);
    },

    // Count
    totalItem(params, includeAuthorization = false) {
        const url = '/order/total-item';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalItemInCurrentDay(params, includeAuthorization = false) {
        const url = '/order/total-item-in-current-day';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalItemInCurrentMonth(params, includeAuthorization = false) {
        const url = '/order/total-item-in-current-month';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalItemInCurrentYear(params, includeAuthorization = false) {
        const url = '/order/total-item-in-current-year';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    // Total Price
    totalPriceInCurrentDay(params, includeAuthorization = false) {
        const url = '/order/total-price-in-current-day';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInCurrentMonth(params, includeAuthorization = false) {
        const url = '/order/total-price-in-current-month';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInCurrentYear(params, includeAuthorization = false) {
        const url = '/order/total-price-in-current-year';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInJanuary(params, includeAuthorization = false) {
        const url = '/order/total-price-in-january';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInFebruary(params, includeAuthorization = false) {
        const url = '/order/total-price-in-February';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInMarch(params, includeAuthorization = false) {
        const url = '/order/total-price-in-March';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInApril(params, includeAuthorization = false) {
        const url = '/order/total-price-in-April';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInMay(params, includeAuthorization = false) {
        const url = '/order/total-price-in-May';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInJune(params, includeAuthorization = false) {
        const url = '/order/total-price-in-June';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInJuly(params, includeAuthorization = false) {
        const url = '/order/total-price-in-July';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInAugust(params, includeAuthorization = false) {
        const url = '/order/total-price-in-August';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInSeptember(params, includeAuthorization = false) {
        const url = '/order/total-price-in-September';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInOctober(params, includeAuthorization = false) {
        const url = '/order/total-price-in-October';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInNovember(params, includeAuthorization = false) {
        const url = '/order/total-price-in-November';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    totalPriceInDecember(params, includeAuthorization = false) {
        const url = '/order/total-price-in-December';
        const authorizedConfig = this.addAuthorizationHeader({ params }, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    countSoldProduct(id, includeAuthorization = false) {
        const url = `/orderdetail/count-sold-product/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },

    findOneOrderModelById(id, includeAuthorization = false) {
        const url = `/admin/order/find-one-by-order-id-for-detail/${id}`;
        const authorizedConfig = this.addAuthorizationHeader({}, includeAuthorization);
        return axiosClient.get(url, authorizedConfig);
    },
};

export default OrderAPI;
