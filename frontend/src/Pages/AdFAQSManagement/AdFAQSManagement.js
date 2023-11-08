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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faArrowsRotate,
    faAngleLeft,
    faAngleRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdFAQSManagement/AdFAQSManagement.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AdFAQSManagement() {
    const [faqsList, setFaqsList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(1);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const navigate = useNavigate();
    const [sort, setSort] = useState({
        page: 1,
        limit: 10,
        searchTitle: null,
        searchDate: null,
        status: null,
        sortTitle: null,
    });

    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await FAQSAPI.changeStatus(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };
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
                    navigate('/login-user');
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
                    navigate('/login-user');
                } else {
                    if (userByToken.roleId === 1) {
                        navigate('/login-user');
                    }
                    if (userByToken.roleId !== 4) {
                        navigate('/system/login');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserByToken();
    }, [token]);
    useEffect(() => {
        const getFaqsList = async () => {
            try {
                const faqsList = await FAQSAPI.sortSearchForFaqs(sort);
                setFaqsList(faqsList.listResult);
                setTotalPage(faqsList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };
        if (vinh) {
            getFaqsList();
            setVinh(false);
        } else {
            getFaqsList();
        }
    }, [sort, vinh]);
    const [validate, setValidate] = useState({ title: '', content: '' });
    useEffect(() => {
        const addFaqs = async () => {
            try {
                if (
                    (title.length !== 0 && content.length !== 0 && title.length < 3) ||
                    title.length > 150 ||
                    content.length < 2 ||
                    content.length > 200
                ) {
                    if (title.length < 3 || title.length > 150 || content.length < 2 || content.length > 200) {
                        setValidate({
                            title: 'Title must be in 3 to 150 charactes',
                            content: 'Content must be in 2 to 200 charactes',
                        });
                    } else if (content.length < 2 || content.length > 200) {
                        setValidate({ title: '', content: 'Content must be in 2 to 200 charactes' });
                    } else if (title.length < 3 || title.length > 150) {
                        setValidate({ title: 'Title must be in 3 to 150 charactes', content: '' });
                    }
                } else {
                    const data = {
                        title: title,
                        content: content,
                        status: status,
                    };

                    const add = await FAQSAPI.add(data);
                    setVinh(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        addFaqs();
    }, [addStatus]);

    useEffect(() => {
        console.log(status);
    }, [status]);

    useEffect(() => {
        console.log(addFail);
    }, [addFail]);

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
            title === '' ||
            content === '' ||
            title.length < 3 ||
            title.length > 150 ||
            content.length < 2 ||
            content.length > 200
        ) {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 5000);
        } else {
            setAddStatus((prev) => prev + 1);
            setSubmitStatus(true);
            setTimeout(() => {
                setSubmitStatus();
            }, 2000);
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
        console.log(vinh);
    }, [vinh]);

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 5,
            searchTitle: sort.searchTitle,
            status: sort.status,
            searchDate: sort.searchDate,
            sortTitle: sort.sortTitle,
        });

        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 5,
            searchTitle: null,
            status: null,
            searchDate: null,
            sortTitle: null,
        });
    };

    useEffect(() => {
        console.log(sort);
    }, [sort]);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            {/* <div className={cx('title')}>
                <h1>FAQS</h1>
            </div> */}
            {/* <div className={cx('add-btn')}>
                <Button onClick={handleShow} colorScheme="green" size="lg">
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button>
            </div> */}

            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    FAQs MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add new faqs</Text>
            </Flex>

            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        Success
                    </Alert>
                </Stack>
            )) ||
                (submitStatus === false && (
                    <Stack spacing={4}>
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>
                                {validate.title}
                                <br />
                                {validate.content}
                            </AlertTitle>
                        </Alert>
                    </Stack>
                ))}

            {show ? (
                <TableContainer paddingTop={10} paddingBottom={10}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>New FAQS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Title</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Title..."
                                        fontSize={18}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Content</Td>
                                <Td>
                                    <Textarea
                                        borderColor="black"
                                        placeholder="Content..."
                                        fontSize={18}
                                        onChange={(e) => setContent(e.target.value)}
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
                                <Td>
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
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input
                    type="text"
                    id="searchTitle"
                    name="searchTitle"
                    placeholder="Title"
                    onChange={(e) => setSort({ ...sort, searchTitle: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date"
                    id="searchDate"
                    name="searchDate"
                    onChange={(e) => setSort({ ...sort, searchDate: e.target.value })}
                />

                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                <select
                    name="sortTitle"
                    id="sortTitle"
                    onChange={(e) => setSort({ ...sort, sortTitle: e.target.value })}
                >
                    <option value="" disabled selected>
                        Title
                    </option>
                    <option value="TDESC">A-Z</option>
                    <option value="TASC">Z-A</option>
                </select>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Title</Th>
                            <Th>Content</Th>
                            <Th>Create At</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqsList &&
                            faqsList.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.title}</Td>
                                    <Td>{faqs.content}</Td>
                                    <Td>{formatDate(new Date(faqs.createdDate))}</Td>
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={faqs.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(faqs.id, index)}
                                        />
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
                    <p
                        key={index}
                        className={cx('number-page')}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            border: page === index + 1 ? '1px solid black' : 'none', // Change background color when on the current page
                            borderRadius: page === index + 1 ? '4px ' : 'none', // Change background color when on the current page
                            opacity: page === index + 1 ? '0.5' : '1', // Change background color when on the current page
                            backgroundColor: page === index + 1 ? '#ff0000' : 'transparent', // Change background color when on the current page
                            color: page === index + 1 ? '#ffffff' : '#000000', // Change text color when on the current page
                            padding: page === index + 1 ? '5px 7px' : '0px',
                        }}
                    >
                        {index + 1}
                    </p>
                ))}
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </Container>
    );
}

export default AdFAQSManagement;
