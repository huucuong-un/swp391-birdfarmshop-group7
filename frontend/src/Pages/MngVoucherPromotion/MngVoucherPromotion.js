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

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PromotionAPI from '~/Api/PromotionAPI';
import styles from '~/Pages/MngVoucherPromotion/MngVoucherPromotion.module.scss';

const cx = classNames.bind(styles);

function MngVoucherPromotion() {
    const [voucherList, setVoucherList] = useState([]);
    const [vinh, setVinh] = useState(true);
    const [show, setShow] = useState(false);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState(false);
    const [addStatus, setAddStatus] = useState(1);
    const [addFail, setAddFail] = useState(1);
    const [submitStatus, setSubmitStatus] = useState();
    const [sort, setSort] = useState({
        page: 1,
        limit: 10,
        searchStartDate: null,
        searchEndDate: null,
        status: null,
        sortDate: null,
        sortPrice: null,
    });

    useEffect(() => {
        const getVoucherList = async () => {
            try {
                const voucherList = await PromotionAPI.searchSortForPromotion(sort);
                console.log(voucherList.listResult);
                setVoucherList(voucherList.listResult);
                setTotalPage(voucherList.totalPage);
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
    }, [sort, vinh]);
    console.log(startDate);
    console.log(endDate);
    useEffect(() => {
        const addPromotion = async () => {
            try {
                const data = {
                    code: code,
                    description: description,
                    value: value,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                };
                // Check if at least one field in data has a value
                const hasData = Object.values(data).some((value) => value !== '' && value !== 0 && value !== false);

                if (hasData) {
                    console.log(data);
                    const add = await PromotionAPI.add(data);
                    setVinh(true);
                } else {
                    // Handle the case where there is no data to add
                    console.log('No data to add');
                }
            } catch (error) {
                console.error(error);
            }
        };

        addPromotion();
    }, [addStatus]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const changeStatus = async (id, index) => {
        const updatedVoucher = [...voucherList];
        updatedVoucher[index].status = !updatedVoucher[index].status;
        const change = await PromotionAPI.changeStatus(id);
        setVoucherList(updatedVoucher);
        setVinh(true);
    };

    const handleShow = () => {
        setShow(!show);
    };

    const handleSave = () => {
        if (code === '' || description === '' || value === '' || startDate === '' || endDate === '') {
            setAddFail((prev) => prev + 1);
            setSubmitStatus(false);
            setTimeout(() => {
                setSubmitStatus();
            }, 50000);
        } else {
            setAddStatus((prev) => prev + 1);
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
            limit: 10,
            searchStartDate: sort.searchStartDate,
            searchEndDate: sort.searchEndDate,
            status: sort.status,
            sortDate: sort.sortDate,
            sortPrice: sort.sortPrice,
        });
        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 10,
            searchStartDate: null,
            searchEndDate: null,
            status: null,
            sortDate: null,
            sortPrice: null,
        });
    };

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    PROMOTION MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add voucher</Text>
            </Flex>

            {(submitStatus === true && (
                <Stack spacing={3} className={cx('alert')}>
                    <Alert status="success">
                        <AlertIcon />
                        Add promotion successful
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
                                <Th colSpan={2}>New Voucher</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Voucher Code</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        borderColor="black"
                                        placeholder="Code..."
                                        fontSize={18}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Description</Td>
                                <Td>
                                    <Textarea
                                        borderColor="black"
                                        placeholder="Description..."
                                        fontSize={18}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Value</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        borderColor="black"
                                        placeholder="Value..."
                                        fontSize={18}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Start Date</Td>
                                <Td>
                                    <Input
                                        type="date"
                                        borderColor="black"
                                        fontSize={18}
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>End Date</Td>
                                <Td>
                                    <Input
                                        type="date"
                                        borderColor="black"
                                        fontSize={18}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
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
                                    {' '}
                                    <Button
                                        colorScheme="green"
                                        className={cx('save-btn')}
                                        fontSize={18}
                                        onClick={handleSave}
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
                    type="date"
                    id="searchStartDate"
                    name="searchStartDate"
                    onChange={(e) => setSort({ ...sort, searchStartDate: e.target.value })}
                />
                <input
                    type="date"
                    id="searchEndDate"
                    name="searchEndDate"
                    onChange={(e) => setSort({ ...sort, searchEndDate: e.target.value })}
                />

                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled>
                        Status
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled>
                        Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
                <select
                    name="sortPrice"
                    id="sortPrice"
                    onChange={(e) => setSort({ ...sort, sortPrice: e.target.value })}
                >
                    <option value="" disabled selected>
                        Date
                    </option>
                    <option value="PDESC">Descending</option>
                    <option value="PASC">Ascending</option>
                </select>
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
                                    <Td>
                                        <Switch
                                            size="lg"
                                            isChecked={voucher.status}
                                            colorScheme="green"
                                            onChange={() => changeStatus(voucher.id, index)}
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
                            backgroundColor: page === index + 1 ? '#f9ede9' : 'transparent', // Change background color when on the current page
                            color: page === index + 1 ? 'black' : '#000000', // Change text color when on the current page
                            padding: page === index + 1 ? '5px 7px' : '0px',
                            fontWeight: '600',
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

export default MngVoucherPromotion;
