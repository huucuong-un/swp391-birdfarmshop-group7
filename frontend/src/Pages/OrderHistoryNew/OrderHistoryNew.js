import classNames from 'classnames/bind';
import FeedbackAPI from '~/Api/FeedbackAPI';
import styles from '~/Pages/OrderHistoryNew/OrderHistoryNew.module.scss';

import { Button, ButtonGroup, Center, Text } from '@chakra-ui/react';
import ButtonT from '~/Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    MinusIcon,
    AddIcon,
    Container,
    Image,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Divider,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';

import { ShopState } from '~/context/ShopProvider';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';

import OrderAPI from '~/Api/OrderAPI';
import Rate from '~/Components/Rate/Rate';
import UserAPI from '~/Api/UserAPI';
import { use } from 'i18next';
import NestAPI from '~/Api/NestAPI';

const cx = classNames.bind(styles);

function OrderHistoryNew() {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [textareaValue, setTextareaValue] = useState('');
    const [orders, setOrders] = useState([]);
    const [loggedUser, setLoggedUser] = useState();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    const btnRef = React.useRef();
    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
        console.log(textareaValue);
    };
    const [orderId, setOrderId] = useState({});
    const { user } = ShopState();
    const { addToCartStatus } = useCartStatus();
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        date: null,
        sortDate: null,
        sortPrice: null,
    });
    const [orderIdToGetUsage, setOrderIdToGetUsage] = useState(null);
    const [nestDevStatus, setNestDevStatus] = useState([]);
    const [usageHistoryByOrderId, setUsageHistoryByOrderId] = useState([]);
    const [nestDevWithUsageHistoryId, setNestDevWithUsageHistoryId] = useState([]);
    const [nestDevStatusWithSequenceToUseStepper, setNestDevStatusWithSequenceToUseStepper] = useState(1);

    const { activeStep } = useSteps({
        index: 1,
        count: nestDevStatus.length,
    });
    // const steps = [
    //     { title: 'Watiting for parrot', description: 'Contact Info' },
    //     { title: 'Parrot received', description: 'Date & Time' },
    //     { title: 'Inspecting', description: 'Select Rooms' },
    //     { title: 'Verification successful', description: 'Select Rooms' },
    //     { title: 'Start pairing', description: 'Select Rooms' },
    //     { title: 'Pregnant', description: 'Select Rooms' },
    //     { title: 'Gave birth', description: 'Select Rooms' },
    //     { title: 'Incubating', description: 'Select Rooms' },
    //     { title: 'Hatched', description: 'Select Rooms' },
    //     { title: 'Ready to deliver', description: 'Select Rooms' },
    //     { title: 'Delivered to the shipping unit', description: 'Select Rooms' },
    //     { title: 'Delivering to you', description: 'Select Rooms' },
    //     { title: 'Delivered successfully', description: 'Select Rooms' },
    // ];

    useEffect(() => {
        const getNestDevStatusList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 10000,
                };
                const nestDevStatusList = await NestAPI.getAllNestDevelopmentStatus(params);
                setNestDevStatus(nestDevStatusList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        getNestDevStatusList();
    }, []);

    useEffect(() => {
        const getUsageHistoryByOrderId = async () => {
            try {
                const usageHistoryByOrderId = await NestAPI.getOneByOrderId(orderIdToGetUsage);
                setUsageHistoryByOrderId(usageHistoryByOrderId);
            } catch (error) {
                console.error(error);
            }
        };

        if (show) {
            getUsageHistoryByOrderId();
        }
    }, [show]);

    useEffect(() => {
        const getNestDevWithUsageHistory = async () => {
            try {
                const nestDevWithUsageId = await NestAPI.getAllNestDevelopmentWithUsageId(usageHistoryByOrderId.id);
                setNestDevWithUsageHistoryId(nestDevWithUsageId);
            } catch (error) {
                console.error(error);
            }
        };
        getNestDevWithUsageHistory();
    }, [usageHistoryByOrderId]);

    useEffect(() => {
        const getStepper = async () => {
            try {
                let maxId = 0;
                let itemWithMaxId = null;
                for (const item of nestDevWithUsageHistoryId) {
                    if (item.id > maxId) {
                        maxId = item.id;
                        itemWithMaxId = item;
                    }
                }
                const devStatusById = await NestAPI.getNestDevelopmentStatusById(itemWithMaxId.statusId);
                setNestDevStatusWithSequenceToUseStepper(devStatusById.sequence);
            } catch (error) {
                console.error(error);
            }
        };
        getStepper();
    }, [nestDevWithUsageHistoryId]);

    useEffect(() => {
        console.log(nestDevWithUsageHistoryId);
    }, [nestDevWithUsageHistoryId]);

    const handleShow = (id) => {
        setShow(!show);
        setOrderIdToGetUsage(id);
    };

    useEffect(() => {
        console.log(orderIdToGetUsage);
    }, [orderIdToGetUsage]);

    const handleStoreOrderId = (e) => {
        setOrderId(e);
    };
    const handleSaveFeedback = () => {
        // Update the state variable with the new value from the textarea
        console.log(orders);
        const feedbackParam = {
            content: textareaValue,
            rating: rating,
            belongTo: 'parrot',
            userId: orderId.userId,
            colorId: orderId.colorId,
            orderId: orderId.orderId,
            status: true,
        };
        FeedbackAPI.create(feedbackParam);
        document.getElementById(orderId.btnId).disabled = true;
        document.getElementById(orderId.btnId).style.backgroundColor = 'grey';

        onClose();
    };

    useEffect(() => {
        const checkFeedbackButton = async () => {
            for (const items of orders) {
                const check = await FeedbackAPI.checkFeedbacked({ orderId: items.orderDTO.id });
                if (check > 0) {
                    document.getElementById('btnf' + items.orderDTO.id).disabled = true;
                    document.getElementById('btnf' + items.orderDTO.id).style.backgroundColor = 'grey';
                    document.getElementById('btnf' + items.orderDTO.id).style.cursor = 'Default';
                }
            }
        };
        checkFeedbackButton();
    }, [orders]);

    useEffect(() => {
        const getUserByToken = async () => {
            try {
                console.log(token);
                const userByToken = await UserAPI.getUserByToken(token);
                setLoggedUser(userByToken);
            } catch (error) {
                console.log(error);
            }
        };
        getUserByToken();
    }, [token]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const param = {
                    page: 1,
                    limit: 12,
                    userId: user.id,
                };
                const orderList = await OrderAPI.findAllByUserIdAndSearchSort(param);
                setOrders(orderList.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        getOrders();
    }, [loggedUser]);

    // useEffect(() => {
    //     console.log(loggedUser);
    // }, [user]);

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 12,
            userId: user.id,
            date: null,
            sortDate: null,
            sortPrice: null,
        });
    };
    useEffect(() => {
        const sortData = async () => {
            try {
                const orderHistoryNew = await OrderAPI.findAllByUserIdAndSearchSort(sort);
                setOrders(orderHistoryNew.listResult);
                setTotalPage(orderHistoryNew.totalPage);
                console.log(orders);
            } catch (error) {
                console.log(error);
            }
        };
        sortData();
    }, [sort]);
    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 12,
            email: sort.email,
            phone: sort.phone,
            date: sort.date,
            sortDate: sort.sortDate,
            sortPrice: sort.sortPrice,
        });

        setPage(newPage);
    };
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600">
                    Order History
                </Text>
                <Text>View your order</Text>
            </Box>
            {/* Sorting Space */}
            {/* Sorting Space */}
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />

                <input type="date" onChange={(e) => setSort({ ...sort, date: e.target.value })} />
                {/* <select name="status" id="status" onChange={(e) => setSort({...sort, status:e.target.value})}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="false">Active</option>
                    <option value="true">Inactive</option>
                </select> */}
                <select name="price" id="price" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
                <select name="price" id="price" onChange={(e) => setSort({ ...sort, sortPrice: e.target.value })}>
                    <option value="" disabled selected>
                        Price
                    </option>
                    <option value="PDESC">Highest</option>
                    <option value="PASC">Lowest</option>
                </select>
            </div>
            {/* Sorting Space */}
            {/* Sorting Space */}
            <div className={cx('order-container')}>
                {orders.map((order, index) => (
                    <div key={index} className={cx('order-item')}>
                        <div className={cx('order-item-header-container')}>
                            <div className={cx('order-item-header')}>
                                <Text fontSize="16px" fontWeight="500">
                                    Order #{order.orderDTO.id}
                                </Text>
                                <Text fontSize="16px" fontWeight="600" color="green">
                                    Complete
                                </Text>
                            </div>
                            <p className={cx('order-item-header-date')}>{order.orderDTO.createdDate}</p>
                        </div>
                        <div className={cx('order-item-content-container')}>
                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Image</Th>
                                            <Th>Name</Th>
                                            {order.listOrderDetailHistoryModel[0].color != null ? <Th>Color</Th> : null}

                                            <Th>Quantity</Th>
                                            <Th>Price</Th>
                                            <Th>Service</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {order.listOrderDetailHistoryModel.map((parrot, parrotIndex) => (
                                            <Tr key={parrotIndex} className={cx('order-item-content-row')}>
                                                <Td>
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="60px"
                                                        src={parrot.img}
                                                        alt="Dan Abramov"
                                                    />
                                                </Td>
                                                <Td>{parrot.speciesName}</Td>
                                                {parrot.color != null ? <Td>{parrot.color}</Td> : null}

                                                <Td>x{parrot.quantity}</Td>
                                                <Td>$ {parrot.price}</Td>
                                                <Td>{parrot.color != null ? 'Parrot' : 'Nest'}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>

                            <Card maxW="lg">
                                <CardBody>
                                    <Stack mt="6" spacing="3">
                                        <Heading size="lg" minHeight={10}>
                                            Order Summary
                                        </Heading>
                                        <Text>2 items</Text>
                                        <Text color="blue.600" fontSize="2xl">
                                            Total: $ {order.orderDTO.totalPrice}
                                        </Text>
                                    </Stack>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing="2" className={cx('btn-container')}>
                                        {order.listOrderDetailHistoryModel[0].color !== null ? (
                                            <div className={cx('rating-btn')}>
                                                <button
                                                    className={cx('feedback-btn')}
                                                    id={'btnf' + order.orderDTO.id}
                                                    backgroundColorBlue
                                                    colorScheme="blue"
                                                    size="lg"
                                                    fontSize={'15px'}
                                                    onClick={() => {
                                                        handleStoreOrderId({
                                                            orderId: order.orderDTO.id,
                                                            userId: order.orderDTO.userID,
                                                            colorId: order.listOrderDetailHistoryModel[0].colorId,
                                                            btnId: 'btnf' + order.orderDTO.id,
                                                        });
                                                        setOverlay(<OverlayOne />);
                                                        onOpen();
                                                    }}
                                                >
                                                    Feedback
                                                </button>
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
                                                                            <p>
                                                                                {
                                                                                    order.listOrderDetailHistoryModel[0]
                                                                                        .speciesName
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className={cx('product-type')}>
                                                                            <p>
                                                                                Category:{' '}
                                                                                {
                                                                                    order.listOrderDetailHistoryModel[0]
                                                                                        .color
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className={cx('rating-star-container')}>
                                                                    <div className={cx('rating-star-title')}>
                                                                        <p>Rating:</p>
                                                                    </div>
                                                                    <div className={cx('rating-star-icon')}>
                                                                        <div className={cx('row')}>
                                                                            <div className={cx('col text-center')}>
                                                                                <Rate
                                                                                    rating={rating}
                                                                                    onRating={(rate) => setRating(rate)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className={cx('rating-input')}>
                                                                    <p>Description:</p>
                                                                    <textarea
                                                                        maxLength={150}
                                                                        value={textareaValue}
                                                                        onChange={handleTextareaChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </ModalBody>
                                                        <ModalFooter className={cx('button-footer')}>
                                                            <Button
                                                                key={order.orderDTO.id + 1000}
                                                                value={order.orderDTO.id}
                                                                onClick={() => {
                                                                    handleSaveFeedback();
                                                                }}
                                                            >
                                                                Save
                                                            </Button>

                                                            <Button onClick={onClose}>Close</Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </div>
                                        ) : null}

                                        <Button
                                            ref={btnRef}
                                            colorScheme="teal"
                                            onClick={() => {
                                                onOpen();
                                                handleShow(order.orderDTO.id);
                                            }}
                                        >
                                            Track Process
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ))}

                <Modal
                    isCentered
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        setShow(!show);
                    }}
                    size="5xl"
                >
                    {overlay}
                    <ModalContent>
                        <ModalHeader>Haching Process</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stepper size="lg" index={nestDevStatusWithSequenceToUseStepper} orientation="vertical">
                                {nestDevStatus.map((step, index) => (
                                    <Step key={index}>
                                        <StepIndicator>
                                            <StepStatus
                                                complete={<StepIcon />}
                                                incomplete={<StepNumber />}
                                                active={<StepNumber />}
                                            />
                                        </StepIndicator>

                                        <Box flexShrink="0">
                                            <StepTitle>{step.name}</StepTitle>
                                            <StepDescription>{step.description}</StepDescription>
                                        </Box>

                                        <StepSeparator />
                                    </Step>
                                ))}
                            </Stepper>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                onClick={() => {
                                    onClose();
                                    setShow(!show);
                                }}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </Container>
    );
}

export default OrderHistoryNew;
