import { Button, ButtonGroup } from '@chakra-ui/react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    MinusIcon,
    AddIcon,
} from '@chakra-ui/react';

import classNames from 'classnames/bind';
import SortSpace from '~/Components/SortSpace/SortSpace';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/OrderHistory/OrderHistory.module.scss';
import { ShopState } from '~/context/ShopProvider';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';

import { useEffect, useState } from 'react';

import OrderAPI from '~/Api/OrderAPI';

const cx = classNames.bind(styles);

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);
    const { user } = ShopState();
    const { addToCartStatus } = useCartStatus();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const orderList = await OrderAPI.findAllByUserId(user.userId);
                setOrders(orderList);
                console.log(orderList[0].orderDTO.createdDate);
            } catch (error) {
                console.error(error);
            }
        };

        getOrders();
    }, [loggedUser]);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Order History</StartPartPage>
            <SortSpace></SortSpace>

            <div className={cx('inner', 'row')}>
                {orders.map((order, index) => (
                    <div key={index} className={cx('order-card', 'col-lg-3')}>
                        <div className={cx('order-begin')}>
                            <div className={cx('order-index')}>
                                <p>Order #{order.orderDTO.id}</p>
                            </div>

                            <div className={cx('order-date')}>
                                <p>{order.orderDTO.createdDate}</p>
                            </div>
                        </div>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left">
                                            <h5 className="title">Order Items</h5>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {order.listOrderDetailHistoryModel.map((parrot, parrotIndex) => (
                                        <div key={parrotIndex} className={cx('order-item')}>
                                            <div className={cx('order-item-img')}>
                                                <img
                                                    src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                                    alt="order-item-img"
                                                />
                                            </div>

                                            <div className={cx('order-item-info')}>
                                                <div className={cx('order-item-info-title')}>
                                                    <p>{parrot.speciesName}</p>
                                                </div>

                                                <div className={cx('order-item-info-color')}>
                                                    <p>{parrot.color}</p>
                                                </div>

                                                <div className={cx('order-item-info-price-and-quantity')}>
                                                    <div className={cx('price')}>
                                                        <p>${parrot.totalPrice}</p>
                                                    </div>

                                                    <div className={cx('quantity')}>
                                                        <p>Qty: {parrot.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <div className={cx('order-bottom')}>
                            <div className="order-bottom-left">
                                <div className={cx('order-total-quantity-and-price')}>
                                    <div className={cx('total-quantity')}>
                                        <p>Total</p>
                                    </div>
                                    <div className={cx('total-price')}>
                                        <p>${order.orderDTO.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('order-bottom-right')}>
                                <div className={cx('buy-again-btn')}>
                                    <Button colorScheme="blue" size="lg">
                                        Buy again
                                    </Button>
                                </div>

                                <div className={cx('status')}>
                                    <Button colorScheme="green" size="lg">
                                        Complete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderHistory;
