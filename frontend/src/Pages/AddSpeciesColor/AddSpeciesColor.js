import classNames from 'classnames/bind';
import styles from '~/Pages/AddSpeciesColor/AddSpeciesColor.module.scss';
import Buttons from '~/Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Input,
    Table,
    Tbody,
    Tr,
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
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import UpdateSpecies from '~/Pages/UpdateSpecies/UpdateSpecies';

const cx = classNames.bind(styles);
function AddSpeciesColor() {
    // Note 3:55 9/10/2023: đang làm phần update species color -> cần xử lí cái nút ẩn hiện form update species color -> cho từng species color

    // useState for alert status
    const [submissionStatus, setSubmissionStatus] = useState();
    const [statusForSpecieColor, setStatusForSpecieColor] = useState();
    const [colorExist, setColorExist] = useState();
    const [species, setSpecies] = useState([]);
    const [colorInputs, setColorInputs] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    // State for api parrot species color
    const [parrotSpeciesColor, setParrotSpeciesColor] = useState({
        status: true,
        imageUrl: null,
        color: '',
        price: '',
        speciesID: 0,
    });
    // USEEFFECT ================================
    // Handle update data immediately
    // Handle update data immediately
    const [reloadData, setReloadData] = useState(false);
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };
    // Handle update data immediately
    useEffect(() => {
        const fetchParrotSpecies = async () => {
            try {
                const parrotSpecies = await ParrotSpeciesAPI.getAll();
                setSpecies(parrotSpecies.listResult);
                console.log(parrotSpecies.listResult);
            } catch (error) {
                console.error(error);
            }
        };
        if (reloadData) {
            fetchParrotSpecies();
            setReloadData(false);
        }
        fetchParrotSpecies();
    }, [reloadData, parrotSpeciesColor]);

    //USEEFFECT to setCombindedata
    // Combine data
    const [combineData, setCombineData] = useState([]);
    const [shouldFetchData, setShouldFetchData] = useState(true);
    useEffect(
        () => {
            const fetchData = async () => {
                const data = [];
                try {
                    for (const specie of species) {
                        const parrot = { ...specie };
                        parrot.colors = await ParrotSpeciesAPI.getListBySpeciesId(parrot.id);
                        data.push(parrot);
                    }
                } catch (error) {
                    console.error(error);
                }
                setCombineData(data);
            };
            // Condition to check if shoudFetchData useState change in handleUpdateSpeciesColor
            // fetchdata again and setShoudFetchData to false to stop fetching to waiting for next fetch
            if (shouldFetchData) {
                fetchData();
                setShouldFetchData(false); // Set to false after fetching data
            }

            fetchData();
        },
        [shouldFetchData, species] /*check species if species change then load the list*/,
    );
    console.log(parrotSpeciesColor);
    //======================== USEEFFECT ================================
    // Handle posting image
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
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
    }; //End Handle posting image
    // Function to handle refresh when updating

    // This function to handle the data to submit through the post method
    const HandleSubmitSpeciesColor = async (e, index) => {
        e.preventDefault();
        if (colorExist) {
            console.log('Color already exists, cannot submit the form');
            return;
        }

        const speciesID = species[index].id;
        const { color, price } = colorInputs[index];

        try {
            // Make a POST request to submit the color data for the specific species
            const response = await axios.post('http://localhost:8086/api/parrot-species-color', {
                status: parrotSpeciesColor.status,
                imageUrl: img,
                color: color, // Use the color from the corresponding input
                speciesID: speciesID, // Use the species ID from the data
                price: price,
            });
            if (response.status === 200) {
                console.log(`POST request was successful for species ID ${speciesID}!!`);
                // Assuming the response contains the newly created post data
                // You can update your data or reset the color input here

                setColorExist(null);
                setSubmissionStatus(true);
                // Automatically reset colorExist to null after 2 seconds
                const newData = response.data;
                setParrotSpeciesColor({ ...parrotSpeciesColor, newData });

                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 5000);
                setColorInputs([...colorInputs]);
                setSpecies([...species]);
            } else {
                console.error(
                    `POST request failed (const HandleSubmitSpeciesColor) with status code - species: ${response.status}`,
                );
                setSubmissionStatus(false);
            }
            setColorInputs([]);
        } catch (error) {
            console.error(`Error at species ID ${speciesID}: ${error}`);
        }
    }; // End this function to handle the data to submit through the post method

    //Function to check is color existed
    function isColorExisted(id, input) {
        for (const parent of combineData) {
            if (id === parent.id) {
                console.log('Color existed');
                for (const child of parent.colors) {
                    if (input.toString() === child.color.toString()) {
                        console.log('color existed | parent name: ' + parent.name + ' | with color: ' + child.color);
                        return true;
                    }
                }
            } else {
                console.log('name: ' + parent.name + ' id ' + parent.id + ' not existed color');
            }
        }
        return false;
    } //End Function to check is color existed

    // Initialize state to keep track of which species' form is currently open for editing
    // Function to toggle the form's visibility for a species
    const [openSpeciesID, setOpenSpeciesID] = useState(null);
    const toggleEditForm = (speciesID) => {
        if (openSpeciesID === speciesID) {
            // If the form is already open for this species, close it
            setOpenSpeciesID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenSpeciesID(speciesID);
        }
    }; //End Function to toggle the form's visibility for a species
    // =================================================
    // Function to handleUpdateSpecie Color
    //Note:
    //     AT these line of Code
    //     <div
    //     className={cx('update-color')}
    //     onClick={() => toggleEditColor(childObj.id)}
    // >
    //     Close
    // </div>
    //function flow: took parrot species id through toggleEditColor(childObj.id)}
    // in toggleEditColor fetch api to find speciesColor by id and set to      const [openSpeciesColorID, setOpenSpeciesColorID] = useState(null);
    //then bind 'em data to useEffect * => bring that useState to bind data at input
    const [openSpeciesColorID, setOpenSpeciesColorID] = useState(null);
    const [colorsById, setColorById] = useState();
    //*
    useEffect(() => {
        if (colorsById && colorsById.length > 0) {
            setParrotSpeciesColor({
                id: colorsById[0].id,
                createdDate: colorsById[0].createdDate,
                status: colorsById[0].status,
                imageUrl: colorsById[0].imageUrl,
                color: colorsById[0].color,
                price: colorsById[0].price,
                speciesID: colorsById[0].speciesID,
            });
        }
    }, [colorsById]);
    //Function to handle each UpdateSpecieColor turn on or turn off
    const toggleEditColor = async (specieColorID) => {
        try {
            const colorByIdList = await ParrotSpeciesColorAPI.findByParrotSpecieId(specieColorID);
            setColorById(colorByIdList);
        } catch (error) {
            console.log('Error at UpdateSpecies.js fetchSpeciesByID | Error:  ' + error);
        }

        if (openSpeciesColorID === specieColorID) {
            setOpenSpeciesColorID(null);
        } else {
            setOpenSpeciesColorID(specieColorID);
        }
    };

    console.log('colors by ID');
    console.log(colorsById);

    useEffect(() => {
        console.log(colorsById);
    }, [colorsById]);
    const handleUpdateSpeciesColor = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id: parrotSpeciesColor.id,
                createdDate: parrotSpeciesColor.createdDate,
                color: parrotSpeciesColor.color,
                speciesID: parrotSpeciesColor.speciesID,
                status: parrotSpeciesColor.status,
                imageUrl: img,
                price: parrotSpeciesColor.price,
            };
            const responseSpeciesColor = await ParrotSpeciesColorAPI.update(data);
            if (responseSpeciesColor.status === true) {
                console.log('PUT request was successful at UpdateSpecies.js!!');

                // Assuming responseSpeciesColor contains the updated data,
                // find the index of the item in combineData that matches the updated item
            } else {
                console.error(
                    'PUT request failed at UpdateSpecies.js with status code:',
                    responseSpeciesColor.statusText,
                );
                console.error('Response data:', responseSpeciesColor);
            }
            // Set should fetch data to true to allow fetch data for update
            setShouldFetchData(true);
            // Set submission status to true to allow pop up notification after successfully update
            setStatusForSpecieColor(true);
            setTimeout(() => {
                setStatusForSpecieColor();
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setStatusForSpecieColor(false);
        }
    };
    //====================================================

    console.log(parrotSpeciesColor.id);
    console.log('Combine data');
    console.log(combineData);
    return (
        <div className={cx('wrapper')}>
            <Accordion className={cx('accordion')} allowToggle>
                <div className={cx('crud-container')}>
                    <div className={cx('crud-title')}>
                        <span className={cx('margin-left')}>Specie ID</span>
                        <span className={cx('margin-left')}>Specie name</span>
                        <span className={cx('margin-left')}>Quantity</span>
                        <span className={cx('margin-left-lilbit')}>Nest quantity</span>
                        <span className={cx('margin-left-lilbit')}>Origin</span>
                        <span className={cx('margin-left-lilbit')}>Average weight</span>
                        <span className={cx('margin-left-lilbit')}>Action</span>
                    </div>

                    {combineData.map((data, dataIndex) => (
                        // Print the specie color
                        <AccordionItem key={dataIndex} className={cx('accord-item')}>
                            <h2 className={cx('data-container')}>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        <div className={cx('crud-data')}>
                                            <div className={cx('data-field')}>{data.id}</div>
                                            <div className={cx('data-field')}>{data.name}</div>
                                            <div className={cx('data-field')}>{data.quantity}</div>
                                            <div className={cx('data-field')}>{data.nestQuantity}</div>
                                            <div className={cx('data-field')}>{data.origin}</div>
                                            <div className={cx('data-field')}>{data.averageWeight}</div>
                                        </div>
                                    </Box>

                                    <AccordionIcon />
                                </AccordionButton>
                                <div>
                                    <Button
                                        key={data.id}
                                        onClick={() => toggleEditForm(data.id)}
                                        colorScheme={'green'}
                                        size={'lg'}
                                    >
                                        {openSpeciesID === data.id ? 'Close Edit' : 'Edit'}
                                    </Button>
                                </div>
                            </h2>
                            {/* Print the specie color*/}
                            {/* Conditionally render the UpdateSpecies component based on the openSpeciesID state */}
                            {openSpeciesID === data.id && (
                                <UpdateSpecies specieID={data.id} onUpdateSuccess={handleUpdateSuccess} />
                            )}
                            {/* ========================== */}
                            <AccordionPanel>
                                {data.colors.map((childObj, childIndex) => (
                                    <div key={childIndex} className={cx('item-container')}>
                                        <TableContainer className={cx('data-parent')}>
                                            <Table size="sm" className={cx('data-child')}>
                                                <Tbody>
                                                    <Tr className={cx('color-row')}>
                                                        <Td className={cx('td-image')}>
                                                            <img src={childObj.imageUrl} />
                                                        </Td>
                                                        <Td className={cx('item-container-td')}>
                                                            <div>
                                                                <button
                                                                    className={cx('color-wheel')}
                                                                    style={{ backgroundColor: childObj.color }}
                                                                ></button>
                                                            </div>
                                                        </Td>
                                                        <Td className={cx('item-container-td')}>{childObj.color}</Td>
                                                        <Td className={cx('item-container-td')}>
                                                            Price: {childObj.price}
                                                        </Td>
                                                        <Td className={cx('item-container-td')}>
                                                            Status: {childObj.status ? <>True</> : <>False</>}
                                                        </Td>
                                                        {/* ================================================================================================================================ */}
                                                        {/* Button Update species color */}
                                                        <Td className={cx('item-container-td')}>
                                                            {openSpeciesColorID === childObj.id ? (
                                                                <Button
                                                                    className={cx('update-color')}
                                                                    onClick={() => toggleEditColor(childObj.id)}
                                                                    colorScheme={'green'}
                                                                    size={'lg'}
                                                                >
                                                                    Close
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    className={cx('update-color')}
                                                                    onClick={() => toggleEditColor(childObj.id)}
                                                                    colorScheme={'green'}
                                                                    size={'lg'}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            )}
                                                        </Td>
                                                        {/* ================================================================== */}
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>

                                        {/*====== UPDATE SPECIES COLOR =====*/}

                                        {openSpeciesColorID === childObj.id && (
                                            <form
                                                onSubmit={handleUpdateSpeciesColor}
                                                className={cx('form-specie-color')}
                                            >
                                                <TableContainer className={cx('table-container')}>
                                                    {(statusForSpecieColor === true && (
                                                        <Alert status="success">
                                                            <AlertIcon />
                                                            <AlertTitle className={cx('overflow-hidden')}>
                                                                Success!
                                                            </AlertTitle>
                                                            <AlertDescription className={cx('overflow-hidden')}>
                                                                Update specie form submitted successfully.
                                                            </AlertDescription>
                                                        </Alert>
                                                    )) ||
                                                        (statusForSpecieColor === false && (
                                                            <Alert status="error">
                                                                <AlertIcon />
                                                                <AlertTitle className={cx('overflow-hidden')}>
                                                                    Failed to update parrot species -{' '}
                                                                </AlertTitle>
                                                                <AlertDescription className={cx('overflow-hidden')}>
                                                                    Please check your input!!!
                                                                </AlertDescription>
                                                            </Alert>
                                                        ))}
                                                    {(colorExist === true && (
                                                        <Alert status="error">
                                                            <AlertIcon />
                                                            <AlertTitle>
                                                                Color specie existed - Please input another specie color
                                                            </AlertTitle>
                                                            <AlertDescription></AlertDescription>
                                                        </Alert>
                                                    )) ||
                                                        (colorExist === false && (
                                                            <Alert status="success">
                                                                <AlertIcon />
                                                                <AlertTitle>
                                                                    {' '}
                                                                    This specie color can be added!!!
                                                                </AlertTitle>
                                                                <AlertDescription></AlertDescription>
                                                            </Alert>
                                                        ))}

                                                    <div className={cx('title-post')}>
                                                        <div className={cx('title')}>
                                                            <h1>Update species color</h1>
                                                        </div>
                                                    </div>

                                                    <Table className={cx('table-specie-color')} size="md">
                                                        <Tbody>
                                                            <Tr>
                                                                <Td>Color </Td>
                                                                <Td>
                                                                    <Input
                                                                        type="text"
                                                                        id="color"
                                                                        name="color"
                                                                        placeholder="Enter color"
                                                                        value={parrotSpeciesColor.color} // Use the color input corresponding to the species
                                                                        onChange={(e) => {
                                                                            const colorStatus = isColorExisted(
                                                                                data.id,
                                                                                e.target.value,
                                                                            );
                                                                            setColorExist(colorStatus);
                                                                            setParrotSpeciesColor({
                                                                                ...parrotSpeciesColor,
                                                                                color: e.target.value,
                                                                            });
                                                                        }}
                                                                        variant="filled"
                                                                        required
                                                                    />
                                                                </Td>
                                                            </Tr>
                                                            {/* Parrot color */}
                                                            <Tr>
                                                                <Td>Price</Td>
                                                                <Td>
                                                                    <Input
                                                                        type="text"
                                                                        id="price"
                                                                        name="price"
                                                                        placeholder="Enter price"
                                                                        value={parrotSpeciesColor.price}
                                                                        onChange={(e) => {
                                                                            setParrotSpeciesColor({
                                                                                ...parrotSpeciesColor,
                                                                                price: e.target.value,
                                                                            });
                                                                        }}
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
                                                                        id="img"
                                                                        name="img"
                                                                        accept="image/*"
                                                                        onChange={(e) => postDetails(e.target.files[0])} // Pass the index of the species
                                                                        required
                                                                    />
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
                                                                        isLoading={loading}
                                                                    >
                                                                        ADD
                                                                    </Button>
                                                                </Td>
                                                            </Tr>
                                                        </Tbody>
                                                    </Table>
                                                </TableContainer>
                                            </form>
                                        )}

                                        <input
                                            type="hidden"
                                            id="id"
                                            name="id"
                                            placeholder="Enter species ID"
                                            // value={data.id}
                                            readOnly // Make it read-only to display the species ID
                                            variant="filled"
                                            required
                                        />
                                        {/* UPDATE SPECIES COLOR */}
                                    </div>
                                ))}

                                <div className={cx('add-btn')}>
                                    <Button onClick={handleShow} colorScheme={'green'} size={'lg'}>
                                        Add new color
                                        <span className={cx('span-icon', { 'rotate-icon': show })}>
                                            {show ? (
                                                <FontAwesomeIcon icon={faMinus} />
                                            ) : (
                                                <FontAwesomeIcon icon={faPlus} />
                                            )}
                                        </span>
                                    </Button>
                                </div>
                                {show ? (
                                    <form
                                        className={cx('form-specie-color')}
                                        onSubmit={(e) => HandleSubmitSpeciesColor(e, dataIndex)}
                                    >
                                        <TableContainer className={cx('table-container')}>
                                            {(colorExist === true && (
                                                <Alert status="error">
                                                    <AlertIcon />
                                                    <AlertTitle>
                                                        Color specie existed - Please input another specie color
                                                    </AlertTitle>
                                                    <AlertDescription></AlertDescription>
                                                </Alert>
                                            )) ||
                                                (colorExist === false && (
                                                    <Alert status="success">
                                                        <AlertIcon />
                                                        <AlertTitle> This specie color can be added!!!</AlertTitle>
                                                        <AlertDescription></AlertDescription>
                                                    </Alert>
                                                ))}

                                            {(submissionStatus === true && (
                                                <Alert status="success">
                                                    <AlertIcon />
                                                    <AlertTitle>Success!</AlertTitle>
                                                    <AlertDescription>
                                                        Your form has been submitted successfully.
                                                    </AlertDescription>
                                                </Alert>
                                            )) ||
                                                (submissionStatus === false && (
                                                    <Alert status="error">
                                                        <AlertIcon />
                                                        <AlertTitle>Failed to add parrot species - </AlertTitle>
                                                        <AlertDescription>Please check your input!!!</AlertDescription>
                                                    </Alert>
                                                ))}

                                            {/* Title */}
                                            <div className={cx('title-post')}>
                                                <div className={cx('title')}>
                                                    <h1>Add species color</h1>
                                                </div>
                                            </div>
                                            {/* Table for Update species */}
                                            <Table className={cx('table-specie-color')} size="md">
                                                <Tbody>
                                                    <Tr>
                                                        <Td>Color {data.id}</Td>
                                                        <Td className={cx('specie-color-input')}>
                                                            <Input
                                                                type="text"
                                                                id="color"
                                                                name="color"
                                                                placeholder="Enter color"
                                                                value={
                                                                    colorInputs[dataIndex]
                                                                        ? colorInputs[dataIndex].color
                                                                        : ''
                                                                } // Use the color input corresponding to the species
                                                                onChange={(e) => {
                                                                    const colorStatus = isColorExisted(
                                                                        data.id,
                                                                        e.target.value,
                                                                    );
                                                                    setColorExist(colorStatus);

                                                                    const updatedInputs = [...colorInputs];
                                                                    if (!updatedInputs[dataIndex]) {
                                                                        updatedInputs[dataIndex] = {};
                                                                    }
                                                                    updatedInputs[dataIndex].color = e.target.value;
                                                                    setColorInputs(updatedInputs);
                                                                }}
                                                                variant="filled"
                                                                required
                                                            />
                                                        </Td>
                                                    </Tr>

                                                    {/* Parrot color */}
                                                    <Tr>
                                                        <Td>Price</Td>
                                                        <Td className={cx('specie-color-input')}>
                                                            <Input
                                                                type="text"
                                                                id="price"
                                                                name="price"
                                                                placeholder="Enter price"
                                                                value={
                                                                    colorInputs[dataIndex]
                                                                        ? colorInputs[dataIndex].price
                                                                        : ''
                                                                } // Use the price input corresponding to the species
                                                                onChange={(e) => {
                                                                    const updatedInputs = [...colorInputs];
                                                                    if (!updatedInputs[dataIndex]) {
                                                                        updatedInputs[dataIndex] = {};
                                                                    }
                                                                    updatedInputs[dataIndex].price = e.target.value;
                                                                    setColorInputs(updatedInputs);
                                                                }}
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
                                                                id="img"
                                                                name="img"
                                                                accept="image/*"
                                                                onChange={(e) => postDetails(e.target.files[0])} // Pass the index of the species
                                                                required
                                                            />
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
                                                                isLoading={loading}
                                                            >
                                                                ADD
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                            {/* Table for Update species */}
                                            {/* Table for Update species */}
                                        </TableContainer>
                                        <input
                                            type="hidden"
                                            id="id"
                                            name="id"
                                            placeholder="Enter species ID"
                                            value={data.id}
                                            readOnly // Make it read-only to display the species ID
                                            variant="filled"
                                            required
                                        />
                                    </form>
                                ) : (
                                    <></>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </div>
            </Accordion>
        </div>
    );
}

export default AddSpeciesColor;
