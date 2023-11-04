import axiosClinet from './AxiosClient';

const OTPAPI = {
    getOTP(email, code) {
        const url = '/OTP/find-one-by-code-and-email';
        return axiosClinet.get(url, {
            params: {
                email: email,
                code: code,
            }
        });
    },
};
export default OTPAPI;
