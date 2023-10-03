import { Button, ButtonGroup } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/ShoppingCart/ShoppingCart.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ShoppingCart() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const dataJSON = localStorage.getItem('parrot');
        const data = JSON.parse(dataJSON);
        setCarts(data);
    }, []);

    const handleIncreaseQuantity = (index) => {
        const updatedCarts = [...carts];
        updatedCarts[index].quantity += 1;
        setCarts(updatedCarts);
        // Cập nhật local storage
        updateLocalStorage(updatedCarts);
    };

    // Hàm giảm số lượng
    const handleDecreaseQuantity = (index) => {
        const updatedCarts = [...carts];
        if (updatedCarts[index].quantity > 1) {
            updatedCarts[index].quantity -= 1;
            setCarts(updatedCarts);
            // Cập nhật local storage
            updateLocalStorage(updatedCarts);
        }
    };

    // Hàm cập nhật local storage với dữ liệu mới
    const updateLocalStorage = (updatedCarts) => {
        localStorage.setItem('parrot', JSON.stringify(updatedCarts));
    };

    // Tạo biến để lưu tổng giá
    let totalPrice = 0;

    // Duyệt qua mảng carts và tính tổng giá
    carts.forEach((cartItem) => {
        // Tính giá của một cart-left-item
        const itemPrice = cartItem.price * cartItem.quantity;

        // Cộng vào tổng giá
        totalPrice += itemPrice;
    });

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Shopping Cart</StartPartPage>

            <div className={cx('inner', 'row')}>
                <div className={cx('inner-left', 'col-lg-9')}>
                    <div className={cx('cart-left-header')}>
                        <div className={cx('cart-left-header-title')}>
                            <h1>My Cart</h1>
                        </div>
                        <div className={cx('cart-left-header-total-quantity')}>
                            <p>{carts.length} items</p>
                        </div>
                    </div>
                    {carts.map((cartItem, index) => (
                        <div key={index} className={cx('carft-left-item')}>
                            <input className={cx('carft-left-item-checkbox')} type="checkbox" />
                            <div className={cx('cart-left-item-image')}>
                                <img src={cartItem.img} alt="cart-left-item-img" />
                            </div>
                            <div className={cx('cart-left-item-info')}>
                                <div className={cx('cart-left-item-info-name')}>
                                    <p>{cartItem.name}</p>
                                </div>

                                <div className={cx('cart-left-item-info-color')}>
                                    <p>{cartItem.color}</p>
                                </div>
                            </div>

                            <div className={cx('cart-left-item-price')}>
                                <p>$ {cartItem.price}</p>
                            </div>
                            <div className={cx('cart-left-item-quantity-btn')}>
                                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <input type="number" value={cartItem.quantity} />
                                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                            </div>

                            <div className={cx('cart-left-item-price-with-quantity')}>
                                <p>$ {cartItem.quantity * cartItem.price}</p>
                            </div>

                            <div className={cx('carft-left-item-remove-btn')}>
                                <button>x</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cx('inner-right', 'col-lg-3')}>
                    <div className={cx('cart-right-header')}>
                        <h2>Summary</h2>
                    </div>

                    <div className={cx('cart-right-content')}>
                        <div className={cx('cart-right-total')}>
                            <div className={cx('cart-right-total-product')}>
                                <p>{carts.length} items</p>
                            </div>

                            <div className={cx('cart-right-total-price')}>
                                <p>$ {totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className={cx('cart-right-code')}>
                            <p>Give Code</p>
                            <div className={cx('input-container')}>
                                <input type="text" placeholder="Enter code..." />
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            </div>
                        </div>

                        <div className={cx('cart-right-final')}>
                            <div className={cx('cart-right-final-title')}>
                                <p>Total Price</p>
                            </div>
                            <div className={cx('cart-right-final-price')}>
                                <p>{totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('check-out-btn')}>
                        <Button colorScheme="yellow" size="lg" width={300} height={20} fontSize={16}>
                            Check Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
