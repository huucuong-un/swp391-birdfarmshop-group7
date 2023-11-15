import {
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Switch,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
    Box,
    Image,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Stack,
    Heading,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import DeliveryInformation from '~/Api/DeliveryInformationAPI';
import OrderAPI from '~/Api/OrderAPI';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffOrderManagement/StaffOrderManagement.module.scss';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function StaffOrderManagement() {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const navigate = useNavigate();
    const [orders, setOrders] = useState();
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        email: null,
        phone: null,
        date: null,
        sortDate: null,
        sortPrice: null,
    });
    const [show, setShow] = useState(false);
    const [combineData, setCombineData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [orderIdToOrderDetail, setOrderIdToOrderDetail] = useState(null);
    const [orderToSeeOrderDetail, setOrderToSeeOrderDetail] = useState([]);
    const [combineDataToSeeDetail, setCombineDataToSeeDetail] = useState([]);

    const OverlayOne = () => <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

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

    useEffect(() => {
        const getUserByToken = async () => {
            try {
                const userByToken = await UserAPI.getUserByToken(token);
                if (
                    userByToken === null ||
                    userByToken === '' ||
                    userByToken === undefined ||
                    userByToken.length === 0
                ) {
                    navigate('/error');
                } else {
                    const userRole = await RoleAPI.getRoleName(userByToken.roleId);

                    if (userRole !== 'admin' && userRole !== 'staff') {
                        navigate('/error');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserByToken();
    }, [token]);
    useEffect(() => {
        const getOrderWithUser = async () => {
            try {
                const orderList = await OrderAPI.searchByEmailAndPhone(sort);
                setOrders(orderList.listResult);
                setTotalPage(orderList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };

        getOrderWithUser();
    }, [sort]);

    useEffect(() => {
        const getDelByOrderId = async () => {
            const data = [];
            try {
                for (const item of orders) {
                    const orderList = { ...item };
                    orderList.deliveryInformation = await DeliveryInformation.getOneById(
                        item.orderDTO.deliveryInformationId,
                    );
                    data.push(orderList);
                }
            } catch (error) {
                console.error(error);
            }
            setCombineData(data);
        };

        getDelByOrderId();
    }, [orders]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 12,
            email: null,
            phone: null,
            date: null,
            sortDate: null,
            sortPrice: null,
        });
    };

    useEffect(() => {
        console.log(sort);
    }, [sort]);

    useEffect(() => {
        console.log(totalPage);
    }, [totalPage]);

    useEffect(() => {
        console.log(page);
    }, [page]);

    const redirectToUpdateNestStatus = () => {
        navigate('/staff/nest-usage-history');
    };

    const handleShow = (id) => {
        setShow(!show);
        setOrderIdToOrderDetail(id);
    };

    useEffect(() => {
        const getOrderToSeeOrderDetail = async () => {
            try {
                console.log(orderIdToOrderDetail);
                const orderToSeeOrderDetail = await OrderAPI.findOneOrderModelById(orderIdToOrderDetail);
                setOrderToSeeOrderDetail(orderToSeeOrderDetail.listResult[0]);
            } catch (error) {
                console.error(error);
            }
        };
        getOrderToSeeOrderDetail();
    }, [orderIdToOrderDetail]);

    useEffect(() => {
        const getDelByOrderId = async () => {
            try {
                const orderList = { ...orderToSeeOrderDetail };
                orderList.deliveryInformation = await DeliveryInformation.getOneById(
                    orderToSeeOrderDetail.orderDTO.deliveryInformationId,
                );
                setCombineDataToSeeDetail(orderList);
            } catch (error) {
                console.error(error);
            }
        };

        getDelByOrderId();
    }, [orderToSeeOrderDetail]);

    useEffect(() => {
        console.log(combineDataToSeeDetail);
    }, [combineDataToSeeDetail]);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    ORDER
                </Text>
            </Box>
            <Button colorScheme="green" onClick={redirectToUpdateNestStatus} marginBottom={5}>
                <Text fontSize={16} margin={0} padding={4}>
                    Update process of nest orders
                </Text>
            </Button>
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input type="email" placeholder="Mail" onChange={(e) => setSort({ ...sort, email: e.target.value })} />
                <input type="tel" placeholder="Phone" onChange={(e) => setSort({ ...sort, phone: e.target.value })} />
                <input type="date" onChange={(e) => setSort({ ...sort, date: e.target.value })} />

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

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
            {show ? (
                <div className={cx('order-detail-container-big')}>
                    <div className={cx('order-detail-id')}>
                        <Text margin={0} fontWeight={600}>
                            Order ID: {combineDataToSeeDetail.orderDTO ? combineDataToSeeDetail.orderDTO.id : 'N/A'}
                        </Text>
                    </div>
                    <div className={cx('order-detail-address')}>
                        <Card>
                            <CardHeader>
                                <Heading padding={2} size="md" fontSize={20} textAlign="center">
                                    Delivery Information
                                </Heading>
                            </CardHeader>
                            <CardBody className={cx('order-detail-delivery-information')}>
                                <div className={cx('order-detail-name')}>
                                    <Text margin={0}>
                                        <Text fontWeight={600}>Name</Text>
                                        {/* <Text margin={0}>{combineDataToSeeDetail.deliveryInformation.name}</Text> */}
                                        {combineDataToSeeDetail.deliveryInformation
                                            ? combineDataToSeeDetail.deliveryInformation.name
                                            : 'N/A'}
                                    </Text>
                                </div>
                                <div className={cx('order-detail-address')}>
                                    <Text fontWeight={600}>Address</Text>
                                    {/* <Text margin={0}>{combineDataToSeeDetail.deliveryInformation.address}</Text> */}
                                    {combineDataToSeeDetail.deliveryInformation
                                        ? combineDataToSeeDetail.deliveryInformation.address
                                        : 'N/A'}
                                </div>
                                <div className={cx('order-detail-phone-number')}>
                                    <Text fontWeight={600}>Phone Number</Text>
                                    {/* <Text margin={0}>{combineDataToSeeDetail.deliveryInformation.phoneNumber}</Text> */}
                                    {combineDataToSeeDetail.deliveryInformation
                                        ? combineDataToSeeDetail.deliveryInformation.phoneNumber
                                        : 'N/A'}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className={cx('order-detail-container')}>
                        <Heading padding={2} size="md" fontSize={20} alignItems="center" textAlign="center">
                            Order Details
                        </Heading>

                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Img</Th>
                                        <Th>Name</Th>
                                        <Th>Color</Th>
                                        <Th>Price</Th>
                                        <Th>Quantity</Th>
                                        <Th>Total Price</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {combineDataToSeeDetail.listOrderDetailHistoryModel &&
                                        combineDataToSeeDetail.listOrderDetailHistoryModel.map(
                                            (orderDetail, orderDetailIndex) => (
                                                <Tr key={orderDetailIndex}>
                                                    <Td>
                                                        <img src={orderDetail.img} className={cx('order-detail-img')} />
                                                    </Td>
                                                    <Td>{orderDetail.speciesName}</Td>
                                                    <Td>{orderDetail.color}</Td>
                                                    <Td>{orderDetail.price}</Td>
                                                    <Td>{orderDetail.quantity}</Td>
                                                    <Td>{orderDetail.totalPrice}</Td>
                                                </Tr>
                                            ),
                                        )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <TableContainer className={cx('table-container')}>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Mail</Th>
                            <Th>Phone</Th>
                            <Th>Create At</Th>
                            <Th>Price</Th>

                            <Th>Status</Th>

                            <Th>Detail</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((order, index) => (
                                <Tr key={index}>
                                    <Td>{order.orderDTO.id}</Td>
                                    <Td>{order.userDTO.fullName}</Td>
                                    <Td>{order.userDTO.email}</Td>
                                    <Td>{order.deliveryInformation.phoneNumber}</Td>
                                    <Td>{formatDate(new Date(order.orderDTO.createdDate))}</Td>
                                    <Td>${order.orderDTO.totalPrice}</Td>
                                    <Td>
                                        {order.orderDTO.status === 'Paid' ? (
                                            <span style={{ color: 'green', margin: '0', fontWeight: 'bold' }}>
                                                {order.orderDTO.status}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'orange', margin: '0', fontWeight: 'bold' }}>
                                                {order.orderDTO.status}
                                            </span>
                                        )}
                                    </Td>
                                    <Td>
                                        <Button colorScheme="green" onClick={() => handleShow(order.orderDTO.id)}>
                                            View Detail
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <div className={cx('button-pagination')}>
                <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                    <p key={index} className={cx('number-page')} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </p>
                ))}
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>

            {/* <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </Container>
    );
}

export default StaffOrderManagement;
