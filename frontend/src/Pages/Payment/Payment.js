import Breadcrumbs from '~/Components/Breadcrumbs/Breadcrumbs';

import classNames from 'classnames/bind';
import styles from '~/Pages/Payment/Payment.module.scss';

import Button from '~/Components/Button/Button';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import parrotImg from '~/Assets/image/SelectProduct/Grey-Parrot-PNG-Download-Image.png';

import { useState } from 'react';

const cx = classNames.bind(styles);

function Payment() {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handlePaymentSelection = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
        console.log(paymentMethod);
    };

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

                    <div className={cx('payment-method-input-container')}>
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
                    </div>

                    <Button to="" className={cx('pay-btn')}>
                        Pay now
                    </Button>
                </div>
                <div className={cx('payment-detail', 'col-md-4')}>
                    <div className={cx('payment-detail-items')}>
                        <div className={cx('payment-detail-items-img')}>
                            <img src={parrotImg} alt="product" />
                        </div>
                        <p className={cx('payment-detail-items-quantity')}>x2</p>
                        <p className={cx('payment-detail-items-price')}>15 000 000 VNĐ</p>
                    </div>

                    <div className={cx('payment-detail-promotions')}>
                        <input type="text" placeholder="Discount code" />
                        <button>Apply</button>
                    </div>

                    <div className={cx('payment-detail-money')}>
                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Subtotal</p>
                            <p className={cx('payment-detail-money-item-price')}>15 000 000 VNĐ</p>
                        </div>

                        <div className={cx('payment-detail-money-item')}>
                            <p className={cx('payment-detail-money-item-title')}>Discount</p>
                            <p className={cx('payment-detail-money-item-price')}>1 000 000 VNĐ</p>
                        </div>

                        <div className={cx('payment-detail-money-item', 'total')}>
                            <p className={cx('payment-detail-money-item-title', 'bold')}>Total</p>
                            <p className={cx('payment-detail-money-item-price')}>14 000 000 VNĐ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
