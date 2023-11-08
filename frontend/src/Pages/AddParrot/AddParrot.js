import {
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Switch,
    Input,
    Thead,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Container,
    Text,
    Box,
    Flex,
} from '@chakra-ui/react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrot/AddParrot.module.scss';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faArrowsRotate,
    faAngleLeft,
    faAngleRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Title from '~/Components/Title/Title';
import Buttons from '~/Components/Button/Button';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import UpdateParrot from '~/Components/UpdateParrot/UpdateParrot';
import UserAPI from '~/Api/UserAPI';
import { useNavigate } from 'react-router-dom';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);
function AddParrot() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const toast = useToast();
    const [species, setSpecies] = useState([]);
    const [speciesColor, setSpeciesColor] = useState([]);
    const [speciesColorByID, setSpeciesColorById] = useState([]);
    const [saleStatus, setSaleStatus] = useState(false);
    const [healthStatus, setHealthStatus] = useState(false);
    const [pregnancyStatus, setPregnancyStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [sort, setSort] = useState({
        page: 1,
        limit: 5,
        age: null,
        status: null,
        saleStatus: null,
        pregnancyStatus: null,
        healthStatus: null,
        gender: null,
        searchDate: null,
        sortDate: null,
        sortAge: null,
    });
    const handleSaleStatus = () => {
        setSaleStatus(!saleStatus);
    };

    const handlePregnancyStatus = () => {
        setPregnancyStatus(!pregnancyStatus);
    };

    const handleHealthStatus = () => {
        setHealthStatus(!healthStatus);
    };

    const handleShow = () => {
        setShow(!show);
    };
    const [reloadData, setReloadData] = useState(false);
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };

    const [parrots, setParrots] = useState({
        age: 0,
        status: true,
        saleStatus: false,
        pregnancyStatus: false,
        healthStatus: true,
        numberOfChildren: 2,
        gender: true,
        colorID: 1,
    });
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));

    // Handel add parrot
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(speciesColorByID);
            if (species.length === 0 || speciesColorByID === 'a') {
                setSubmissionStatus(false);
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 5000);
                return;
            }

            const responseParrots = await ParrotAPI.add({
                // Add other fields you want to send to the first API
                age: parrots.age,
                status: parrots.status,
                saleStatus: saleStatus,
                pregnancyStatus: pregnancyStatus,
                healthStatus: healthStatus,
                numberOfChildren: parrots.numberOfChildren,
                gender: parrots.gender,
                colorID: parrots.colorID,
            });

            setShouldFetchData(true); // Set to true to reload data

            setSubmissionStatus(true);
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };
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
    // Add species list
    useEffect(() => {
        const fetchParrotSpecies = async () => {
            try {
                const parrotSpecie = await ParrotSpeciesAPI.getAll();

                setSpecies(parrotSpecie.listResult);
            } catch (error) {
                console.error(error + 'At Add parrot fetch parrot species');
            }
        };
        fetchParrotSpecies();
    }, [speciesColorByID]);

    // Find species color by species id
    useEffect(() => {
        const fetchParrotSpeciesColorbyID = async () => {
            try {
                if (
                    speciesColorByID === 'Select a color' ||
                    speciesColorByID === 'Selected specie' ||
                    speciesColorByID === 'a'
                ) {
                    return;
                }
                if (speciesColorByID !== undefined && speciesColorByID.length !== 0) {
                    const listSpeciesColorById = await ParrotSpeciesAPI.getListBySpeciesId(speciesColorByID);
                    if (listSpeciesColorById != null) {
                        setSpeciesColor(listSpeciesColorById);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchParrotSpeciesColorbyID();
    }, [speciesColorByID]);

    // Fetch parrot list
    const [parrotList, setParrotList] = useState([]);
    const [combineData, setCombineData] = useState([]);
    useEffect(() => {
        const fetchParrotList = async () => {
            try {
                const parrotList = await ParrotAPI.searchSortForParrot(sort);
                setParrotList(parrotList.listResult);
                setTotalPage(parrotList.totalPage);
            } catch (error) {
                console.error(error + ' At Add parrot fetch parrot species color by id');
            }
        };

        if (shouldFetchData) {
            fetchParrotList();
            setShouldFetchData(false);
        } else if (reloadData) {
            fetchParrotList();
            setReloadData(false);
        } else {
            fetchParrotList();
        }
    }, [sort, shouldFetchData, reloadData]);
    useEffect(() => {
        const fetchData = async () => {
            const data = [];

            try {
                for (const parrot of parrotList) {
                    if (parrot.colorID !== null) {
                        const colors = await ParrotSpeciesColorAPI.findByParrotSpecieId(parrot.colorID);
                        console.log(colors);
                        const listParrot = { ...parrot };
                        const species = await ParrotSpeciesAPI.get(colors[0].speciesID);
                        const colorName = colors[0].color;
                        const specieName = species[0].name;
                        listParrot.colorName = colorName;
                        listParrot.specieName = specieName;
                        data.push(listParrot);
                    }
                }
            } catch (error) {
                console.error(error);
            }
            setCombineData(data);
        };
        if (shouldFetchData) {
            fetchData();
        } else {
            fetchData();
        }
    }, [shouldFetchData, parrotList]);
    const handleStatus = async (index) => {
        const updatedPost = [...parrotList];
        updatedPost[index].status = !updatedPost[index].status;

        try {
            // Send a request to update the status on the server
            await ParrotAPI.changeStatus(updatedPost[index].id);
            // If the request is successful, update the state
            setParrotList(updatedPost);
        } catch (error) {
            toast({
                title: 'Error occur!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            console.log(error);
        }
    };
    const [openParrotID, setOpenParrotID] = useState(null);
    const toggleEditForm = (parrotID) => {
        if (openParrotID === parrotID) {
            // If the form is already open for this species, close it
            setOpenParrotID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenParrotID(parrotID);
        }
    };

    const [selectedOption, setSelectedOption] = useState('true');

    const handleOptionChange = (event) => {
        setParrots({ ...parrots, gender: event.target.value });
        setSelectedOption(event.target.value);
    };

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 5,
            age: null,
            status: null,
            saleStatus: null,
            pregnancyStatus: null,
            healthStatus: null,
            gender: null,
            searchDate: null,
            sortDate: null,
            sortAge: null,
        });
        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 5,
            age: null,
            status: null,
            saleStatus: null,
            pregnancyStatus: null,
            healthStatus: null,
            gender: null,
            searchDate: null,
            sortDate: null,
            sortAge: null,
        });
    };
    return (
        // <div className={cx('wrapper')}>
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    PARROT MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add parrot</Text>
            </Flex>

            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                {/* Sort 1 */}
                <input type="number" placeholder="Age" onChange={(e) => setSort({ ...sort, age: e.target.value })} />
                {/* Sort 2 */}
                <input type="date" onChange={(e) => setSort({ ...sort, searchDate: e.target.value })} />
                {/* Sort 3 */}
                <select name="gender" id="gender" onChange={(e) => setSort({ ...sort, gender: e.target.value })}>
                    <option value="b">Gender</option>
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                </select>
                {/* Sort 4 */}
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="b">Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                {/* Sort 5 */}
                <select
                    name="healthStatus"
                    id="healthStatus"
                    onChange={(e) => setSort({ ...sort, healthStatus: e.target.value })}
                >
                    <option value="b">Health status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                {/* Sort 6 */}

                <select
                    name="pregnancyStatus"
                    id="pregnancyStatus"
                    onChange={(e) => setSort({ ...sort, pregnancyStatus: e.target.value })}
                >
                    <option value="b">Pregnancy status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                {/* Sort 7 */}
                <select
                    name="saleStatus"
                    id="saleStatus"
                    onChange={(e) => setSort({ ...sort, saleStatus: e.target.value })}
                >
                    <option value="b">Sale status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                {/* Sort 8 */}
                <select name="sortAge" id="sortAge" onChange={(e) => setSort({ ...sort, sortAge: e.target.value })}>
                    <option value="b">Age</option>
                    <option value="ADESC">Descending</option>
                    <option value="AASC">Ascending</option>
                </select>
                {/* Sort 9 */}
                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="b">Date</option>
                    <option value="DDESC">Descending</option>
                    <option value="DASC">Ascending</option>
                </select>
            </div>
            {show ? (
                <form className={cx('inner')} onSubmit={handleSubmit}>
                    <div className={cx('table-container')}>
                        {(submissionStatus === true && (
                            <Alert status="success">
                                <AlertIcon />
                                <AlertTitle>Success!</AlertTitle>
                                <AlertDescription>Your form has been submitted successfully.</AlertDescription>
                            </Alert>
                        )) ||
                            (submissionStatus === false && (
                                <Alert status="error">
                                    <AlertIcon />
                                    <AlertTitle>Failed to add parrot species - </AlertTitle>
                                    <AlertDescription>Please check your input!!!</AlertDescription>
                                </Alert>
                            ))}
                    </div>
                    <TableContainer className={cx('table-container')}>
                        <Table size="xs">
                            <Thead>
                                <Tr>
                                    <Th colSpan={2}>Add parrot</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <p>Parrot Age</p>
                                    </Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            id="age"
                                            name="age"
                                            placeholder="Count by year"
                                            onChange={(e) =>
                                                setParrots({ ...parrots, age: parseFloat(e.target.value) })
                                            } // Parse the value as a float
                                            required
                                        />
                                    </Td>
                                </Tr>

                                {/* <Tr>
                                    <Td>
                                        <p>Sale status</p>
                                    </Td>
                                    <Td>
                                        <Switch onChange={handleSaleStatus} size="lg" isChecked={saleStatus} />
                                        {saleStatus ? <p>Can sale</p> : <p>Can not sale</p>}
                                        <Input
                                            type="hidden"
                                            id="sale"
                                            name="sale"
                                            variant="filled"
                                            value={saleStatus}
                                            onChange={(e) =>
                                                setParrots({ ...parrots, saleStatus: e.target.value === 'true' })
                                            }
                                        />
                                    </Td>
                                </Tr> */}

                                {/* <Tr>
                                    <Td>
                                        <p>Pregnancy status</p>
                                    </Td>
                                    <Td>
                                        <Switch
                                            onChange={handlePregnancyStatus}
                                            size="lg"
                                            isChecked={pregnancyStatus}
                                        />
                                        {pregnancyStatus ? <p>In progress</p> : <p> No</p>}
                                        <Input
                                            type="hidden"
                                            id="pregnancy"
                                            name="pregnancy"
                                            variant="filled"
                                            value={pregnancyStatus}
                                            onChange={(e) =>
                                                setParrots({ ...parrots, pregnancyStatus: e.target.value })
                                            }
                                        />
                                    </Td>
                                </Tr> */}

                                <Tr>
                                    <Td>
                                        <p>Health status</p>
                                    </Td>
                                    <Td>
                                        <Switch onChange={handleHealthStatus} size="lg" isChecked={healthStatus} />
                                        {healthStatus ? <p>Good</p> : <p>Not good</p>}
                                        <Input
                                            type="hidden"
                                            id="health"
                                            name="health"
                                            variant="filled"
                                            value={healthStatus}
                                            onChange={(e) => setParrots({ ...parrots, healthStatus: e.target.value })}
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>
                                        <p>Parrot gender</p>
                                    </Td>
                                    <Td>
                                        <label>
                                            <input
                                                type="radio"
                                                value="true"
                                                checked={selectedOption === 'true'}
                                                onChange={handleOptionChange}
                                            />
                                            Male
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="false"
                                                checked={selectedOption === 'false'}
                                                onChange={handleOptionChange}
                                            />
                                            Female
                                        </label>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <p>Parrot species </p>
                                    </Td>
                                    <Td>
                                        <select
                                            className={cx('select-btn')}
                                            onChange={(e) => {
                                                setSpeciesColor([]);
                                                setSpeciesColorById(e.target.value);
                                            }}
                                        >
                                            <option key={'a'} value={'a'}>
                                                Selected species
                                            </option>

                                            {species.map((specie, index) => (
                                                <option key={index} value={specie.id}>
                                                    {specie.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>
                                        <p>Parrot species color </p>
                                    </Td>
                                    <Td>
                                        {speciesColor.length === 0 ? (
                                            'Species have no color'
                                        ) : (
                                            <select
                                                className={cx('select-btn')}
                                                onChange={(e) => {
                                                    const selectedColorId = e.target.value;
                                                    console.log('Selected color ID:', selectedColorId);
                                                    setParrots({ ...parrots, colorID: e.target.value });
                                                }}
                                            >
                                                <option key={'color'}>Select a color</option>
                                                {speciesColor.map((item, index) => (
                                                    <>
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                            style={{ backgroundColor: item.color, padding: '5px' }}
                                                        >
                                                            {item.color}
                                                        </option>
                                                    </>
                                                ))}
                                            </select>
                                        )}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td></Td>
                                    <Td className={cx('submit-btn')}>
                                        <Button
                                            type="submit"
                                            className={cx('btn')}
                                            width="100%"
                                            style={{ marginTop: 15 }}
                                            margin="8px"
                                        >
                                            ADD
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>

                            <Tfoot></Tfoot>
                        </Table>
                    </TableContainer>
                </form>
            ) : (
                <></>
            )}
            <TableContainer className={cx('table-list')}>
                <Table size="md">
                    <Thead>
                        <Tr>
                            <Th>Parrot ID</Th>
                            <Th>Age</Th>
                            <Th>Sale status</Th>
                            {/* <Th>Pregnancy status</Th> */}
                            <Th>Health status</Th>
                            {/* <Th>Children number</Th> */}
                            <Th>Color</Th>
                            <Th>Species</Th>
                            <Th>Gender</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData.map((parrot, index) => (
                            <>
                                <Tr key={index + 'a'}>
                                    <Td>{parrot.id}</Td>
                                    <Td>{parrot.age} year</Td>
                                    <Td>{parrot.saleStatus ? <>Sold</> : <>Available</>}</Td>
                                    {/* <Td>{parrot.pregnancyStatus.toString()}</Td> */}
                                    <Td>{parrot.healthStatus ? <>Good</> : <>Not good</>}</Td>
                                    {/* <Td>{parrot.numberOfChildren}</Td> */}
                                    <Td>{parrot.colorName}</Td>
                                    <Td>{parrot.specieName}</Td>
                                    <Td>{parrot.gender === true ? 'male' : 'female'}</Td>
                                    <Td>
                                        {parrot.saleStatus ? (
                                            <></>
                                        ) : (
                                            <Switch
                                                onChange={() => handleStatus(index)}
                                                size="lg"
                                                isChecked={parrot.status}
                                                colorScheme="green"
                                            />
                                        )}
                                    </Td>
                                    <Td>
                                        {parrot.saleStatus ? (
                                            <></>
                                        ) : (
                                            <Button
                                                key={parrot.id}
                                                onClick={() => toggleEditForm(parrot.id)}
                                                colorScheme={'green'}
                                                size={'lg'}
                                            >
                                                {openParrotID === parrot.id ? 'Close Edit' : 'Edit'}
                                            </Button>
                                        )}
                                    </Td>
                                    <Td key={index + 'l'}></Td>
                                </Tr>
                                <Tr key={index + 'b'}>
                                    {openParrotID === parrot.id && (
                                        <Td colSpan={11}>
                                            <UpdateParrot
                                                key={index}
                                                parrot={parrot}
                                                reloadData={handleUpdateSuccess}
                                            ></UpdateParrot>
                                        </Td>
                                    )}
                                </Tr>
                            </>
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

export default AddParrot;
