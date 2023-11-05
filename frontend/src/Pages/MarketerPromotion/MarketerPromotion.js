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
    Box,
    Text,
    Flex,
} from '@chakra-ui/react';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PromotionAPI from '~/Api/PromotionAPI';
import styles from '~/Pages/MarketerPromotion/MarketerPromotion.module.scss';

const cx = classNames.bind(styles);

function MarketerPromotion() {
    const [voucherList, setVoucherList] = useState([]);
    const [vinh, setVinh] = useState(true);

    useEffect(() => {
        const getVoucherList = async () => {
            try {
                const voucherList = await PromotionAPI.getAllForMarketer();
                console.log(voucherList);
                setVoucherList(voucherList);
                setVinh(false);
            } catch (error) {
                console.error(error);
            }
        };

        if (vinh) {
            getVoucherList();
            setVinh(false);
        }
        getVoucherList();
    }, [vinh]);

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
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    PROMOTION LIST
                </Text>
            </Box>

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
                            <Th>Quantity</Th>
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
                                    <Td>{voucher.quantity}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MarketerPromotion;
