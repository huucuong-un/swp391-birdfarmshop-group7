import { Button, ButtonGroup, Text } from '@chakra-ui/react';
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
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import SortSpace from '~/Components/SortSpace/SortSpace';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '~/Pages/OrderHistory/OrderHistory.module.scss';

import { ShopState } from '~/context/ShopProvider';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';

import React, { useEffect, useState } from 'react';

import OrderAPI from '~/Api/OrderAPI';

const cx = classNames.bind(styles);

function OrderHistory() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [orders, setOrders] = useState([]);
    const [loggedUser, setLoggedUser] = useState();

    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
                console.log(orderList);
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
                                <h2>Order #{order.orderDTO.id}</h2>
                                <Text size="lg" color={'green'}>
                                    Complete
                                </Text>
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
                                            <h4 className="title">Order Items</h4>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {order.listOrderDetailHistoryModel.map((parrot, parrotIndex) => (
                                        <div key={parrotIndex} className={cx('order-item')}>
                                            <div className={cx('order-item-index')}>{parrotIndex + 1}</div>

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
                                                        <p>${parrot.price}</p>
                                                    </div>

                                                    <div className={cx('quantity')}>
                                                        <p>x{parrot.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <div className={cx('order-bottom')}>
                            <div className={cx('order-bottom-left')}>
                                <div className={cx('order-total-quantity-and-price')}>
                                    <div className={cx('total-quantity')}>
                                        <h3>Total</h3>
                                    </div>
                                    <div className={cx('total-price')}>
                                        <p>${order.orderDTO.totalPrice}</p>
                                    </div>
                                </div>
                                <div className={cx('rating-btn')}>
                                    <Button
                                        colorScheme="blue"
                                        size="lg"
                                        fontSize={'15px'}
                                        onClick={() => {
                                            setOverlay(<OverlayOne />);
                                            onOpen();
                                        }}
                                    >
                                        Feedback
                                    </Button>
                                    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
                                        {overlay}
                                        <ModalContent>
                                            <ModalHeader>Rate Product</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <div className={cx('rate-area')}>
                                                    <div className={cx('product-container')}>
                                                        <div className={cx('product-img')}>
                                                            <img
                                                                src="https://images.unsplash.com/photo-1630159914088-a1895c434cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                                                alt="product-img"
                                                            />
                                                        </div>
                                                        <div className={cx('product-info')}>
                                                            <div className={cx('product-title')}>
                                                                <p>Ronaldo</p>
                                                            </div>
                                                            <div className={cx('product-type')}>
                                                                <p>Category: yellow</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={cx('rating-star-container')}>
                                                        <div className={cx('rating-star-title')}>
                                                            <p>Product Quality:</p>
                                                        </div>
                                                        <div className={cx('rating-star-icon')}>
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </div>
                                                    </div>

                                                    <div className={cx('rating-input')}>
                                                        <p>Description:</p>
                                                        <textarea maxLength={100} />
                                                    </div>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter className={cx('button-footer')}>
                                                <Button>Save</Button>
                                                <Button onClick={onClose}>Close</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    {/* <Modal isOpen={isOpen} onClose={onClose} w>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Rate Product</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                                    Close
                                                </Button>
                                                <Button variant="ghost">Secondary Action</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal> */}
                                </div>
                            </div>
                            {/* <div className={cx('order-bottom-right')}>
                                <div className={cx('buy-again-btn')}>
                                    <Button colorScheme="blue" size="lg" fontSize={'15px'}>
                                        Buy again
                                    </Button>
                                </div>

                                <div className={cx('status')}>
                                    <Button colorScheme="green" size="lg">
                                        Complete
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderHistory;
