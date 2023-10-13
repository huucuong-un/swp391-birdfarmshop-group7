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
import React from 'react';

const cx = classNames.bind(styles);

function AddParrotNestService() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
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
                                        <select>
                                            <option value="vinh">Vinh</option>
                                            <option value="cuong">Cuong</option>
                                            <option value="nam">Nam</option>
                                            <option value="khoa">Khoa</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select>
                                            <option value="yellow">Vinh</option>
                                            <option value="black">Cuong</option>
                                            <option value="wheat">Nam</option>
                                            <option value="white">Khoa</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input type="number" />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing="2">
                            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
                                Save
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
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
                                        <select>
                                            <option value="vinh">Vinh</option>
                                            <option value="cuong">Cuong</option>
                                            <option value="nam">Nam</option>
                                            <option value="khoa">Khoa</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Color:</label>
                                        <select>
                                            <option value="yellow">Vinh</option>
                                            <option value="black">Cuong</option>
                                            <option value="wheat">Nam</option>
                                            <option value="white">Khoa</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Age:</label>
                                        <input type="number" min="1" />
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Health Status:</label>
                                        <select>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                    <div className={cx('add-form-item')}>
                                        <label>Pregnancy Status:</label>
                                        <select>
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing="2">
                            <Button variant="solid" colorScheme="blue">
                                Save
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
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
