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
    Img,
} from '@chakra-ui/react';
import { Col, Row } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '~/Pages/AdminDashboard/AdminDashboard.module.scss';
import classNames from 'classnames/bind';
import OrderAPI from '~/Api/OrderAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function MarketerDashboard() {
    const [species, setSpecies] = useState([]);
    const [top3, setTop3] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [combineDataForTop3, setCombineDataForTop3] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const navigate = useNavigate();
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
        const getSpeciesList = async () => {
            try {
                const speciesList = await ParrotSpeciesAPI.getAll();
                setSpecies(speciesList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        getSpeciesList();
    }, []);

    useEffect(() => {
        const getTotalBySpecies = async () => {
            const data = [];
            for (const item of species) {
                try {
                    const speciesItem = { ...item };
                    speciesItem.earnings = await OrderAPI.countSoldProduct(item.id);
                    data.push(speciesItem);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };
        getTotalBySpecies();
    }, [species]);

    useEffect(() => {
        const getTop3 = async () => {
            const top3 = await ParrotSpeciesAPI.getTop3SpeciesWithHighestOrderMoney();
            // console.log(top3);
            setTop3(top3);
        };
        getTop3();
    }, []);

    useEffect(() => {
        const getTotalBySpecies = async () => {
            const data = [];
            for (const item of top3) {
                try {
                    const speciesItem = { ...item };
                    speciesItem.earnings = await OrderAPI.countSoldProduct(item.id);
                    data.push(speciesItem);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineDataForTop3(data);
        };
        getTotalBySpecies();
    }, [top3]);

    useEffect(() => {
        console.log(combineDataForTop3);
    }, [combineDataForTop3]);
    return (
        <Container maxW="container.xl">
            <Text fontSize={20} fontWeight={500} paddingTop={10}>
                Dashboard
            </Text>
            <Row>
                {combineData &&
                    combineData.map((species, index) => (
                        <Col key={index} xs lg="3" margin="2%">
                            <Box className={cx('statistic-item')}>
                                <Text fontSize={14}>{species.name}</Text>
                                <Text fontWeight={600}>{species.earnings}</Text>
                            </Box>
                        </Col>
                    ))}
            </Row>

            <Row className={cx('second-row')}>
                <Col xs lg="6" margin="2%">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={combineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col>
                    <Text fontSize={18} textAlign="center" fontWeight={500}>
                        Top 3 Species
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
                                {combineDataForTop3 &&
                                    combineDataForTop3.map((top3, index) => (
                                        <Tr key={index} textAlign="center">
                                            <Td>{top3.name}</Td>
                                            <Td>
                                                <div className="img-for-top-3">
                                                    <Image src={top3.img} maxHeight={100}></Image>
                                                </div>
                                            </Td>
                                            <Td>{top3.earnings}</Td>
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

export default MarketerDashboard;
