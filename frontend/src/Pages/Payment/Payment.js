import classNames from 'classnames/bind';
import styles from '~/Pages/Payment/Payment.module.scss';

import Button from '~/Components/Button/Button';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';

import { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import OrderAPI from '~/Api/OrderAPI';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import DeliveryInformation from '../DeliveryInformation/DeliveryInformation';
import { ShopState } from '~/context/ShopProvider';

const cx = classNames.bind(styles);

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [listOrder, setListOrder] = useState([]);
    const location = useLocation();
    const receivedData = location.state;

    // const quantity = receivedData.quantities[1] || 0;
    // const quantity = receivedData && receivedData.quantities ? receivedData.quantities[1] : 0;
    // const pricePerItem = receivedData.selectedColor[1].price;
    // const pricePerItem = receivedData && receivedData.selectedColor ? receivedData.selectedColor[1].price || 0 : 0;
    // const quantity = receivedData.quantities[1];
    // const pricePerItem = receivedData.selectedColor[1].price;
    const [payStatus, setPayStatus] = useState(false);
    const [selectedDelivery, setSelectedDelivery] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);
    const { user } = ShopState();

    const handlePaymentSelection = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
        console.log(paymentMethod);
    };

    const handlePayStatus = async () => {
        setPayStatus(true);
        console.log('click');
    };

    useEffect(() => {
        setListOrder(receivedData);
    }, []);

    useEffect(() => {
        // Tính tổng giá trị từ các mục trong danh sách đơn hàng
        let totalPrice = 0;
        listOrder.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        // Cập nhật giá trị của totalPrice
        setTotalPrice(totalPrice);
    }, [listOrder]);

    console.log(receivedData);

    useEffect(() => {
        const addOrders = async () => {
            try {
                const cartList = receivedData.map((item, index) => ({
                    speicesId: item.colorID, // Sử dụng item.colorID thay vì receivedData.colorID
                    quantity: item.quantity,
                    type: 'parrot',
                }));

                console.log(cartList);
                const data = {
                    orderDTO: {
                        userID: 1,
                        // address: selectedDelivery.address,
                        address: 'haha',
                        // userID: user.userId,
                        // address: selectedDelivery.address,
                        status: true,
                    },
                    cartList: cartList,
                };

                // await DeliveryInformationAPI.updatePickingStatus(1, selectedDelivery);

                // await DeliveryInformationAPI.updatePickingStatus(user.userId, selectedDelivery, config);
                const addOrder = await OrderAPI.add(data);
                console.log('Order added:', addOrder);
            } catch (error) {
                console.error(error);
            }
        };

        if (payStatus) {
            addOrders();
        }
    }, [payStatus]);

    // let totalPrice = 0;

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
                            <input
                                placeholder="Address"
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className={cx('delivery-info-component')}>
                        <DeliveryInformation
                            selectedDelivery={selectedDelivery}
                            setSelectedDelivery={setSelectedDelivery}
                        />
                    </div>
                </div>
                <div className={cx('payment-detail', 'col-md-4')}>
                    {listOrder.map((item, index) => (
                        <div key={index} className={cx('payment-detail-items')}>
                            <div className={cx('payment-detail-items-img')}>
                                <img src={item.img} alt="product" />
                            </div>
                            <p className={cx('payment-detail-items-quantity')}>x{item.quantity}</p>
                            <p className={cx('payment-detail-items-price')}>$ {item.price * item.quantity}</p>
                        </div>
                    ))}

                    <div className={cx('payment-detail-promotions')}>
                        <input type="text" placeholder="Discount code" />
                        <button>Apply</button>
                    </div>

                    <div className={cx('payment-detail-money')}>
                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Subtotal</p>
                            <p className={cx('payment-detail-money-item-price')}>$ {totalPrice}</p>
                        </div>

                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Discount</p>
                            <p className={cx('payment-detail-money-item-price')}>$ 0</p>
                        </div>

                        <div className={cx('payment-detail-money-item', 'total')}>
                            <p className={cx('payment-detail-money-item-title', 'bold')}>Total</p>
                            <p className={cx('payment-detail-money-item-price')}>$ {totalPrice}</p>
                        </div>
                    </div>
                    <Button to="" className={cx('pay-btn')} onClick={() => handlePayStatus()}>
                        Pay
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
