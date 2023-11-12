import classNames from 'classnames/bind';

import styles from '~/Components/UpdateParrot/UpdateParrot.module.scss';
import {
    Input,
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Thead,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Switch,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
const cx = classNames.bind(styles);

function UpdateParrot({ parrot, reloadData }) {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [species, setSpecies] = useState([]);
    const [speciesColor, setSpeciesColor] = useState([]);
    const [speciesColorByID, setSpeciesColorById] = useState([]);
    const [newParrot, setNewParrot] = useState(parrot);
    const [healthStatus, setHealthStatus] = useState(parrot.healthStatus);
    const [specificSpecies, setSpecificSpecies] = useState();

    const [selectedSpeciesId, setSelectedSpeciesId] = useState();

    const handleUpdateParentStatus = () => {
        // Simulate an update action here
        // After the update is successful, call the function from the parent to set reloadData to true
        // This will trigger the parent component to reload its data
        // setStatus(true); // Update the status to true
        reloadData(); // Call the parent function to set reloadData to true
    };
    useEffect(() => {
        const getSpecies = async () => {
            const speciesNow = await ParrotSpeciesAPI.getSpeciesByColorId(newParrot.colorID);
            setSpecificSpecies(speciesNow);
            setSpeciesColorById(speciesNow.id);
            setSelectedSpeciesId(speciesNow.id);
        };

        getSpecies();
    }, []);
    // Handel add parrot
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: newParrot.id,
                age: newParrot.age,
                status: newParrot.status,
                saleStatus: newParrot.saleStatus,
                pregnancyStatus: newParrot.pregnancyStatus,
                healthStatus: healthStatus,
                numberOfChildren: newParrot.numberOfChildren,
                colorID: newParrot.colorID,
            };
            const responseParrots = await ParrotAPI.updateParrot(data);

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
    const handleChangHealthStatus = () => {
        setHealthStatus(!healthStatus);
    };
    console.log(speciesColor.length);
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
                                <Th colSpan={2}>Update parrot</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr height={35}>
                                <Td>Parrot Age</Td>
                                <Td>
                                    <Input
                                        type="number"
                                        id="age"
                                        name="age"
                                        min={0}
                                        step={0.01}
                                        variant="filled"
                                        placeholder="Parrot age"
                                        value={newParrot.age}
                                        onChange={(e) => setNewParrot({ ...newParrot, age: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr height={35}>
                                <Td>Health Status</Td>
                                <Td>
                                    <Switch
                                        size="lg"
                                        isChecked={healthStatus}
                                        onChange={handleChangHealthStatus}
                                        marginTop={10}
                                    />
                                    {healthStatus ? (
                                        <p style={{ margin: 0, height: '35px' }}>Good</p>
                                    ) : (
                                        <p style={{ margin: 0, height: '35px' }}>Not good</p>
                                    )}
                                    <Input
                                        type="hidden"
                                        id="health"
                                        name="health"
                                        variant="filled"
                                        value={healthStatus}
                                        onChange={(e) => setNewParrot({ ...newParrot, healthStatus: e.target.value })}
                                    />
                                </Td>
                            </Tr>
                            <Tr height={35}>
                                <Td>Parrot species</Td>
                                <Td>
                                    <select
                                        className={cx('select-btn')}
                                        onChange={(e) => {
                                            setSpeciesColorById(e.target.value);
                                            setSelectedSpeciesId(e.target.value);
                                        }}
                                        required
                                    >
                                        <option key={'a'} value={'a'}>
                                            Selected species
                                        </option>

                                        {species.map((specie, index) => (
                                            <option
                                                key={index}
                                                value={specie.id}
                                                selected={specie.id === selectedSpeciesId}
                                            >
                                                {specie.name}
                                            </option>
                                        ))}
                                    </select>
                                </Td>
                            </Tr>

                            <Tr height={35}>
                                <Td>Parrot species color</Td>
                                <Td>
                                    {speciesColor.length === 0 ? (
                                        <>Species have no color</>
                                    ) : (
                                        <select
                                            className={cx('select-btn')}
                                            value={newParrot.colorID}
                                            onChange={(e) => {
                                                const selectedColorId = e.target.value;
                                                console.log('Selected color ID:', selectedColorId);

                                                setNewParrot({ ...newParrot, colorID: selectedColorId });
                                            }}
                                            required
                                        >
                                            <option key={'color'}>Select a color</option>

                                            {speciesColor.map((item, index) => (
                                                <>
                                                    <option
                                                        key={index}
                                                        value={item.id}
                                                        style={{ backgroundColor: item.color, padding: '5px' }}
                                                        selected={item.id === species}
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
                                <Td className={cx('submit-btn')} onClick={handleUpdateParentStatus}>
                                    <button
                                        type="submit"
                                        className={cx('btn')}
                                        width="100%"
                                        style={{ marginTop: 15 }}
                                        margin="8px"
                                        disabled={speciesColor.length === 0}
                                    >
                                        Save
                                    </button>
                                </Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default UpdateParrot;
