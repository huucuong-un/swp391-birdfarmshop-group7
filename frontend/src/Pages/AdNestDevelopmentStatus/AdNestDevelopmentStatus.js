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
    Text,
    Box,
    Flex,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdNestDevelopmentStatus/AdNestDevelopmentStatus.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import NestAPI from '~/Api/NestAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import { json, useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AdNestDevelopmentStatus() {
    const [faqsList, setFaqsList] = useState([]);
    const [nestPrice, setNestPrice] = useState([]);
    const [show, setShow] = useState(false);
    const [showForUpdate, setShowForUpdate] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const [combineData, setCombineData] = useState([]);
    const [species, setSpecies] = useState([]);
    const [devStatus, setDevStatus] = useState([]);
    const [selectedValues, setSelectedValues] = useState(Array(faqsList.length).fill(''));
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));

    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await NestAPI.changeStatusForNestDevelopmentStatus(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };
    const [validate, setValidate] = useState({
        title: '',
        description: '',
    });
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
        const getNestPriceList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 12,
                };
                const nestList = await NestAPI.getAllNestDevelopmentStatus(params);
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
        const getNestDevelopmentStatusList = async () => {
            try {
                const nestPriceList = await NestAPI.getAll();
                setNestPrice(nestPriceList);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestDevelopmentStatusList();
        }
    }, [show]);

    useEffect(() => {
        const getSpecies = async () => {
            try {
                const speciesList = await ParrotSpeciesAPI.getAll();
                setSpecies(speciesList.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        getSpecies();
    }, [show]);

    useEffect(() => {
        console.log(status);
    }, [status]);

    useEffect(() => {
        const addFaqs = async () => {
            try {
                const data = {
                    name: title,
                    description: description,
                    available: status,
                };
                if (addStatus === false) {
                    setAddFail((prev) => prev + 1);
                    // setSubmitStatus(false);
                    setTimeout(() => {
                        setSubmitStatus();
                    }, 50000);
                } else {
                    const add = await NestAPI.addNestDevelopmentStatus(data);
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

    const handleShowForUpdate = () => {
        setShowForUpdate(!showForUpdate);
    };

    const handleSave = () => {
        if (
            title === '' ||
            description === '' ||
            title.length < 3 ||
            title.length > 30 ||
            description.length < 10 ||
            description.length > 150
        ) {
            if ((title.length < 3 || title.length > 30) && (description.length < 10 || description.length > 150)) {
                setValidate({
                    title: 'Name must be in 3 to 150 charactes',
                    description: 'Description must be in 2 to 200 charactes',
                });
            } else if (description.length < 10 || description.length > 150) {
                setValidate({ title: '', description: 'Description must be in 10 to 200 charactes' });
            } else if (title.length < 3 || title.length > 30) {
                setValidate({ title: 'Name must be in 3 to 150 charactes', description: '' });
            }
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 4000);
        } else {
            setAddStatus(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
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

    const handleSelectChange = (index, e) => {
        const selectedValue = JSON.parse(e.target.value);
        const newSelectedValues = [...selectedValues];
        newSelectedValues[index] = selectedValue;
        setSelectedValues(newSelectedValues);
    };

    function hasDuplicateId(selectedValues) {
        // const seenIds = {};
        // for (const item of selectedValues) {
        //     if (seenIds[item.id] || !item) {
        //         return true; // Có id trùng lặp
        //     }
        //     seenIds[item.id] = true;
        // }
        // return false; // Không có id trùng lặp
        const seenIds = {};
        let hasDuplicateOrNull = false;

        for (const item of selectedValues) {
            if (!item || seenIds[item.id]) {
                hasDuplicateOrNull = true;
                break;
            }
            seenIds[item.id] = true;
        }

        return hasDuplicateOrNull;
    }

    const handleUpdateSequence = () => {
        const hasDuplicates = hasDuplicateId(selectedValues);
        if (hasDuplicates || selectedValues.length != faqsList.length) {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        } else {
            for (const item of selectedValues) {
                let params = {
                    id: item.id,
                    sequence: item.sequence,
                };
                const updateSequence = NestAPI.changeSequenceForNestDevelopmentStatus(params);
            }
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        }
    };

    useEffect(() => {
        console.log(selectedValues);
    }, [selectedValues]);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    NEST DEVELOPMENT STATUS
                </Text>
            </Box>
            <div className={cx('add-btn')}>
                {/* <Button onClick={handleShow} colorScheme="green" size="lg">
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button> */}
                <Flex className={cx('add-button')} onClick={handleShow}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <Text className={cx('add-role-text')}>Add</Text>
                </Flex>
                {/* <Button onClick={handleShowForUpdate} colorScheme="green" size="lg">
                    Update
                    <span className={cx('span-icon', { 'rotate-icon': showForUpdate })}>
                        {showForUpdate ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button> */}
                <Flex className={cx('add-button')} onClick={handleShowForUpdate}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <Text className={cx('add-role-text')}>Update</Text>
                </Flex>
            </div>
            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        Success
                    </Alert>
                </Stack>
            )) ||
                (submitStatus === false && (
                    <Stack spacing={3}>
                        <Alert status="error">
                            <AlertIcon />
                            There was an error processing your request
                            <br />
                            {validate.description}
                            <br />
                            {validate.title}
                        </Alert>
                    </Stack>
                ))}

            {showForUpdate ? (
                <div className={cx('change-sequence-container')}>
                    <Text className={cx('change-sequence-title')}>Change Sequence</Text>
                    <div className={cx('change-sequence-show')}>
                        <p>Start</p>
                        <FontAwesomeIcon icon={faArrowRight} />

                        {faqsList &&
                            faqsList.map((nestDevStatus, nestDevStatusIndex) => (
                                <div key={nestDevStatusIndex} className={cx('change-sequence-show-item')}>
                                    <p>{nestDevStatus.name}</p>
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </div>
                            ))}

                        <p>End</p>
                    </div>
                    <div className={cx('update-zone')}>
                        {Array.from({ length: faqsList.length }, (_, index) => (
                            <div className={cx('update-zone-item')}>
                                <p key={index} className={cx('number-page')}>
                                    {index + 1}:
                                </p>
                                <select
                                    value={JSON.stringify(selectedValues[index])}
                                    onChange={(e) => handleSelectChange(index, e)}
                                >
                                    <option isChecked value={JSON.stringify(null)}>
                                        Status
                                    </option>
                                    {faqsList &&
                                        faqsList.map((nestDevStatus, nestDevStatusIndex) => (
                                            <option
                                                value={JSON.stringify({
                                                    id: nestDevStatus.id,
                                                    sequence: index + 1,
                                                })}
                                                key={nestDevStatusIndex}
                                            >
                                                {nestDevStatus.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        ))}
                    </div>
                    <Button
                        colorScheme="green"
                        onClick={() => handleUpdateSequence()}
                        className={cx('save-btn')}
                        fontSize={18}
                    >
                        Save
                    </Button>
                </div>
            ) : (
                <></>
            )}

            {show ? (
                <TableContainer paddingTop={10} paddingBottom={10}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>New Nest Development Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Name</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Name..."
                                        fontSize={18}
                                        onChange={(e) => setTitle(e.target.value)}
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

                            <Tr>
                                <Td>Status</Td>
                                <Td>
                                    <Switch size="lg" colorScheme="green" onChange={handleSwitch}></Switch>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td></Td>
                                <Td className={cx('submit-btn')}>
                                    <Button
                                        colorScheme="green"
                                        onClick={handleSave}
                                        className={cx('save-btn')}
                                        fontSize={18}
                                    >
                                        Save
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
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
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Sequence</Th>
                            <Th>Created Date</Th>
                            <Th>Available</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqsList &&
                            faqsList.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.name}</Td>
                                    <Td>{faqs.description}</Td>
                                    <Td>{faqs.sequence}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={faqs.available}
                                            colorScheme="green"
                                            onChange={() => changeStatus(faqs.id, index)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdNestDevelopmentStatus;
