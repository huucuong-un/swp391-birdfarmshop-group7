import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Center,
    Image,
} from '@chakra-ui/react';
import { Col, Row } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './AdminDashboard.module.scss';
import classNames from 'classnames/bind';
import OrderAPI from '~/Api/OrderAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import UserAPI from '~/Api/UserAPI';
import { useNavigate } from 'react-router-dom';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AdminDashboard() {
    const [totalItem, setTotalItem] = useState(0);
    const [totalItemInCurrentDay, setTotalItemInCurrentDay] = useState(0);
    const [totalItemInCurrentMonth, setTotalItemInCurrentMonth] = useState(0);
    const [totalItemInCurrentYear, setTotalItemInCurrentYear] = useState(0);
    const [totalPriceInCurrentDay, setTotalPriceInCurrentDay] = useState(0);
    const [totalPriceInCurrentMonth, setTotalPriceInCurrentMonth] = useState(0);
    const [totalPriceInCurrentYear, setTotalPriceInCurrentYear] = useState(0);
    //total-price-month
    const [totalPriceInJanuary, setTotalPriceInJanuary] = useState(0);
    const [totalPriceInFebruary, setTotalPriceInFebruary] = useState(0);
    const [totalPriceInMarch, setTotalPriceInMarch] = useState(0);
    const [totalPriceInApril, setTotalPriceInApril] = useState(0);
    const [totalPriceInMay, setTotalPriceInMay] = useState(0);
    const [totalPriceInJune, setTotalPriceInJune] = useState(0);
    const [totalPriceInJuly, setTotalPriceInJuly] = useState(0);
    const [totalPriceInAugust, setTotalPriceInAugust] = useState(0);
    const [totalPriceInSeptember, setTotalPriceInSeptember] = useState(0);
    const [totalPriceInOctober, setTotalPriceInOctober] = useState(0);
    const [totalPriceInNovember, setTotalPriceInNovember] = useState(0);
    const [totalPriceInDecember, setTotalPriceInDecember] = useState(0);

    const [top3, setTop3] = useState([]);
    const [combineDataForTop3, setCombineDataForTop3] = useState([]);
    const [finalTop3, setFinalTop3] = useState([]);
    const [numberOfUserAccount, setNumberOfUserAccount] = useState();
    const [numberOfCustomerAccount, setNumberOfCustomerAccount] = useState();
    const [numberOfStaffAccount, setNumberOfStaffAccount] = useState();
    const [numberOfMarketerAccount, setNumberOfMarketerAccount] = useState();
    const [numberOfAdminAccount, setNumberOfAdminAccount] = useState();

    const data = [
        { month: 'Jan', earnings: totalPriceInJanuary },
        { month: 'Feb', earnings: totalPriceInFebruary },
        { month: 'Mar', earnings: totalPriceInMarch },
        { month: 'Apr', earnings: totalPriceInApril },
        { month: 'May', earnings: totalPriceInMay },
        { month: 'Jun', earnings: totalPriceInJune },
        { month: 'Jul', earnings: totalPriceInJuly },
        { month: 'Aug', earnings: totalPriceInAugust },
        { month: 'Sep', earnings: totalPriceInSeptember },
        { month: 'Oct', earnings: totalPriceInOctober },
        { month: 'Nov', earnings: totalPriceInNovember },
        { month: 'Dec', earnings: totalPriceInDecember },
    ];
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const navigate = useNavigate();

    useEffect(() => {
        const getUserByToken = async () => {
            try {
                console.log(token);
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

                    if (userRole !== 'admin') {
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
        const getTotalItem = async () => {
            try {
                const totalItem = await OrderAPI.totalItem();
                const totalItemInCurrentDay = await OrderAPI.totalItemInCurrentDay();
                const totalItemInCurrentMonth = await OrderAPI.totalItemInCurrentMonth();
                const totalItemInCurrentYear = await OrderAPI.totalItemInCurrentYear();
                const totalPriceInCurrentDay = await OrderAPI.totalPriceInCurrentDay();
                const totalPriceInCurrentMonth = await OrderAPI.totalPriceInCurrentMonth();
                const totalPriceInCurrentYear = await OrderAPI.totalPriceInCurrentYear();
                //total-price
                const totalPriceInJanuary = await OrderAPI.totalPriceInJanuary();
                const totalPriceInFebruary = await OrderAPI.totalPriceInFebruary();
                const totalPriceInMarch = await OrderAPI.totalPriceInMarch();
                const totalPriceInApril = await OrderAPI.totalPriceInApril();
                const totalPriceInMay = await OrderAPI.totalPriceInMay();
                const totalPriceInJune = await OrderAPI.totalPriceInJune();
                const totalPriceInJuly = await OrderAPI.totalPriceInJuly();
                const totalPriceInAugust = await OrderAPI.totalPriceInAugust();
                const totalPriceInSeptember = await OrderAPI.totalPriceInSeptember();
                const totalPriceInOctober = await OrderAPI.totalPriceInOctober();
                const totalPriceInNovember = await OrderAPI.totalPriceInNovember();
                const totalPriceInDecember = await OrderAPI.totalPriceInDecember();
                setTotalItem(totalItem);
                setTotalItemInCurrentDay(totalItemInCurrentDay);
                setTotalItemInCurrentMonth(totalItemInCurrentMonth);
                setTotalItemInCurrentYear(totalItemInCurrentYear);
                setTotalPriceInCurrentDay(totalPriceInCurrentDay);
                setTotalPriceInCurrentMonth(totalPriceInCurrentMonth);
                setTotalPriceInCurrentYear(totalPriceInCurrentYear);
                setTotalPriceInJanuary(totalPriceInJanuary);
                setTotalPriceInFebruary(totalPriceInFebruary);
                setTotalPriceInMarch(totalPriceInMarch);
                setTotalPriceInApril(totalPriceInApril);
                setTotalPriceInMay(totalPriceInMay);
                setTotalPriceInJune(totalPriceInJune);
                setTotalPriceInJuly(totalPriceInJuly);
                setTotalPriceInAugust(totalPriceInAugust);
                setTotalPriceInSeptember(totalPriceInSeptember);
                setTotalPriceInOctober(totalPriceInOctober);
                setTotalPriceInNovember(totalPriceInNovember);
                setTotalPriceInDecember(totalPriceInDecember);
            } catch (error) {
                console.error(error);
            }
        };
        getTotalItem();
    }, []);

    useEffect(() => {
        console.log(totalItem);
    }, [totalItem]);

    useEffect(() => {
        const getTop3 = async () => {
            const top3 = await ParrotSpeciesAPI.getTop3SpeciesWithHighestOrderMoney();
            setTop3(top3);
        };

        getTop3();
    }, []);

    useEffect(() => {
        const getTotalMoneyBySpecies = async () => {
            const data = [];
            for (const item of top3) {
                try {
                    const speciesItem = { ...item };
                    speciesItem.money = await ParrotSpeciesAPI.getMoneyBySpeciesId(speciesItem.id);
                    data.push(speciesItem);
                } catch (error) {
                    console.error(error);
                }
            }
            setFinalTop3(data);
        };
        getTotalMoneyBySpecies();
    }, [top3]);

    useState(() => {
        const getNumberOfAccount = async () => {
            const numberOfUser = await UserAPI.countAccountByRole(null);
            setNumberOfUserAccount(numberOfUser);
            const numberOfCustomer = await UserAPI.countAccountByRole('customer');
            setNumberOfCustomerAccount(numberOfCustomer);
            const numberOfStaff = await UserAPI.countAccountByRole('staff');
            setNumberOfStaffAccount(numberOfStaff);
            const numberOfMarketer = await UserAPI.countAccountByRole('marketer');
            setNumberOfMarketerAccount(numberOfMarketer);
            const numberOfAdmin = await UserAPI.countAccountByRole('admin');
            setNumberOfAdminAccount(numberOfAdmin);
        };

        getNumberOfAccount();
    }, []);
    return (
        <Container maxW="container.xl">
            <Text fontSize={20} fontWeight={500} paddingTop={10}>
                Dashboard
            </Text>
            <Row>
                <Col xs lg="3" margin="2%">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total Orders</Text>
                        <Text fontWeight={600}>{totalItem} order(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total Orders Today</Text>
                        <Text fontWeight={600}>{totalItemInCurrentDay} order(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total Orders In Month</Text>
                        <Text fontWeight={600}>{totalItemInCurrentMonth} order(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total Orders In Year</Text>
                        <Text fontWeight={600}>{totalItemInCurrentYear} order(s)</Text>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid orange">
                        <Text fontSize={14}>Earnings (Today)</Text>
                        <Text fontWeight={600}>${totalPriceInCurrentDay}</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid orange">
                        <Text fontSize={14}>Earnings (Monthly)</Text>
                        <Text fontWeight={600}>${totalPriceInCurrentMonth}</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid orange">
                        <Text fontSize={14}>Earnings (Yearly)</Text>
                        <Text fontWeight={600}>${totalPriceInCurrentYear}</Text>
                    </Box>
                </Col>
            </Row>
            <Row>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid green">
                        <Text fontSize={14}>Number Of Accounts</Text>
                        <Text fontWeight={600}>{numberOfUserAccount} account(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid green">
                        <Text fontSize={14}>Number Of Customers</Text>
                        <Text fontWeight={600}>{numberOfCustomerAccount} account(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid green">
                        <Text fontSize={14}>Number Of Staff</Text>
                        <Text fontWeight={600}>{numberOfStaffAccount} account(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid green">
                        <Text fontSize={14}>Number Of Marketers</Text>
                        <Text fontWeight={600}>{numberOfMarketerAccount} account(s)</Text>
                    </Box>
                </Col>
                <Col md="auto" lg="3">
                    <Box className={cx('statistic-item')} borderLeft="5px solid green">
                        <Text fontSize={14}>Number Of Admins</Text>
                        <Text fontWeight={600}>{numberOfAdminAccount} account(s)</Text>
                    </Box>
                </Col>
            </Row>

            <Row className={cx('second-row')}>
                <Col xs lg="6" margin="2%">
                    <Text fontSize={20} textAlign="center" fontWeight={500}>
                        Income Chart Follow By Month ($)
                    </Text>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="bump" dataKey="earnings" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col>
                    <Text fontSize={20} textAlign="center" fontWeight={500}>
                        Top 3 Species With Highest Earnings
                    </Text>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                {/* <Tr>
                                    <Th>Species</Th>
                                    <Th>Color</Th>
                                    <Th>Total Price</Th>
                                </Tr> */}
                                <Tr>
                                    <Th>Species</Th>
                                    <Th>Image</Th>
                                    <Th>Total earnings</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {finalTop3 &&
                                    finalTop3.map((top3, index) => (
                                        <Tr key={index} textAlign="center">
                                            <Td>{top3.name}</Td>
                                            <Td>
                                                <div className="img-for-top-3">
                                                    <Image src={top3.img} maxHeight={100}></Image>
                                                </div>
                                            </Td>
                                            <Td>${top3.money}</Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
