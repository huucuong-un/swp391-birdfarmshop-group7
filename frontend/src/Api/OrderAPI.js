import axiosClinet from './AxiosClient';

const OrderAPI = {
    getAll(params) {
        const url = '/admin/order/order_management/list'; //done
        return axiosClinet.get(url, { params });
    },
    getOneByUsageHistory(id) {
        const url = `/staff/order/find-one-by-usage-history-id/${id}`; //done
        return axiosClinet.get(url);
    },
    searchByEmailAndPhone(params) {
        const url = '/staff/order/order_management/search'; //done
        return axiosClinet.get(url, { params });
    },

    findAllByUserIdAndSearchSort(params) {
        const url = `/customer/order/order-history-search-sort`; //done
        return axiosClinet.get(url, { params });
    },

    findAllByOrderId(id) {
        const url = `/orderdetail/findAllByOrderId/${id}`;
        return axiosClinet.get(url);
    },

    findAllOrderWithUser() {
        const url = '/order/find-all-order-with-user';
        return axiosClinet.post(url);
    },

    add(data) {
        const url = `/customer/order/cart`;
        return axiosClinet.post(url, data);
    },

    //count
    totalItem(params) {
        const url = '/order/total-item';
        return axiosClinet.get(url, { params });
    },
    totalItemInCurrentDay(params) {
        const url = '/order/total-item-in-current-day';
        return axiosClinet.get(url, { params });
    },
    totalItemInCurrentMonth(params) {
        const url = '/order/total-item-in-current-month';
        return axiosClinet.get(url, { params });
    },
    totalItemInCurrentYear(params) {
        const url = '/order/total-item-in-current-year';
        return axiosClinet.get(url, { params });
    },
    //total-price
    totalPriceInCurrentDay(params) {
        const url = '/order/total-price-in-current-day';
        return axiosClinet.get(url, { params });
    },
    totalPriceInCurrentMonth(params) {
        const url = '/order/total-price-in-current-month';
        return axiosClinet.get(url, { params });
    },
    totalPriceInCurrentYear(params) {
        const url = '/order/total-price-in-current-year';
        return axiosClinet.get(url, { params });
    },
    totalPriceInJanuary(params) {
        const url = '/order/total-price-in-january';
        return axiosClinet.get(url, { params });
    },
    totalPriceInFebruary(params) {
        const url = '/order/total-price-in-February';
        return axiosClinet.get(url, { params });
    },
    totalPriceInMarch(params) {
        const url = '/order/total-price-in-March';
        return axiosClinet.get(url, { params });
    },
    totalPriceInApril(params) {
        const url = '/order/total-price-in-April';
        return axiosClinet.get(url, { params });
    },
    totalPriceInMay(params) {
        const url = '/order/total-price-in-May';
        return axiosClinet.get(url, { params });
    },
    totalPriceInJune(params) {
        const url = '/order/total-price-in-June';
        return axiosClinet.get(url, { params });
    },
    totalPriceInJuly(params) {
        const url = '/order/total-price-in-July';
        return axiosClinet.get(url, { params });
    },
    totalPriceInAugust(params) {
        const url = '/order/total-price-in-August';
        return axiosClinet.get(url, { params });
    },
    totalPriceInSeptember(params) {
        const url = '/order/total-price-in-September';
        return axiosClinet.get(url, { params });
    },
    totalPriceInOctober(params) {
        const url = '/order/total-price-in-October';
        return axiosClinet.get(url, { params });
    },
    totalPriceInNovember(params) {
        const url = '/order/total-price-in-November';
        return axiosClinet.get(url, { params });
    },
    totalPriceInDecember(params) {
        const url = '/order/total-price-in-December';
        return axiosClinet.get(url, { params });
    },
};

export default OrderAPI;
