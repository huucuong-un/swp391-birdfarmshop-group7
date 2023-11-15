import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faMagnifyingGlass,
    faCircleXmark,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
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
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    renderCustomizedLabel,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import styles from '~/Pages/AdminDashboard/AdminDashboard.module.scss';
import classNames from 'classnames/bind';
import OrderAPI from '~/Api/OrderAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';
import FeedbackAPI from '~/Api/FeedbackAPI';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function MarketerDashboard() {
    const [species, setSpecies] = useState([]);
    const [top3, setTop3] = useState([]);
    const [top3Rating, setTop3Rating] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [combineDataForTop3, setCombineDataForTop3] = useState([]);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const [totalFeedback, setTotalFeedback] = useState(0);
    const navigate = useNavigate();

    const StarRating = ({ rating }) => {
        const stars = [];
        if (rating === null || rating === 0) {
            return <div>There are no reviews yet</div>;
        }
        const number = rating;
        const integerPart = Math.floor(number);
        const decimalPart = (number - integerPart).toFixed(1);
        var count = 0;
        for (let i = 0; i < integerPart; i++) {
            stars.push(<FontAwesomeIcon style={{ height: 20 }} icon={solidStar} key={count} />);
            count = count + 1;
        }
        if (decimalPart > 0) {
            stars.push(<FontAwesomeIcon style={{ height: 20 }} icon={faStarHalfAlt} key={count} />);
            count = count + 1;
            if (integerPart < 5) {
                for (let i = 0; i < 5 - integerPart - 1; i++) {
                    stars.push(<FontAwesomeIcon style={{ height: 20 }} icon={regularStar} key={count} />);
                    count = count + 1;
                }
            }
        }

        if (decimalPart == 0) {
            if (integerPart < 5) {
                for (let i = 0; i < 5 - integerPart; i++) {
                    stars.push(<FontAwesomeIcon style={{ height: 20 }} icon={regularStar} key={count} />);
                    count = count + 1;
                }
            }
        }

        if (rating !== null) {
            stars.push(
                <div style={{ padding:10 }} key={count}>
                    {' '}
                    ( {rating} / 5 )
                </div>,
            );
        }

        return stars;
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
            const top3 = await ParrotSpeciesAPI.getTop3SpeciesForMarketer();
            // console.log(top3);
            setTop3(top3);
        };
        getTop3();
    }, []);

    useEffect(() => {
        const getTop3Rating = async () => {
            const top3 = await ParrotSpeciesAPI.getTop3SpeciesRatingForMarketer();

            setTop3Rating(top3);
        };
        getTop3Rating();
    }, []);
    useEffect(() => {
        const getTotalFeedback = async () => {
            const feedbackcount = await FeedbackAPI.countFeedbackForDashBoard();
            setTotalFeedback(feedbackcount);
        };
        getTotalFeedback();
    }, []);

    useEffect(() => {
        const getTotalBySpecies = async () => {
            const data = [];
            for (const item of top3) {
                try {
                    const speciesItem = { ...item };
                    speciesItem.earnings = await ParrotSpeciesAPI.getQuantityBySpeciesId(item.id);
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
                                <Text fontSize={14}>Sale of {species.name}</Text>
                                <Text fontWeight={600}>{species.earnings} sold</Text>
                            </Box>
                        </Col>
                    ))}
                <Col xs lg="3" margin="2%">
                    <Box className={cx('statistic-item')}>
                        <Text fontSize={14}>Total of Feedback</Text>
                        <Text fontWeight={600}>{totalFeedback}</Text>
                    </Box>
                </Col>
            </Row>

            <Row className={cx('second-row')}>
                <Col xs lg="6" margin="2%">
                    <Text fontSize={20} textAlign="center" fontWeight={500}>
                        Parrot Trend Chart
                    </Text>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={combineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="linear" dataKey="earnings" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
                <Col>
                    <Text fontSize={20} textAlign="center" fontWeight={500}>
                        Top 3 Popular Species
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
                                    <Th>Total sold parrot(s)</Th>
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
                                            <Td>{top3.earnings} parrot(s)</Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <div style={{ marginTop: '50px' }}>
                        <Text fontSize={20} textAlign="center" fontWeight={500}>
                            Top 3 Rating Species
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
                                        <Th>Rating</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {top3Rating &&
                                        top3Rating.map((top3, index) => (
                                            <Tr key={index} textAlign="center">
                                                <Td>{top3.name}</Td>
                                                <Td>
                                                    <div className="img-for-top-3">
                                                        <Image src={top3.img} maxHeight={100}></Image>
                                                    </div>
                                                </Td>
                                                <Td>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}
                                                        className="img-for-top-3"
                                                    >
                                                        <StarRating rating={top3.parrotAverageRating}></StarRating>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MarketerDashboard;
