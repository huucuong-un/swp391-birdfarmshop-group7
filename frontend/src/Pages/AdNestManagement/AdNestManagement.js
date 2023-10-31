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
import { faMinus, faPlus, faArrowsRotate, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AdNestPriceManagement/AdNestPriceManagement.module.scss';
import FAQSAPI from '~/Api/FAQSAPI';
import NestAPI from '~/Api/NestAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

const cx = classNames.bind(styles);

function AdNestManagement() {
    const [faqsList, setFaqsList] = useState([]);
    const [nestPrice, setNestPrice] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(false);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [vinh, setVinh] = useState(true);
    const [combineData, setCombineData] = useState([]);
    const [sort, setSort] = useState({
        page: 1,
        limit: 5,
        searchDate: null,
        status: null,
        sortNestPriceID: null,
    });
    const changeStatus = async (id, index) => {
        const updatedFaqs = [...faqsList];
        updatedFaqs[index].status = !updatedFaqs[index].status;
        const change = await NestAPI.changeStatusForNest(id);
        setFaqsList(updatedFaqs);
        setVinh(true);
    };
    useEffect(() => {
        const sortData = async () => {
            try {
                const nestList = await NestAPI.searchSortForNest(sort);
                setFaqsList(nestList.listResult);
                setTotalPage(nestList.totalPage);
            } catch (error) {
                console.error(error);
            }
        };
        sortData();
    }, [sort]);
    useEffect(() => {
        const getNestList = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 5,
                };
                const nestList = await NestAPI.getAllNest(params);
                setFaqsList(nestList.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (vinh) {
            getNestList();
            setVinh(false);
        }
    }, [vinh]);

    useEffect(() => {
        const getNestPriceList = async () => {
            try {
                const nestPriceList = await NestAPI.getAll();
                setNestPrice(nestPriceList);
            } catch (error) {
                console.error(error);
            }
        };
        if (show) {
            getNestPriceList();
        }
    }, [sort, show]);

    useEffect(() => {
        const getNestPriceWithSpecies = async () => {
            const data = [];
            for (const item of nestPrice) {
                const nestPriceItem = { ...item };
                try {
                    if (item.status) {
                        nestPriceItem.species = await ParrotSpeciesAPI.getSpeciesBySpeciesIdObject(item.speciesId);
                        data.push(nestPriceItem);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };

        getNestPriceWithSpecies();
    }, [nestPrice]);

    useEffect(() => {
        const addFaqs = async () => {
            try {
                const data = {
                    status: status,
                    nestPriceId: title,
                };
                if (addStatus === false) {
                    setAddFail((prev) => prev + 1);
                    // setSubmitStatus(false);
                    setTimeout(() => {
                        setSubmitStatus();
                    }, 50000);
                } else {
                    console.log(data);
                    const add = await NestAPI.addNest(data);
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
        if (title === '' || title === 'Species') {
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

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 5,
            searchDate: sort.searchDate,
            status: sort.status,
            sortNestPriceId: sort.sortNestPriceID,
        });
        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 5,
            searchDate: null,
            status: null,
            sortNestPriceId: null,
        });
    };

    useEffect(() => {
        console.log(sort);
        console.log(faqsList);
    }, [sort]);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>NEST</h1>
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
                <TableContainer paddingTop={10} paddingBottom={10}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th colSpan={2}>New Nest</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Nest Price</Td>
                                <Td>
                                    <select onChange={(e) => setTitle(e.target.value)}>
                                        <option isChecked>Species</option>
                                        {combineData &&
                                            combineData.map((nestPrice, nestPriceIndex) => (
                                                <option key={nestPriceIndex} value={nestPrice.id}>
                                                    {nestPrice.species.name}
                                                </option>
                                            ))}
                                    </select>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Status</Td>
                                <Td>
                                    <Switch size="lg" colorScheme="green" onChange={handleSwitch}></Switch>
                                </Td>
                            </Tr>
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
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input
                    type="date"
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
                    name="sortPrice"
                    id="sortPrice"
                    onChange={(e) => setSort({ ...sort, sortNestPriceID: e.target.value })}
                >
                    <option value="" disabled selected>
                        Price
                    </option>
                    <option value="NPDESC">Descending</option>
                    <option value="NPASC">Ascending</option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Nest Price Id</Th>
                            <Th>Create Date</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {faqsList &&
                            faqsList.map((faqs, index) => (
                                <Tr key={index}>
                                    <Td>{faqs.id}</Td>
                                    <Td>{faqs.nestPriceId}</Td>
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
                    <p key={index} className={cx('number-page')} onClick={() => handlePageChange(index + 1)}>
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

export default AdNestManagement;
