import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
    Divider,
    ButtonGroup,
    Button,
    Stack,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import classNames from 'classnames/bind';
import styles from '~/Pages/AddParrotNestService/AddParrotNestService.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import ParrotAPI from '~/Api/ParrotAPI';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';
import ChooseProduct from '~/Components/ChooseProduct/ChooseProduct';
import ParrotCoupleAPI from '~/Api/ParrotCoupleAPI';

const cx = classNames.bind(styles);

function AddParrotNestService() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [choosenFirstParrotSpecies, setChoosenFirstParrotSpecies] = useState();
    const [choosenSecondParrotSpecies, setChoosenSecondParrotSpecies] = useState();
    const [firstParrotColor, setFirstParrotColor] = useState([]);
    const [secondParrotColor, setSecondParrotColor] = useState([]);
    const [firstParrot, setFirstParrot] = useState({
        age: null,
        status: true,
        saleStatus: false,
        pregnancyStatus: true,
        healthStatus: true,
        numberOfChildren: 2,
        gender: true,
        colorID: null,
    });
    const [secondParrot, setSecondParrot] = useState({
        age: null,
        status: true,
        saleStatus: false,
        pregnancyStatus: true,
        healthStatus: true,
        numberOfChildren: 2,
        gender: true,
        colorID: null,
    });

    useEffect(() => {
        const getParrotSpecies = async () => {
            try {
                const parrotSpecies = await ParrotSpeciesAPI.getAll();
                console.log(parrotSpecies.listResult);
                setParrotSpecies(parrotSpecies.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        getParrotSpecies();
    }, []);

    useEffect(() => {
        const getFirstParrotColor = async () => {
            try {
                const parrotColor = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(choosenFirstParrotSpecies);
                setFirstParrotColor(parrotColor);
            } catch (error) {
                console.error(error);
            }
        };

        getFirstParrotColor();
    }, [choosenFirstParrotSpecies]);

    useEffect(() => {
        const getSecondParrotColor = async () => {
            try {
                const parrotColor = await ParrotSpeciesColorAPI.findOneSpeciesByParrotID(choosenSecondParrotSpecies);
                setSecondParrotColor(parrotColor);
            } catch (error) {
                console.error(error);
            }
        };

        getSecondParrotColor();
    }, [choosenSecondParrotSpecies]);

    useEffect(() => {
        console.log(firstParrot);
    }, [firstParrot]);

    useEffect(() => {
        console.log(secondParrot);
    }, [secondParrot]);

    const handleBreed = async () => {
        const addFirstParrot = await ParrotAPI.add(firstParrot);
        const addSecondParrot = await ParrotAPI.add(secondParrot);
        const addParrotCouple = await ParrotCoupleAPI.add({
            parrotMaleId: addFirstParrot.gender === true ? addFirstParrot.id : addSecondParrot.id,
            parrotFemaleId: addSecondParrot.gender === false ? addSecondParrot.id : addFirstParrot.id,
            status: true,
        });
    };

    const handleGenderSelect = (e) => {
        setFirstParrot({
            ...firstParrot,
            gender: e === 'true' ? (e = true) : (e = false),
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Card maxW="md">
                    <CardBody>
                        <Image
                            src="https://img.freepik.com/premium-photo/two-love-parrots-rainbow-colors-illustartion_739548-1591.jpg"
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                            <Heading size="lg" margin={0} minHeight={26}>
                                First Parrot
                            </Heading>
                            <Text>
                                <div className={cx('add-form')}>
                                    <div className={cx('add-form-item')}>
                                        <label>Species:</label>
                                        <select onChange={(e) => setChoosenFirstParrotSpecies(e.target.value)}>
                                            <option value="" disabled selected>
                                                Species
                                            </option>
                                            {parrotSpecies &&
                                                parrotSpecies.map((species, speciesIndex) => (
                                                    <option key={speciesIndex} value={species.id}>
                                                        {species.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select
                                            onChange={(e) =>
                                                setFirstParrot({ ...firstParrot, colorID: parseInt(e.target.value) })
                                            }
                                        >
                                            <option value="" disabled selected>
                                                Colors
                                            </option>
                                            {firstParrotColor &&
                                                firstParrotColor.map((firstParrotColor, firstParrotColorIndex) => (
                                                    <option key={firstParrotColorIndex} value={firstParrotColor.id}>
                                                        {firstParrotColor.color}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setFirstParrot({ ...firstParrot, age: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setFirstParrot({
                                                    ...firstParrot,
                                                    healthStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Good</option>
                                            <option value="false">Not Good</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setFirstParrot({
                                                    ...firstParrot,
                                                    pregnancyStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Gender:</label>
                                        <select onChange={(e) => handleGenderSelect(e.target.value)}>
                                            {/* {secondParrot.gender === true ? (
                                                <option value="false" selected>
                                                    Female
                                                </option>
                                            ) : (
                                                <option value="true" selected>
                                                    Male
                                                </option>
                                            )} */}
                                            <option value="true">Male</option>
                                            <option value="false">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>
                <div className={cx('breed-zone')}>
                    <Text>Breed</Text>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')} onClick={handleBreed} />
                </div>
                <Card maxW="md">
                    <CardBody>
                        <Image
                            src="https://img.freepik.com/premium-photo/two-love-parrots-rainbow-colors-illustartion_739548-1591.jpg"
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                            <Heading size="lg" margin={0} minHeight={26}>
                                Second Parrot
                            </Heading>
                            <Text>
                                <div className={cx('add-form')}>
                                    <div className={cx('add-form-item')}>
                                        <label>Species:</label>
                                        <select onChange={(e) => setChoosenSecondParrotSpecies(e.target.value)}>
                                            <option value="" disabled selected>
                                                Species
                                            </option>
                                            {parrotSpecies &&
                                                parrotSpecies.map((species, speciesIndex) => (
                                                    <option key={speciesIndex} value={species.id}>
                                                        {species.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({ ...secondParrot, colorID: parseInt(e.target.value) })
                                            }
                                        >
                                            <option value="" disabled selected>
                                                Colors
                                            </option>
                                            {secondParrotColor &&
                                                secondParrotColor.map((secondParrotColor, secondParrotColorIndex) => (
                                                    <option key={secondParrotColorIndex} value={secondParrotColor.id}>
                                                        {secondParrotColor.color}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input
                                            type="number"
                                            onChange={(e) =>
                                                setSecondParrot({ ...secondParrot, age: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({
                                                    ...secondParrot,
                                                    healthStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Good</option>
                                            <option value="false">Not Good</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({
                                                    ...secondParrot,
                                                    pregnancyStatus:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Gender:</label>
                                        <select
                                            onChange={(e) =>
                                                setSecondParrot({
                                                    ...secondParrot,
                                                    gender:
                                                        e.target.value === 'true'
                                                            ? (e.target.value = true)
                                                            : (e.target.value = false),
                                                })
                                            }
                                        >
                                            <option value="true">Male</option>
                                            <option value="false">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>

                <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Save Changes?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>Are you sure you want to save this parrot ?</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme="red" ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

export default AddParrotNestService;
