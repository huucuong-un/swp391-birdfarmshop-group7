import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrotSpecies/AddParrotSpecies.module.scss';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
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
} from '@chakra-ui/react';

const cx = classNames.bind(styles);

function AddParrotSpecies() {
    // useState for alert status
    const [submissionStatus, setSubmissionStatus] = useState();

    //these useState for upload image
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const toast = useToast();

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

    return (
        <div className={cx('wrapper')}>
            <form className={cx('inner')} onSubmit={handleSubmit}>
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
                                <Td>Parrot name</Td>
                                <Td>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={parrotSpecies.name}
                                        onChange={(e) => setParrotSpecies({ ...parrotSpecies, name: e.target.value })}
                                        variant="filled"
                                        placeholder="Parrot name"
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr>
                                <Td>Parrot description</Td>
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
                                        onChange={(e) => setParrotSpecies({ ...parrotSpecies, origin: e.target.value })}
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
                                    <Input
                                        type="file"
                                        p={1.5}
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])}
                                        required
                                    />
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
            </form>
        </div>
    );
}

export default AddParrotSpecies;
