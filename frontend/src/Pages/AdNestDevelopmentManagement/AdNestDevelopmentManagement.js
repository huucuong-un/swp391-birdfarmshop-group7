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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdNestDevelopmentManagement/AdNestDevelopmentManagement.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import NestAPI from '~/Api/NestAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

const cx = classNames.bind(styles);

function AdNestDevelopmentManagement() {
    const [faqsList, setFaqsList] = useState([]);
    const [nestDevelopmentStatus, setNestDevelopmentStatus] = useState([]);
    const [nestUsageHistory, setNestUsageHistory] = useState([]);
    const [usageHistory, setUsageHistory] = useState('');
    const [devStatus, setDevStatus] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const [combineData, setCombineData] = useState([]);
    const [species, setSpecies] = useState([]);

    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await NestAPI.changeStatusForNestPrice(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };

    useEffect(() => {
        const getNestPriceList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 12,
                };
                const nestList = await NestAPI.getAllNestDevelopment(params);
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
        const getNestDevelopmentStatusWithID = async () => {
            const data = [];
            for (const item of faqsList) {
                const nestDevelopment = { ...item };
                try {
                    nestDevelopment.statusName = await NestAPI.getNestDevelopmentStatusById(item.statusId);
                    data.push(nestDevelopment);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };

        getNestDevelopmentStatusWithID();
    }, [faqsList]);

    useEffect(() => {
        const getNestDevelopmentStatusList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 30,
                };
                const nestDevelopmentStatusList = await NestAPI.getAllNestDevelopmentStatus(params);
                setNestDevelopmentStatus(nestDevelopmentStatusList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestDevelopmentStatusList();
        }
    }, [show]);

    useEffect(() => {
        const getNestUsageHistoryList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 3000,
                };
                const nestUsageHistoryList = await NestAPI.getAllNestUsageHistory(params);
                setNestUsageHistory(nestUsageHistoryList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestUsageHistoryList();
        }
    }, [show]);

    useEffect(() => {
        console.log(nestUsageHistory);
    }, [nestUsageHistory]);

    const [validate, setValidate] = useState({
        description: '',
    });
    useEffect(() => {
        const addFaqs = async () => {
            try {
                const data = {
                    nestUsageHistoryId: usageHistory,
                    statusId: devStatus,
                    eventDate: date,
                    description: description,
                };
                if (addStatus === false) {
                    setAddFail((prev) => prev + 1);
                    // setSubmitStatus(false);
                    setTimeout(() => {
                        setSubmitStatus();
                    }, 50000);
                } else {
                    const add = await NestAPI.addNestDevelopment(data);
                    setVinh(true);
                    setAddStatus(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        addFaqs();
    }, [addStatus]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleShow = () => {
        setShow(!show);
    };

    const handleSave = () => {
        if (
            usageHistory === '' ||
            devStatus === '' ||
            date === '' ||
            description === '' ||
            description.length > 150 ||
            description.length < 3
        ) {
            if (description.length > 150 || description.length < 3) {
                setValidate({ description: 'Description must be in 3 to 150 word' });
            }
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 5000);
        } else {
            setAddStatus(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 5000);
        }
    };

    const handleSwitch = () => {
        console.log('Switch');
        if (status === false) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    };

    useEffect(() => {
        console.log(description.length);
    }, [description]);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>NEST DEVELOPMENT</h1>
            </div>
            <div className={cx('add-btn')}>
                <Button onClick={handleShow} colorScheme="green" size="lg">
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button>
            </div>
            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        Added success
                    </Alert>
                </Stack>
            )) ||
                (submitStatus === false && (
                    <Stack spacing={3}>
                        <Alert status="error">
                            <AlertIcon />

                            <AlertTitle>
                                There was an error processing your request - <br />
                                {validate.description}
                            </AlertTitle>
                        </Alert>
                    </Stack>
                ))}

            {show ? (
                <TableContainer paddingTop={10} paddingBottom={10}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>New Nest Price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Nest Usage History</Td>
                                <Td>
                                    <select onChange={(e) => setUsageHistory(e.target.value)}>
                                        <option isChecked value="">
                                            History
                                        </option>
                                        {nestUsageHistory &&
                                            nestUsageHistory.map((nestUsaHistory, nestUsaHistoryIndex) => (
                                                <option key={nestUsaHistoryIndex} value={nestUsaHistory.id}>
                                                    {nestUsaHistory.id}
                                                </option>
                                            ))}
                                    </select>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Status</Td>
                                <Td>
                                    <select onChange={(e) => setDevStatus(e.target.value)}>
                                        <option isChecked value="">
                                            Status
                                        </option>
                                        {nestDevelopmentStatus &&
                                            nestDevelopmentStatus.map((nestDevStatus, nestDevStatusIndex) => (
                                                <option key={nestDevStatusIndex} value={nestDevStatus.id}>
                                                    {nestDevStatus.name}
                                                </option>
                                            ))}
                                    </select>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Event Date</Td>
                                <Td>
                                    <Input
                                        type="date"
                                        borderColor="black"
                                        placeholder="Price..."
                                        fontSize={18}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
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
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            {/* <Tr>
                                <Td>Status</Td>
                                <Td>
                                    <Switch size="lg" colorScheme="green" onChange={handleSwitch}></Switch>
                                </Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                    <Button colorScheme="green" onClick={handleSave} className={cx('save-btn')} fontSize={18}>
                        Save
                    </Button>
                </TableContainer>
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
                            <Th>Nest Usage History ID</Th>
                            <Th>Status</Th>
                            <Th>Description</Th>
                            <Th>Event Date</Th>
                            <Th>Created Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.nestUsageHistoryId}</Td>
                                    <Td>{faqs.statusName.name}</Td>
                                    <Td>{faqs.description}</Td>
                                    <Td>{formatDate(new Date(faqs.eventDate))}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    {/* <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={faqs.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(faqs.id, index)}
                                        />
                                    </Td> */}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdNestDevelopmentManagement;
