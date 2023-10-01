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

import { useEffect, useState } from 'react';

import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import OrderAPI from '~/Api/OrderAPI';

const cx = classNames.bind(styles);

function OrderHistory() {
    const [orderOfUserId, setOrderOfUserId] = useState([]);
    const [tempAllByOrderId, setTempAllByOrderId] = useState([]);
    const [tempFindByParrotIds, setTempFindByParrotIds] = useState([]);
    const [tempFindOneSpeciesByParrotId, setTempFindOneSpeciesByParrotId] = useState([]);
    const [combineDatas, setCombineDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tempAllByOrderId = [];

                for (const item of orderOfUserId) {
                    const findAllByOrderId = await OrderAPI.findAllByOrderId(item.id);
                    tempAllByOrderId.push(...findAllByOrderId);
                }

                setTempAllByOrderId(tempAllByOrderId);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [orderOfUserId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listFindByParrotId = [];

                for (const item of tempAllByOrderId) {
                    const findByParrotId = await ParrotSpeciesColorAPI.findByParrotId(item.parrotId);
                    listFindByParrotId.push(...findByParrotId);
                    // setTempFindByParrotId(...findByParrotId);
                }

                setTempFindByParrotIds(listFindByParrotId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [tempAllByOrderId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listFindOneSpeciesByParrotId = [];

                for (const item of tempAllByOrderId) {
                    const findOneSpeciesByParrotId = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(
                        item.parrotId,
                    );
                    listFindOneSpeciesByParrotId.push(...findOneSpeciesByParrotId);
                }
                setTempFindOneSpeciesByParrotId(listFindOneSpeciesByParrotId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [tempAllByOrderId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];

                for (const item of tempFindByParrotIds) {
                    const parrot = { ...item };
                    parrot.tempFindOneSpeciesByParrotIds = tempFindOneSpeciesByParrotId;
                    data.push(parrot);
                }

                setCombineDatas(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [tempFindOneSpeciesByParrotId, tempFindByParrotIds]);

    useEffect(() => {
        const getOrderByUserId = async () => {
            try {
                const orderByUserId = await OrderAPI.findAllByUserId();
                setOrderOfUserId(orderByUserId);
                // console.log(orderOfUserId);

                // const tempAllByOrderId = [];

                // for (const item of orderOfUserId) {
                //     const findAllByOrderId = await OrderAPI.findAllByOrderId(item.id);
                //     tempAllByOrderId.push(...findAllByOrderId);
                //     console.log(tempAllByOrderId);
                // }

                // const listFindByParrotId = [];

                // for (const item of tempAllByOrderId) {
                //     console.log(item.parrotId);
                //     const findByParrotId = await ParrotSpeciesColorAPI.findByParrotId(item.parrotId);
                //     listFindByParrotId.push(...findByParrotId);
                //     // setTempFindByParrotId(...findByParrotId);
                // }

                // setTempFindByParrotIds(listFindByParrotId);

                // const listFindOneSpeciesByParrotId = [];

                // for (const item of tempAllByOrderId) {
                //     const findOneSpeciesByParrotId = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(
                //         item.parrotId,
                //     );
                //     listFindOneSpeciesByParrotId.push(...findOneSpeciesByParrotId);
                // }
                // setTempFindOneSpeciesByParrotId(listFindOneSpeciesByParrotId);

                // const data = [];

                // for (const item of tempFindByParrotIds) {
                //     const parrot = { ...item };
                //     parrot.tempFindOneSpeciesByParrotIds = tempFindOneSpeciesByParrotId;
                //     data.push(parrot);
                // }

                // setCombineDatas(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm getParrots khi component được mount
        getOrderByUserId();
    }, []);

    useEffect(() => {
        console.log(combineDatas); // Log sau khi combineDatas đã được cập nhật
    }, [combineDatas]);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Order History</StartPartPage>
            <SortSpace></SortSpace>
            {/* {tempFindByParrotId.map((item, index) => (
                <div className={cx('inner')}>
                    <div className={cx('create-at')}>
                        <p>{item.createdDate}</p>
                    </div>
                    <div className={cx('order-items')}>
                        <div className={cx('order-item-img')}>
                            <img src={item.imageUrl} alt="main-img" />
                        </div>
                        <div className={cx('order-item-info-container')}>
                            <p className={cx('order-item-info-title')}>Jungle Parrot</p>
                            <p className={cx('order-item-info-quantity')}>x2</p>
                        </div>
                        <div className={cx('order-item-price')}>$6000</div>
                    </div>
                    <div className={cx('total-container')}>
                        <p>{item.price}</p>
                    </div>
                </div>
            ))} */}

            <div className={cx('inner', 'row')}>
                {combineDatas.map((data, index) => (
                    <div key={index} className={cx('order-card', 'col-lg-3')}>
                        <div className={cx('order-begin')}>
                            <div className={cx('order-index')}>
                                <p>Order #{data.id}</p>
                            </div>

                            <div className={cx('order-date')}>
                                <p>23 Feb 2021. 08:28 PM</p>
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
                                    <div className={cx('order-item')}>
                                        <div className={cx('order-item-img')}>
                                            <img
                                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                                alt="order-item-img"
                                            />
                                        </div>

                                        <div className={cx('order-item-info')}>
                                            {data.tempFindOneSpeciesByParrotIds.map((parrot, parrotIndex) => (
                                                <div key={parrotIndex} className={cx('order-item-info-title')}>
                                                    <p>{parrot.name}</p>
                                                </div>
                                            ))}

                                            <div className={cx('order-item-info-color')}>
                                                <p>{data.color}</p>
                                            </div>

                                            <div className={cx('order-item-info-price-and-quantity')}>
                                                <div className={cx('price')}>
                                                    <p>${data.price}</p>
                                                </div>

                                                <div className={cx('quantity')}>
                                                    <p>x1</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>

                        <div className={cx('order-bottom')}>
                            <div className="order-bottom-left">
                                <div className={cx('order-total-quantity-and-price')}>
                                    <div className={cx('total-quantity')}>
                                        <p>X2 items</p>
                                    </div>
                                    <div className={cx('total-price')}>
                                        <p>$10.60</p>
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

                {/* <div className={cx('order-card', 'col-lg-3')}>
                    <div className={cx('order-begin')}>
                        <div className={cx('order-index')}>
                            <p>Order #351</p>
                        </div>

                        <div className={cx('order-date')}>
                            <p>23 Feb 2021. 08:28 PM</p>
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
                                <div className={cx('order-item')}>
                                    <div className={cx('order-item-img')}>
                                        <img
                                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="order-item-img"
                                        />
                                    </div>

                                    <div className={cx('order-item-info')}>
                                        <div className={cx('order-item-info-title')}>
                                            <p>Jungle Parrot</p>
                                        </div>

                                        <div className={cx('order-item-info-color')}>
                                            <p>Green</p>
                                        </div>

                                        <div className={cx('order-item-info-price-and-quantity')}>
                                            <div className={cx('price')}>
                                                <p>$5.30</p>
                                            </div>

                                            <div className={cx('quantity')}>
                                                <p>Qty: 1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('order-item')}>
                                    <div className={cx('order-item-img')}>
                                        <img
                                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="order-item-img"
                                        />
                                    </div>

                                    <div className={cx('order-item-info')}>
                                        <div className={cx('order-item-info-title')}>
                                            <p>Jungle Parrot</p>
                                        </div>

                                        <div className={cx('order-item-info-color')}>
                                            <p>Green</p>
                                        </div>

                                        <div className={cx('order-item-info-price-and-quantity')}>
                                            <div className={cx('price')}>
                                                <p>$5.30</p>
                                            </div>

                                            <div className={cx('quantity')}>
                                                <p>Qty: 1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <div className={cx('order-bottom')}>
                        <div className="order-bottom-left">
                            <div className={cx('order-total-quantity-and-price')}>
                                <div className={cx('total-quantity')}>
                                    <p>X2 items</p>
                                </div>
                                <div className={cx('total-price')}>
                                    <p>$10.60</p>
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
                </div> */}
            </div>
        </div>
    );
}

export default OrderHistory;
