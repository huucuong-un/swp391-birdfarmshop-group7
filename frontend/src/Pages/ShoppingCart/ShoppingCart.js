import { Button, ButtonGroup } from '@chakra-ui/react';

import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/ShoppingCart/ShoppingCart.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShoppingCart() {
    const [carts, setCarts] = useState([]);
    const [choosenCart, setChoosenCart] = useState([]);

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

    let totalPrice = 0;

    if (carts != null) {
        // Duyệt qua mảng carts và tính tổng giá cho các cartItem đã được kiểm tra (checked)
        carts.forEach((cartItem) => {
            const checkbox = document.getElementById(`checkbox-${cartItem.id}`);
            if (checkbox) {
                if (checkbox.checked) {
                    // Tính giá của một cart-left-item đã được kiểm tra
                    const itemPrice = cartItem.price * cartItem.quantity;

                    // Cộng vào tổng giá
                    totalPrice += itemPrice;
                }
            }
        });
    } else {
        totalPrice = 0;
    }

    let totalItem = 0;

    if (carts != null) {
        // Duyệt qua mảng carts và tính tổng giá cho các cartItem đã được kiểm tra (checked)
        carts.forEach((cartItem) => {
            const checkbox = document.getElementById(`checkbox-${cartItem.id}`);

            if (checkbox) {
                if (checkbox.checked) {
                    // Cộng vào tổng giá
                    totalItem += 1;
                }
            }
        });
    } else {
        totalPrice = 0;
    }

    const handleCheckBoxOnClick = (cartItem) => {
        const checkbox = document.getElementById(`checkbox-${cartItem.id}`);
        if (checkbox) {
            if (checkbox.checked) {
                // Nếu checkbox đã được kiểm tra, thêm dữ liệu vào choosenCart
                setChoosenCart([...choosenCart, cartItem]);
            } else {
                // Nếu checkbox đã bị uncheck, loại bỏ dữ liệu khỏi choosenCart
                const updatedChoosenCart = choosenCart.filter((item) => item.id !== cartItem.id);
                setChoosenCart(updatedChoosenCart);
            }
        }

        console.log(carts);
    };

    useEffect(() => {
        console.log(choosenCart);
    }, [choosenCart]);

    const handleRemoveCart = (index) => {
        // Sử dụng filter để tạo một mảng mới loại bỏ đối tượng tại chỉ mục index
        const updatedCarts = carts.filter((_, i) => i !== index);

        // Cập nhật mảng carts với mảng mới đã loại bỏ đối tượng
        setCarts(updatedCarts);

        // Cập nhật Local Storage để đồng bộ hóa dữ liệu
        updateLocalStorage(updatedCarts);
    };

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
                            <p>{carts ? carts.length : 0} items</p>
                        </div>
                    </div>
                    {carts &&
                        carts.map((cartItem, index) => (
                            <div key={index} className={cx('carft-left-item')}>
                                <input
                                    id={`checkbox-${index}`}
                                    className={cx('carft-left-item-checkbox')}
                                    type="checkbox"
                                    onChange={() =>
                                        handleCheckBoxOnClick({
                                            id: index,
                                            img: cartItem.img,
                                            name: cartItem.name,
                                            quantity: cartItem.quantity,
                                            price: cartItem.price,
                                            color: cartItem.color,
                                            colorID: cartItem.colorID,
                                        })
                                    }
                                />
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
                                    <button onClick={() => handleRemoveCart(index)}>x</button>
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
                                <p>{totalItem} item</p>
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
                                <p>$ {totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('check-out-btn')}>
                        <Link to="/payment" state={choosenCart}>
                            <Button colorScheme="yellow" size="lg" width={300} height={20} fontSize={16}>
                                Check Out
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
