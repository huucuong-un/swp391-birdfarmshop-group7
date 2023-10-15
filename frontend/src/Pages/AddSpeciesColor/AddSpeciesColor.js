import classNames from 'classnames/bind';
import styles from '~/Pages/AddSpeciesColor/AddSpeciesColor.module.scss';
import Buttons from '~/Components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
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
    Code,
    Center,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import UpdateSpecies from '~/Pages/UpdateSpecies/UpdateSpecies';
import UpdateSpeciesColor from '~/Pages/UpdateSpeciesColor/UpdateSpeciesColor';
import { color } from 'framer-motion';
const cx = classNames.bind(styles);
function AddSpeciesColor() {
    // Note 3:55 9/10/2023: đang làm phần update species color -> cần xử lí cái nút ẩn hiện form update species color -> cho từng species color

    // useState for alert status
    const [submissionStatus, setSubmissionStatus] = useState();
    const [statusForSpecieColor, setStatusForSpecieColor] = useState();
    const [colorExist, setColorExist] = useState();
    const [species, setSpecies] = useState([]);
    const [colorInputs, setColorInputs] = useState([]);
    const [isColorExist, setIsColorExist] = useState();
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
    return (
        <div className={cx('wrapper')}>
            <Accordion className={cx('accordion')} allowToggle>
                <div className={cx('crud-container')}>
                    <div className={cx('crud-title')}>
                        <span>Specie ID</span>
                        <span>Specie name</span>
                        <span>Quantity</span>
                        <span>Nest quantity</span>
                        <span>Origin</span>
                        <span>Average weight</span>
                    </div>

                    {combineData.map((data, dataIndex) => (
                        // Print the specie color
                        <AccordionItem key={dataIndex} className={cx('accord-item')}>
                            <h2>
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
                                    <Button key={data.id} onClick={() => toggleEditForm(data.id)}>
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
                                                            <img src="data:image/jpeg;base64,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" />
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
                                                                <div
                                                                    className={cx('update-color')}
                                                                    onClick={() => toggleEditColor(childObj.id)}
                                                                >
                                                                    Close
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={cx('update-color')}
                                                                    onClick={() => toggleEditColor(childObj.id)}
                                                                >
                                                                    Edit
                                                                </div>
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
                                    <Buttons onClick={handleShow} add>
                                        Add new color
                                        <span className={cx('span-icon', { 'rotate-icon': show })}>
                                            {show ? (
                                                <FontAwesomeIcon icon={faMinus} />
                                            ) : (
                                                <FontAwesomeIcon icon={faPlus} />
                                            )}
                                        </span>
                                    </Buttons>
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
