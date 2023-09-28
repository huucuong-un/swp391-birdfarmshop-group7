import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrotSpecies/AddParrotSpecies.module.scss';
import {
    Input,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import Buttons from '~/Components/Button/Button';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

const cx = classNames.bind(styles);

function AddParrotSpecies() {
    // useState for alert status
    const [submissionStatus, setSubmissionStatus] = useState();

    //these useState for upload image
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const toast = useToast();
    const [show, setShow] = useState(false);
    const [species, setSpecies] = useState([]);

    const getParrotsSpecies = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
            setSpecies(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Gọi hàm getParrots khi component được mount
        getParrotsSpecies();
    }, []);
    // These state to handle data field
    // State for api parrot species
    const [parrotSpecies, setParrotSpecies] = useState({
        name: '',
        quantity: 3,
        nestQuantity: 13,
        description: '',
        availabilityStatus: true,
        origin: '',
        averageWeight: '',
        parrotAverageRating: 4.5,
        nestAverageRating: 4.0,
    });
    // State for api parrot species color
    const [parrotSpeciesColor, setParrotSpeciesColor] = useState({
        status: true,
        imageUrl: null,
        color: '',
        price: '',
        speciesID: 0,
    });

    const postDetails = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'parrotfarmshop');
            data.append('cloud_name', 'dkddhxz2g');
            fetch('https://api.cloudinary.com/v1_1/dkddhxz2g/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    };
    // This function to handle the data to submit through the post method
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('image', parrotSpeciesColor.imageUrl); // Append the image file
            // Make a POST request to the first API endpoint
            const responseSpecies = await axios.post('http://localhost:8086/api/parrot-species', {
                name: parrotSpecies.name,
                description: parrotSpecies.description,
                quantity: parrotSpecies.nestQuantity,
                parrotAverageRating: parrotSpecies.parrotAverageRating,
                nestAverageRating: parrotSpecies.nestAverageRating,
                origin: parrotSpecies.origin,
                averageWeight: parrotSpecies.averageWeight,
                // Add other fields you want to send to the first API
            });
            if (responseSpecies.status === 200) {
                console.log('POST request was successful at species!!');
            } else {
                console.error('POST request failed with status code - species: ', responseSpecies.status);
            }

            // Make a POST request to the second API endpoint
            const responseSpeciesColor = await axios.post('http://localhost:8086/api/parrot-species-color', {
                // Đoạn này để truyền các data fields về phía database
                speciesID: responseSpecies.data.id,
                status: parrotSpeciesColor.status,
                price: parrotSpeciesColor.price,
                color: parrotSpeciesColor.color,
                imageUrl: img,
            });
            console.log('pot detail' + postDetails);
            if (responseSpeciesColor.status === 200) {
                console.log('POST request was successful at species color');
            } else {
                console.error('POST request failed with status code - species color: ', responseSpeciesColor.status);
            }

            setParrotSpecies({
                name: '',
                quantity: 3,
                nestQuantity: 13,
                description: '',
                availabilityStatus: true,
                origin: '',
                averageWeight: 0,
                parrotAverageRating: 4.5,
                nestAverageRating: 4.0,
            });

            setParrotSpeciesColor({
                status: true,
                imageUrl: null,
                color: '',
                price: 0,
                speciesID: 0,
            });
            setSpecies([...species, responseSpecies.data]);

            setSubmissionStatus(true);
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setParrotSpeciesColor({ ...parrotSpeciesColor, image: file });
    };
    const handleShow = () => {
        setShow(!show);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('add-btn')}>
                <Buttons onClick={handleShow} add>
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </span>
                </Buttons>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <select name="species" id="species">
                            <option value="" disabled selected>
                                Species
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select name="status" id="status">
                            <option value="" disabled selected>
                                Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <input type="date" />
                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Price
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </form>
                </div>
            </div>

            <form className={cx('inner')} onSubmit={handleSubmit}>
                {show ? (
                    <TableContainer className={cx('table-container')}>
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
                        <Table size="xs ">
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Input</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Parrot species name</Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={parrotSpecies.name}
                                            onChange={(e) =>
                                                setParrotSpecies({ ...parrotSpecies, name: e.target.value })
                                            }
                                            variant="filled"
                                            placeholder="Parrot name"
                                            required
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>Description</Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={parrotSpecies.description}
                                            onChange={(e) =>
                                                setParrotSpecies({ ...parrotSpecies, description: e.target.value })
                                            }
                                            variant="filled"
                                            placeholder="Description"
                                            required
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>Origin</Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="origin"
                                            name="origin"
                                            value={parrotSpecies.origin}
                                            onChange={(e) =>
                                                setParrotSpecies({ ...parrotSpecies, origin: e.target.value })
                                            }
                                            variant="filled"
                                            placeholder="Origin"
                                            required
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>Average weight</Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            max={2}
                                            min={0}
                                            id="averageWeight"
                                            name="averageWeight"
                                            value={parrotSpecies.averageWeight}
                                            onChange={(e) =>
                                                setParrotSpecies({ ...parrotSpecies, averageWeight: e.target.value })
                                            }
                                            variant="filled"
                                            placeholder="Average weight"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Parrot color</Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="color"
                                            name="color"
                                            value={parrotSpeciesColor.color}
                                            onChange={(e) =>
                                                setParrotSpeciesColor({ ...parrotSpeciesColor, color: e.target.value })
                                            }
                                            placeholder="Parrot color"
                                            variant="filled"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Price</Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={parrotSpeciesColor.price}
                                            onChange={(e) =>
                                                setParrotSpeciesColor({ ...parrotSpeciesColor, price: e.target.value })
                                            }
                                            placeholder="Price"
                                            variant="filled"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Parrot image</Td>
                                    <Td>
                                        {/* <Input
                                        type="file"
                                        p={1.5}
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])}
                                        required
                                    /> */}
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
                                            isLoading={loading}
                                        >
                                            ADD
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                ) : (
                    <div></div>
                )}
                <h1>Parrot species</h1>
                <Accordion className={cx('accordion')} allowToggle>
                    {species.map((specie) => (
                        <AccordionItem key={specie.id} className={cx('accord-item')}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        {specie.name}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}></AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </form>
        </div>
    );
}

export default AddParrotSpecies;
