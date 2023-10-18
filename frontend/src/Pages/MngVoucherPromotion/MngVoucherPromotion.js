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
    Textarea,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PromotionAPI from '~/Api/PromotionAPI';
import styles from '~/Pages/MngVoucherPromotion/MngVoucherPromotion.module.scss';

const cx = classNames.bind(styles);

function MngVoucherPromotion() {
    const [voucherList, setVoucherList] = useState([]);

    useEffect(() => {
        const getVoucherList = async () => {
            try {
                const voucherList = await PromotionAPI.getAll();
                console.log(voucherList);
                setVoucherList(voucherList);
            } catch (error) {
                console.error(error);
            }
        };

        getVoucherList();
    }, []);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Promotions</h1>
            </div>
            <div className={cx('sort-space')}>
                <select name="status" id="status">
                    <option value="" disabled selected>
                        Rating
                    </option>

                    <option value="active">1</option>
                    <option value="active">2</option>
                    <option value="active">3</option>
                    <option value="active">4</option>
                    <option value="active">5</option>
                </select>

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <input type="date" />
                <select name="price" id="price">
                    <option value="" disabled selected>
                        Price
                    </option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Voucher Code</Th>
                            <Th>Description</Th>
                            <Th>Create at</Th>
                            <Th>Start date</Th>
                            <Th>End date</Th>
                            <Th>Value</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {voucherList &&
                            voucherList.map((voucher, index) => (
                                <Tr key={index}>
                                    <Td>{voucher.id}</Td>
                                    <Td>{voucher.code}</Td>
                                    <Td>{voucher.description}</Td>
                                    <Td>{formatDate(new Date(voucher.createdDate))}</Td>
                                    <Td>{formatDate(new Date(voucher.startDate))}</Td>
                                    <Td>{formatDate(new Date(voucher.endDate))}</Td>
                                    <Td>{voucher.value}</Td>
                                    <Td>{voucher.status}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MngVoucherPromotion;
