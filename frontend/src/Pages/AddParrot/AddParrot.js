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
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Buttons from '~/Components/Button/Button';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import Title from '~/Components/Title/Title';

const cx = classNames.bind(styles);
function AddParrot() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);

    // const [specieColorId, setSpecieColorId] = useState();

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

    const [parrots, setParrots] = useState({
        age: 0,
        status: true,
        saleStatus: false,
        pregnancyStatus: false,
        healthStatus: true,
        numberOfChildren: 2,
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
                    // listSpeciesColorById !== null ||
                    speciesColorByID !== 'Select a color' &&
                    speciesColorByID !== 'Selected specie' &&
                    speciesColorByID.length !== 0
                ) {
                    const listSpeciesColorById = await ParrotSpeciesAPI.getListBySpeciesId(speciesColorByID);
                    if (listSpeciesColorById != null) {
                        setSpeciesColor(listSpeciesColorById);
                    } else {
                        return;
                    }
                } else {
                    // // Handle the case where the response is null
                    // console.error('Received a null response from ParrotSpeciesAPI.getListBySpeciesId');
                    // // You can set an empty array or perform other error handling here
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
        }
        fetchParrotList();
    }, [shouldFetchData]);
    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            try {
                for (const parrot of parrotList) {
                    const listParrot = { ...parrot };
                    const colors = await ParrotSpeciesColorAPI.findByParrotSpecieId(parrot.colorID);
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
        }
        fetchData();
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
                                    <Th>Title</Th>
                                    <Th>Input</Th>
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

                                <Tr>
                                    <Td>
                                        <p>Parrot species </p>
                                    </Td>
                                    <Td>
                                        <select
                                            className={cx('select-btn')}
                                            onChange={(e) => setSpeciesColorById(e.target.value)}
                                        >
                                            <option key={'a'}>Selected specie</option>
                                            {species.map((specie, index) => (
                                                <option key={index} value={specie.id}>
                                                    {specie.id}
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
                                            <p>Species have no color</p>
                                        ) : (
                                            <select
                                                className={cx('select-btn')}
                                                onChange={(e) => {
                                                    const selectedColorId = e.target.value;
                                                    console.log('Selected color ID:', selectedColorId);
                                                    // setSpecieColorId(selectedColorId); // Update the selected color ID
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
                                                            {item.id}
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
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData.map((parrot, index) => (
                            <Tr>
                                <Td key={index + 'a'}>{parrot.id}</Td>
                                <Td key={index + 'b'}>{parrot.age}</Td>
                                <Td key={index + 'c'}>{parrot.saleStatus.toString()}</Td>
                                <Td key={index + 'd'}>{parrot.pregnancyStatus.toString()}</Td>
                                <Td key={index + 'e'}>{parrot.healthStatus.toString()}</Td>
                                <Td key={index + 'f'}>{parrot.numberOfChildren}</Td>
                                <Td key={index + 'g'}>{parrot.colorID}</Td>
                                <Td key={index + 'h'}>{parrot.colorName}</Td>
                                <Td key={index + 'i'}>{parrot.specieName}</Td>
                                <Td key={index + 'j'}>{parrot.status.toString()}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AddParrot;
