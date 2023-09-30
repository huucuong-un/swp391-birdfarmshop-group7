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
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import SystemNavbar from '~/Parts/SystemNavbar/SystemNavbar';

const cx = classNames.bind(styles);
function AddParrot() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [parrotSpeciesColor, setParrotSpeciesColor] = useState([]);
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [speciesMapping, setSpeciesMapping] = useState({});
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

    const getParrotsSpeciesColor = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesColorAPI.getAll();
            setParrotSpeciesColor(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };
    const getParrotsSpecies = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
            setParrotSpecies(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const speciesMappingObj = {};
        parrotSpeciesColor.forEach((colorItem) => {
            if (colorItem.speciesID && colorItem.speciesID in parrotSpecies) {
                speciesMappingObj[colorItem.speciesID] = parrotSpecies[colorItem.speciesID].name;
            }
        });
        setSpeciesMapping(speciesMappingObj);
    }, [parrotSpeciesColor, parrotSpecies]);

    useEffect(() => {
        // Gọi hàm getParrots khi component được
        getParrotsSpeciesColor();
        getParrotsSpecies();
    }, []);

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
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
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
                                <Td>Parrot age</Td>
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
                                <Td>Sale status</Td>
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
                                <Td>Pregnancy status</Td>
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
                                <Td>Health status</Td>
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
                                <Td>Parrot color</Td>
                                <Td>
                                    <select
                                        value={parrots.colorID} // Bind the selected value to the state
                                        onChange={(e) => setParrots({ ...parrots, colorID: e.target.value })} // Update the state when an option is selected
                                    >
                                        {parrotSpeciesColor.map((colorItem) => (
                                            <option key={colorItem.id} value={colorItem.id}>
                                                {speciesMapping[colorItem.speciesID]} - {colorItem.color} -{' '}
                                                {colorItem.id}
                                            </option>
                                        ))}
                                    </select>
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
