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
} from '@chakra-ui/react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrot/AddParrot.module.scss';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Title from '~/Components/Title/Title';
import Buttons from '~/Components/Button/Button';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import UpdateParrot from '~/Components/UpdateParrot/UpdateParrot';

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
    // Handel add parrot
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseParrots = await axios.post('http://localhost:8086/api/parrot', {
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
            if (responseParrots.status === 200) {
                console.log('POST request was successful at species!!');
                setShouldFetchData(true); // Set to true to reload data
            } else {
                console.error('POST request failed with status code - species: ', responseParrots.status);
            }
            setSubmissionStatus(true);
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

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
                    speciesColorByID !== undefined ||
                    speciesColorByID !== 'Select a color' ||
                    speciesColorByID !== 'Selected specie' ||
                    speciesColorByID.length !== 0
                ) {
                    const listSpeciesColorById = await ParrotSpeciesAPI.getListBySpeciesId(speciesColorByID);
                    if (listSpeciesColorById != null) {
                        setSpeciesColor(listSpeciesColorById);
                    }
                } else {
                    // // Handle the case where the response is null
                    // console.error('Received a null response from ParrotSpeciesAPI.getListBySpeciesId');
                    // // You can set an empty array or perform other error handling here
                    setSpeciesColor([]);
                    return;
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
                const parrotList = await ParrotAPI.getAll();
                setParrotList(parrotList);
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
    }, [shouldFetchData, reloadData]);

    useEffect(() => {
        const fetchData = async () => {
            const data = [];

            try {
                for (const parrot of parrotList) {
                    const colors = await ParrotSpeciesColorAPI.findByParrotSpecieId(parrot.colorID);
                    const listParrot = { ...parrot };
                    const species = await ParrotSpeciesAPI.get(colors[0].id);
                    const colorName = colors[0].color;
                    const specieName = species[0].name;
                    listParrot.colorName = colorName;
                    listParrot.specieName = specieName;
                    data.push(listParrot);
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
    // console.log('- species list - ');
    // console.log(species);
    // console.log('- species color by id  - ');
    // console.log(speciesColorByID);
    // console.log('- species color by id list - ');
    // console.log(speciesColor);
    // console.log('- combine data -');
    // console.log(parrotList);
    // // console.log(parrotList[0].id);
    // console.log(combineData);
    const handleStatus = async (index) => {
        const updatedPost = [...parrotList];
        updatedPost[index].status = !updatedPost[index].status;

        try {
            // Send a request to update the status on the server
            await axios.delete(`http://localhost:8086/api/parrot/${updatedPost[index].id}`);
            // If the request is successful, update the state
            setParrotList(updatedPost);
        } catch (error) {
            toast({
                title: 'Error occur!',
                description: error.response.data.message,
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
    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);
    const handleOptionChange = (event) => {
        setParrots({ ...parrots, gender: event.target.value });
        setSelectedOption(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <Title system>Add Parrot</Title>
            </div>
            <div className={cx('add-btn')}>
                <Buttons onClick={handleShow} add>
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Buttons>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <select name="species" id="species">
                            <option value="a">Species</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select name="status" id="status">
                            <option value="b">Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <input type="date" />
                        <select name="price" id="price">
                            <option value="c">Price</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </form>
                </div>
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
                        <Table size="xs ">
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
                                            id="age"
                                            name="age"
                                            variant="filled"
                                            placeholder="Parrot age"
                                            onChange={(e) => setParrots({ ...parrots, age: e.target.value })}
                                            required
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>
                                        <p>Sale status</p>
                                    </Td>
                                    <Td>
                                        <Switch onChange={handleSaleStatus} size="lg" isChecked={saleStatus} />
                                        {saleStatus ? <p>Available</p> : <p>Unavailable</p>}
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
                                </Tr>

                                <Tr>
                                    <Td>
                                        <p>Pregnancy status</p>
                                    </Td>
                                    <Td>
                                        <Switch
                                            onChange={handlePregnancyStatus}
                                            size="lg"
                                            isChecked={pregnancyStatus}
                                        />
                                        {pregnancyStatus ? <p>Available</p> : <p>Unavailable</p>}
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
                                </Tr>

                                <Tr>
                                    <Td>
                                        <p>Health status</p>{' '}
                                    </Td>
                                    <Td>
                                        <Switch onChange={handleHealthStatus} size="lg" isChecked={healthStatus} />
                                        {healthStatus ? <p>Available</p> : <p>Unavailable</p>}
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
                                {/* Parrot gender */}
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
                                            onChange={(e) => setSpeciesColorById(e.target.value)}
                                        >
                                            <option key={'a'} value={'a'}>
                                                Selected specie
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

                                                    setParrots({ ...parrots, colorID: selectedColorId });
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
                                                        <p>{item.name}</p>
                                                    </>
                                                ))}
                                            </select>
                                        )}
                                    </Td>
                                </Tr>
                            </Tbody>

                            <Tfoot>
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
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </form>
            ) : (
                <></>
            )}
            <TableContainer className={cx('table-list')}>
                <Table size="xs">
                    <Thead>
                        <Tr>
                            <Th>Parrot ID</Th>
                            <Th>Age</Th>
                            <Th>Sale status</Th>
                            <Th>Pregnancy status</Th>
                            <Th>Health status</Th>
                            <Th>Children number</Th>
                            <Th>Color ID</Th>
                            <Th>Color</Th>
                            <Th>Specie</Th>
                            <Th>Parrot gender</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData.map((parrot, index) => (
                            <>
                                <Tr key={index + 'a'}>
                                    <Td>{parrot.id}</Td>
                                    <Td>{parrot.age}</Td>
                                    <Td>{parrot.saleStatus.toString()}</Td>
                                    <Td>{parrot.pregnancyStatus.toString()}</Td>
                                    <Td>{parrot.healthStatus.toString()}</Td>
                                    <Td>{parrot.numberOfChildren}</Td>
                                    <Td>{parrot.colorID}</Td>
                                    <Td>{parrot.colorName}</Td>
                                    <Td>{parrot.specieName}</Td>
                                    <Td>{parrot.gender === true ? 'male' : 'female'}</Td>
                                    <Td>
                                        <Switch
                                            onChange={() => handleStatus(index)}
                                            size="lg"
                                            isChecked={parrot.status}
                                            colorScheme="green"
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            key={parrot.id}
                                            onClick={() => toggleEditForm(parrot.id)}
                                            colorScheme={'green'}
                                            size={'lg'}
                                        >
                                            {openParrotID === parrot.id ? 'Close Edit' : 'Edit'}
                                        </Button>
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
        </div>
    );
}

export default AddParrot;
