import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrotSpecies/AddParrotSpecies.module.scss';
import {
    Input,
    Table,
    Tbody,
    Tfoot,
    Tr,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Flex,
    Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowsRotate, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddSpeciesColor from '~/Pages/AddSpeciesColor/AddSpeciesColor';

const cx = classNames.bind(styles);

function AddParrotSpecies() {
    const [sort, setSort] = useState({
        page: 1,
        limit: 12,
        email: null,
        phone: null,
        date: null,
        sortDate: null,
        sortPrice: null,
    });
    const handleClear = () => {
        setSort({
            page: 1,
            limit: 12,
            email: null,
            phone: null,
            date: null,
            sortDate: null,
            sortPrice: null,
        });
    };
    // useState for alert status
    const [submissionStatus, setSubmissionStatus] = useState();
    const [species, setSpecies] = useState([]);
    const [addSpeciesColorKey, setAddSpeciesColorKey] = useState(0);
    //these useState for upload image
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    // Combine data

    // Parrot Species and species color usestate
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
        status: true,
        img: '',
    });
    // State for api parrot species color
    const [parrotSpeciesColor, setParrotSpeciesColor] = useState({
        status: true,
        imageUrl: null,
        color: '',
        price: '',
        speciesID: 0,
    });

    //  State to set show for add btn
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    // Toast
    const toast = useToast();

    // These state to handle data field
    // State for api parrot species

    // Handle posting image
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
    const [validate, setValidate] = useState({ title: '', description: '', color: '' });
    // This function to handle the data to submit through the post method
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                parrotSpecies.name.length !== 0 &&
                parrotSpecies.description.length !== 0 &&
                (parrotSpecies.name.length > 20 ||
                    parrotSpecies.name.length < 3 ||
                    parrotSpecies.description.length < 5 ||
                    parrotSpecies.description.length > 150 ||
                    parrotSpeciesColor.color.length > 10 ||
                    parrotSpeciesColor.color.length < 1)
            ) {
                if (
                    (parrotSpecies.name.length > 20 || parrotSpecies.name.length < 3) &&
                    (parrotSpecies.description.length > 150 || parrotSpecies.description.length) < 5 &&
                    parrotSpeciesColor.color.length > 10
                ) {
                    setValidate({
                        title: 'Name must be between 3 and 20 characters',
                        description: 'Content must be between 5 and 150 character',
                        color: 'Color must be between 1 and 20 character',
                    });
                } else if (
                    (parrotSpecies.name.length > 20 || parrotSpecies.name.length < 3) &&
                    (parrotSpecies.description.length > 150 || parrotSpecies.description.length) < 5
                ) {
                    setValidate({
                        title: 'Name must be between 3 and 20 characters',
                        description: 'Content must be between 5 and 150 character',
                        color: '',
                    });
                } else if (parrotSpecies.name.length > 20 || parrotSpecies.name.length < 3) {
                    setValidate({
                        title: 'Title must be between 3 and 20 characters',
                        description: '',
                        color: '',
                    });
                } else if (parrotSpecies.description.length > 150 || parrotSpecies.description.length < 5) {
                    setValidate({
                        title: '',
                        description: 'Content must be between 5 and 150 character',
                        color: '',
                    });
                } else if (parrotSpeciesColor.color.length > 10 || parrotSpeciesColor.color.length < 1) {
                    setValidate({
                        title: '',
                        description: '',
                        color: 'Color must be between 1 and 20 character',
                    });
                }
                console.log(parrotSpeciesColor.color.length);
                setSubmissionStatus(false);
                setTimeout(() => {
                    setSubmissionStatus('');
                }, 5000);
            } else {
                const responseSpecies = await axios.post('http://localhost:8086/api/admin/parrot-species/create', {
                    name: parrotSpecies.name,
                    description: parrotSpecies.description,
                    quantity: parrotSpecies.quantity,
                    nestQuantity: parrotSpecies.nestQuantity,
                    parrotAverageRating: parrotSpecies.parrotAverageRating,
                    nestAverageRating: parrotSpecies.nestAverageRating,
                    origin: parrotSpecies.origin,
                    status: parrotSpecies.status,
                    averageWeight: parrotSpecies.averageWeight,
                    img: img,
                    // Add other fields you want to send to the first API
                });
                if (responseSpecies.status === 200) {
                    console.log('POST request was successful at species!!');
                } else {
                    console.error('POST request failed with status code - species: ', responseSpecies.status);
                }
                const responseSpeciesColor = await axios.post('http://localhost:8086/api/admin/parrot-species-color', {
                    // Đoạn này để truyền các data fields về phía database
                    speciesID: responseSpecies.data.id,
                    status: parrotSpeciesColor.status,
                    price: parrotSpeciesColor.price,
                    color: parrotSpeciesColor.color,
                    imageUrl: img,
                });
                const addImg = await axios.post('http://localhost:8086/api/admin/color-image', {
                    imageUrl: img,
                    parrotSpeciesColorId: responseSpeciesColor.data.id,
                });
                console.log('pot detail' + postDetails);
                if (responseSpeciesColor.status === 200) {
                    console.log('POST request was successful at species color');
                } else {
                    console.error(
                        'POST request failed with status code - species color: ',
                        responseSpeciesColor.status,
                    );
                }
                setSpecies((prevSpecies) => [...prevSpecies, responseSpecies.data]);
                reloadAddSpeciesColor();

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
                // setSpecies([...species, responseSpecies.data]);

                setSubmissionStatus(true);
            }
            // Make a POST request to the first API endpoint

            // Make a POST request to the second API endpoint
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    // Function to reload the AddSpeciesColor component
    const reloadAddSpeciesColor = () => {
        // Increment the key to trigger a re-render
        setAddSpeciesColorKey((prevKey) => prevKey + 1);
    };

    return (
        <div className={cx('wrapper')}>
            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add species</Text>
            </Flex>

            {/* FORM TO ADD SPECIES  */}
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
                                    <br />
                                    <AlertTitle>
                                        <Text fontSize="sm" lineHeight="1.4">
                                            {validate.title}
                                            <br />
                                            {validate.description}
                                            <br />
                                            {validate.color}
                                        </Text>
                                    </AlertTitle>
                                </Alert>
                            ))}
                        <div className={cx('title-post')}>
                            <div className={cx('title')}>
                                <h1>Add species</h1>
                            </div>
                        </div>

                        <Table size="xs">
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
                                            min="0"
                                            max="4"
                                            step="0.01" // Allows decimal values
                                            id="averageWeight"
                                            name="averageWeight"
                                            value={parrotSpecies.averageWeight}
                                            onChange={(e) =>
                                                setParrotSpecies({
                                                    ...parrotSpecies,
                                                    averageWeight: parseFloat(e.target.value),
                                                })
                                            }
                                            variant="filled"
                                            placeholder="Average weight"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                {/* Parrot color */}
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
                                {/* Parrot price */}
                                <Tr>
                                    <Td>Price</Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            id="price"
                                            name="price"
                                            min="0"
                                            step="0.01" // Allows decimal values
                                            value={parrotSpeciesColor.price}
                                            onChange={(e) =>
                                                setParrotSpeciesColor({
                                                    ...parrotSpeciesColor,
                                                    price: parseFloat(e.target.value),
                                                })
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
                                            multiple
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
                                            onClick={reloadAddSpeciesColor}
                                        >
                                            ADD
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                ) : (
                    <></>
                )}
                {/*END FORM TO ADD SPECIES  */}
            </form>
            {/* CRUD SPECIES LIST */}

            <AddSpeciesColor key={addSpeciesColorKey} className={cx('addspeciescolor')}></AddSpeciesColor>
        </div>
    );
}

export default AddParrotSpecies;
