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
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import OrderAPI from '~/Api/OrderAPI';
import classNames from 'classnames/bind';
import styles from '~/Pages/StaffOrderManagement/StaffOrderManagement.module.scss';

const cx = classNames.bind(styles);

function StaffOrderManagement() {
    const [orders, setOrders] = useState();

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    useEffect(() => {
        const getOrderWithUser = async () => {
            try {
                const orderList = await OrderAPI.findAllOrderWithUser();
                console.log(orderList);
                setOrders(orderList);
            } catch (error) {
                console.error(error);
            }
        };

        getOrderWithUser();
    }, []);

    const handleSearch = () => {};

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Order</h1>
            </div>
            <div className={cx('sort-space')}>
                <input type="email" placeholder="Mail" />
                <input type="text" placeholder="Phone" />

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <select name="price" id="price">
                    <option value="" disabled selected>
                        Create at
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select name="price" id="price">
                    <option value="" disabled selected>
                        Price
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button onClick={() => handleSearch()}></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Mail</Th>
                            <Th>Create At</Th>
                            <Th>Price</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders &&
                            orders.map((order, index) => (
                                <Tr key={index}>
                                    <Td>{order.orderDTO.id}</Td>
                                    <Td>{order.userDTO.fullName}</Td>
                                    <Td>{order.userDTO.email}</Td>
                                    <Td>{formatDate(new Date(order.orderDTO.createdDate))}</Td>
                                    <Td>{order.orderDTO.totalPrice}</Td>
                                    <Td>
                                        {order.orderDTO.status ? <Switch size="lg" isChecked /> : <Switch size="lg" />}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default StaffOrderManagement;
