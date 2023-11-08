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
    Box,
    Text,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdNestUsageHistoryManagement/AdNestUsageHistoryManagement.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import NestAPI from '~/Api/NestAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import OrderAPI from '~/Api/OrderAPI';
import UserAPI from '~/Api/UserAPI';
import { useNavigate } from 'react-router-dom';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AdNestUsageHistoryManagement() {
    const [faqsList, setFaqsList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = new Date(`${year}/${month}/${day}`);
    const [nestDev, setNestDev] = useState({
        nestUsageHistoryId: null,
        statusId: null,
        description: null,
    });
    const [nestUsageHistoryId, setNestUsageHistoryId] = useState(0);
    const [nestDevWithUsageHistoryId, setNestDevWithUsageHistoryId] = useState([]);
    const [nestDevStatus, setNestDevStatus] = useState();
    const [nestDevStatusCurrent, setNestDevStatusCurrent] = useState();
    const [nestDevStatusWithSequenceToUseStepper, setNestDevStatusWithSequenceToUseStepper] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [combineData, setCombineData] = useState([]);
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
        const getNestPriceList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 100000,
                };
                const nestList = await NestAPI.getAllNestUsageHistory(params);
                setFaqsList(nestList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (vinh) {
            getNestPriceList();
            setVinh(false);
        }
    }, [vinh]);

    useEffect(() => {
        const getNestPriceByNestId = async () => {
            const data = [];
            try {
                for (const item of faqsList) {
                    const usageHistory = { ...item };
                    const getNestById = await NestAPI.getNestById(item.nestId);
                    const getNestPriceById = await NestAPI.getNestPriceById(getNestById.nestPriceId);
                    const getOrderByUsageHistory = await OrderAPI.getOneByUsageHistory(item.id);
                    usageHistory.user = await UserAPI.getUserById(getOrderByUsageHistory.userID);
                    usageHistory.species = await ParrotSpeciesAPI.get(getNestPriceById.speciesId);
                    data.push(usageHistory);
                }
            } catch (error) {
                console.error(error);
            }
            setCombineData(data);
        };

        getNestPriceByNestId();
    }, [faqsList]);

    useEffect(() => {
        console.log(combineData);
    }, [combineData]);

    useEffect(() => {
        const getNestDevStatusList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 10000,
                };
                const nestDevStatusList = await NestAPI.getAllNestDevelopmentStatus(params);
                const nestDevWithUsageId = await NestAPI.getAllNestDevelopmentWithUsageId(nestUsageHistoryId);
                setNestDevStatus(nestDevStatusList.listResult);
                setNestDevWithUsageHistoryId(nestDevWithUsageId);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestDevStatusList();
        }
    }, [show]);

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
        if (nestDevWithUsageHistoryId.length != 0) {
            getStepper();
        }
    }, [nestDevWithUsageHistoryId]);

    useEffect(() => {
        console.log(nestDevStatusWithSequenceToUseStepper);
    }, [nestDevStatusWithSequenceToUseStepper]);

    useEffect(() => {
        console.log(nestDevWithUsageHistoryId);
    }, [nestDevWithUsageHistoryId]);

    useEffect(() => {
        const getDevStatusById = async () => {
            try {
                let maxId = 0;
                let itemWithMaxId = null;
                if (nestDevWithUsageHistoryId.length != 0) {
                    if (nestDevWithUsageHistoryId.length === nestDevStatus.length) {
                        setNestDevStatusCurrent(null);
                        setNestDev({ ...nestDev, statusId: null });
                        setDisabled(true);
                    }
                    for (const item of nestDevWithUsageHistoryId) {
                        if (item.id > maxId) {
                            maxId = item.id;
                            itemWithMaxId = item;
                        }
                    }
                    const devStatusById = await NestAPI.getNestDevelopmentStatusById(itemWithMaxId.statusId);
                    if (devStatusById.sequence < nestDevStatus.length) {
                        const developmentBySequence = await NestAPI.getNestDevelopmentStatusBySequence(
                            devStatusById.sequence + 1,
                        );
                        setNestDevStatusCurrent(developmentBySequence);
                        setNestDev({ ...nestDev, statusId: developmentBySequence.id });
                    }
                } else {
                    const developmentBySequence = await NestAPI.getNestDevelopmentStatusBySequence(1);
                    setNestDevStatusCurrent(developmentBySequence);
                    setNestDev({ ...nestDev, statusId: developmentBySequence.id });
                }
            } catch (error) {
                console.error(error);
            }
        };
        getDevStatusById();
    }, [nestDevWithUsageHistoryId]);

    useEffect(() => {
        const addFaqs = async () => {
            try {
                if (addStatus === false) {
                    setAddFail((prev) => prev + 1);
                    // setSubmitStatus(false);
                    setTimeout(() => {
                        setSubmitStatus();
                    }, 50000);
                } else {
                    const add = await NestAPI.addNestDevelopment(nestDev);
                    setVinh(true);
                    setAddStatus(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        addFaqs();
    }, [addStatus]);

    useEffect(() => {
        console.log(nestDev);
    }, [nestDev]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleShow = (id) => {
        setShow(!show);
        setNestDev({ ...nestDev, nestUsageHistoryId: id });
        setNestUsageHistoryId(id);
    };

    const handleSave = () => {
        if (
            nestDev.statusId === null ||
            nestDev.description === null ||
            nestDev.description === '' ||
            nestDev.description.length < 10
        ) {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        } else {
            setAddStatus(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
            setShow(!show);
        }
    };

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Nest Usage History</h1>
            </div>
            <div className={cx('add-btn')}>
                {/* <Button onClick={handleShow} colorScheme="green" size="lg">
                    Add Development
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button> */}
            </div>
            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        There was an error processing your request
                    </Alert>
                </Stack>
            )) ||
                (submitStatus === false && (
                    <Stack spacing={3}>
                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request
                        </Alert>
                    </Stack>
                ))}

            {show ? (
                <>
                    <Stepper index={nestDevStatusWithSequenceToUseStepper}>
                        {nestDevStatus &&
                            nestDevStatus.map((step, index) => (
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
                    {disabled ? (
                        <Text textAlign="center" color="grey" fontSize={18}>
                            The nest usage history has reached the final status
                        </Text>
                    ) : (
                        <TableContainer paddingTop={10} paddingBottom={10}>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th colSpan={2} className={cx('add-th')}>
                                            New Status for Nest
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Nest Usage History Id</Td>
                                        <Td>{nestDev.nestUsageHistoryId}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Status</Td>
                                        <Td>
                                            {nestDevStatusCurrent != null ? (
                                                <div className={cx('text-status')}>
                                                    <Text marginBottom={0}>{nestDevStatusCurrent.name}</Text>
                                                </div>
                                            ) : (
                                                <Text className={cx('text-status')} marginBottom={0}>
                                                    Lastest Status
                                                </Text>
                                            )}
                                        </Td>
                                    </Tr>

                                    <Tr>
                                        <Td>Description</Td>
                                        <Td>
                                            <Input
                                                type="text"
                                                borderColor="black"
                                                placeholder="Description..."
                                                fontSize={18}
                                                onChange={(e) => {
                                                    setNestDev({ ...nestDev, description: e.target.value });
                                                }}
                                            />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            {disabled ? (
                                <></>
                            ) : (
                                <Button
                                    colorScheme="green"
                                    onClick={handleSave}
                                    className={cx('save-btn')}
                                    fontSize={18}
                                >
                                    Save
                                </Button>
                            )}
                        </TableContainer>
                    )}
                </>
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <input type="text" placeholder="Title" />
                <input type="date" />

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Parrot Couple Id</Th>
                            <Th>Nest Id</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>
                            <Th>Create Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.user.fullName}</Td>
                                    <Td>{faqs.species[0].name}</Td>
                                    <Td>{formatDate(new Date(faqs.startDate))}</Td>
                                    <Td>{formatDate(new Date(faqs.endDate))}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    <Td>
                                        <Button colorScheme="green" onClick={() => handleShow(faqs.id)}>
                                            Update
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdNestUsageHistoryManagement;
