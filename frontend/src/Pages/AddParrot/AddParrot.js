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
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import Title from '~/Components/Title/Title';

const cx = classNames.bind(styles);
function AddParrot() {
    const [submissionStatus, setSubmissionStatus] = useState();

    const [species, setSpecies] = useState([]);
    const [speciesColor, setSpeciesColor] = useState([]);
    const [speciesColorByID, setSpeciesColorById] = useState([]);
    // const [speciesMapping, setSpeciesMapping] = useState({});
    const [saleStatus, setSaleStatus] = useState(false);
    const [pregnancyStatus, setPregnancyStatus] = useState(false);
    const [healthStatus, setHealthStatus] = useState(false);

    const handleSaleStatus = () => {
        setSaleStatus(!saleStatus);
    };

    const handlePregnancyStatus = () => {
        setPregnancyStatus(!pregnancyStatus);
    };

    const handleHealthStatus = () => {
        setHealthStatus(!healthStatus);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the first API endpoint
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
                setSpecies(parrotSpecie);
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
                const listSpeciesColorById = await ParrotSpeciesAPI.getListBySpeciesId(speciesColorByID);
                setSpeciesColor(listSpeciesColorById || []);
            } catch (error) {
                console.error(error + 'At Add parrot fetch parrot species color by id');
            }
        };
        fetchParrotSpeciesColorbyID();
    }, [speciesColorByID]);

    console.log('- species lis - ');
    console.log(species);
    console.log('- species color by id  - ');
    console.log(speciesColorByID);
    console.log('- species color by id list - ');
    console.log(speciesColor);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <Title system>Add Parrot</Title>
            </div>
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
                                    <Switch onChange={handlePregnancyStatus} size="lg" isChecked={pregnancyStatus} />
                                    {pregnancyStatus ? <p>Available</p> : <p>Unavailable</p>}
                                    <Input
                                        type="hidden"
                                        id="pregnancy"
                                        name="pregnancy"
                                        variant="filled"
                                        value={pregnancyStatus}
                                        onChange={(e) => setParrots({ ...parrots, pregnancyStatus: e.target.value })}
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
                                        <option value="0">Select a species</option>
                                        {species.map((specie) => (
                                            <option key={specie.id} value={specie.id}>
                                                Specie ID: {specie.id} | Specie name: {specie.name}
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
                                            onChange={(e) => setParrots({ ...parrots, colorID: e.target.value })}
                                        >
                                            {speciesColor.map((item) => (
                                                <option
                                                    key={item.id}
                                                    style={{ backgroundColor: item.color, padding: '5px' }}
                                                    value={item.id}
                                                >
                                                    {item.id} - {item.color}{' '}
                                                </option>
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
        </div>
    );
}

export default AddParrot;
