import classNames from 'classnames/bind';
import styles from '~/Pages/Payment/Payment.module.scss';

import Button from '~/Components/Button/Button';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';

import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import OrderAPI from '~/Api/OrderAPI';
import { Center, Flex, Radio, Square, Text } from '@chakra-ui/react';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import DeliveryInformation from '../DeliveryInformation/DeliveryInformation';

const cx = classNames.bind(styles);

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const location = useLocation();
    const receivedData = location.state;
    const quantity = receivedData.quantities[1];
    const pricePerItem = receivedData.selectedColor[1].price;
    const [payStatus, setPayStatus] = useState(false);
    const dataToPass = receivedData;
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState({});

    const totalPrice = quantity * pricePerItem;
    // console.log(totalPrice);
    // console.log(receivedData);

    for (const key in receivedData) {
        const value = receivedData[key];
        console.log(`${key}: ${value}`);
    }

    // console.log(receivedData.selectedColor[1].price);

    const handlePaymentSelection = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
        console.log(paymentMethod);
    };

    const handlePayStatus = () => {
        setPayStatus(true);
        console.log(payStatus);
    };

    useEffect(() => {
        const addOrders = async () => {
            try {
                const addOrder = await OrderAPI.add(
                    {
                        userID: 1,
                        address: 'helo',
                        promotionID: 1,
                        status: true,
                        quantity: 3,
                    },
                    1,
                );
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm getParrots khi component được mount
        addOrders();
    }, [payStatus]);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage payment>Payment</StartPartPage>

            <div className={cx('payment', 'row')}>
                <div className={cx('payment-method', 'col-md-8')}>
                    <div className={cx('payment-method-title')}>
                        <p>Payment method</p>
                    </div>

                    <div className={cx('payment-method-item-container')}>
                        <button className={cx('payment-method-item')} onClick={() => handlePaymentSelection('paypal')}>
                            PayPal
                        </button>
                        <button className={cx('payment-method-item')} onClick={() => handlePaymentSelection('cod')}>
                            COD
                        </button>
                    </div>

                    {/* <div className={cx('payment-method-input-container')}>
                        <div className={cx('payment-method-input')}>
                            <p>Contact</p>
                            <input placeholder="Name" type="text" required />
                            <input placeholder="Phone" type="text" required />
                        </div>

                        <div className={cx('payment-method-input')}>
                            <p>Delivery</p>
                            <input placeholder="City, district" type="text" required />
                            <input placeholder="Address" type="text" required />
                        </div>
                    </div> */}
                    <div className={cx('delivery-info-component')}>
                        <DeliveryInformation></DeliveryInformation>
                    </div>

                    <Button to="" className={cx('pay-btn')} onClick={() => handlePayStatus()}>
                        Pay now
                    </Button>
                </div>
                <div className={cx('payment-detail', 'col-md-4')}>
                    <div className={cx('payment-detail-items')}>
                        <div className={cx('payment-detail-items-img')}>
                            <img src={receivedData.combineData[0].img} alt="product" />
                        </div>
                        <p className={cx('payment-detail-items-quantity')}>x{receivedData.quantities[1]}</p>
                        <p className={cx('payment-detail-items-price')}>{receivedData.selectedColor[1].price} VNĐ</p>
                    </div>

                    <div className={cx('payment-detail-promotions')}>
                        <input type="text" placeholder="Discount code" />
                        <button>Apply</button>
                    </div>

                    <div className={cx('payment-detail-money')}>
                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Subtotal</p>
                            <p className={cx('payment-detail-money-item-price')}>{totalPrice} VNĐ</p>
                        </div>

                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Discount</p>
                            <p className={cx('payment-detail-money-item-price')}>0</p>
                        </div>

                        <div className={cx('payment-detail-money-item', 'total')}>
                            <p className={cx('payment-detail-money-item-title', 'bold')}>Total</p>
                            <p className={cx('payment-detail-money-item-price')}>{totalPrice} VNĐ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
