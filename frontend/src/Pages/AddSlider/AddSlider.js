import classNames from 'classnames/bind';
import styles from '~/Pages/AddSlider/AddSlider.module.scss';
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
    Switch,
    Text,
    Container,
    Box,
    Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Title from '~/Components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faArrowsRotate,
    faAngleLeft,
    faAngleRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import UpdateSlider from '~/Components/UpdateSlider/UpdateSlider';
import axios from 'axios';
import SliderAPI from '~/Api/SliderAPI';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AddSlider() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState({
        page: 1,
        limit: 10,
        name: null,
        status: null,
        date: null,
        sortDate: null,
    });
    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);
    // Toast
    const toast = useToast();
    const handleShow = () => {
        setShow(!show);
    };
    const [slider, setSlider] = useState({
        sliderName: '',
        sliderDescription: '',
        sliderImageURL: img,
        status: true,
    });
    const [sliderList, setSliderList] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const navigate = useNavigate();
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };
    useEffect(() => {
        const getUserByToken = async () => {
            try {
                console.log(token);
                const userByToken = await UserAPI.getUserByToken(token);
                if (
                    userByToken === null ||
                    userByToken === '' ||
                    userByToken === undefined ||
                    userByToken.length === 0
                ) {
                    navigate('/error');
                } else {
                    const userRole = await RoleAPI.getRoleName(userByToken.roleId);

                    if (userRole !== 'admin' && userRole !== 'marketer') {
                        navigate('/error');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserByToken();
    }, [token]);
    useEffect(() => {
        const fetchData = async () => {
            const sliderList = await SliderAPI.searchSortForSlider(sort);
            setSliderList(sliderList.listResult);
            setTotalPage(sliderList.totalPage);
        };
        if (reloadData) {
            fetchData();
            setReloadData(false);
        } else {
            fetchData();
        }
    }, [sort, reloadData, slider]);
    const [validate, setValidate] = useState({
        sliderName: '',
        sliderDescription: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                slider.sliderName.length !== 0 &&
                slider.sliderDescription.length !== 0 &&
                (slider.sliderName.length > 50 ||
                    slider.sliderName.length < 3 ||
                    slider.sliderDescription.length > 150 ||
                    slider.sliderDescription.length < 20)
            ) {
                if (
                    (slider.sliderName.length > 50 || slider.sliderName.length < 3) &&
                    (slider.sliderDescription.length > 150 || slider.sliderDescription.length < 20)
                ) {
                    setValidate({
                        sliderName: 'SliderName must be between 3 and 50 characters',
                        sliderDescription: 'SliderDescription must be between 20 and 150 characters',
                    });
                } else if (slider.sliderName.length > 50 || slider.sliderName.length < 3) {
                    setValidate({
                        sliderName: 'SliderName must be between 3 and 50 characters',
                        sliderDescription: '',
                    });
                } else if (slider.sliderDescription.length > 150 || slider.sliderDescription.length < 20) {
                    setValidate({
                        sliderName: '',
                        sliderDescription: 'SliderDescription must be between 20 and 150 characters',
                    });
                }

                setSubmissionStatus(false);
                setTimeout(() => {
                    setSubmissionStatus('');
                }, 5000);
            } else {
                const data = {
                    sliderName: slider.sliderName,
                    sliderDescription: slider.sliderDescription,
                    sliderImageURL: img,
                    status: slider.status,
                };
                const responsePost = await SliderAPI.addSlider(data);

                console.log('POST request was successful at species!!');
                // Assuming the response contains the newly created post data
                setSlider({ ...slider, ...responsePost.data });
                setSubmissionStatus(true);
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
            setSubmissionStatus(false);
        }
    };
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
    const handleStatus = async (index) => {
        var sliderResponse = window.confirm('Are you sure to change status ?');
        if (sliderResponse) {
            try {
                const updatedSlider = [...sliderList];
                updatedSlider[index].status = !updatedSlider[index].status;
                //  await axios.delete(`http://localhost:8086/api/marketer/slider/${updatedSlider[index].id}`);
                const changestatus = await SliderAPI.changeSliderStatus(updatedSlider[index].id);
                console.log('slider list in change status');
                console.log(updatedSlider);
                setSliderList(updatedSlider);
            } catch (error) {
                toast({
                    title: 'Error occur!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                console.log(error);
            }
        } else {
        }
    };
    const [openSliderID, setOpenSliderID] = useState(null);
    const toggleEditForm = (sliderID) => {
        if (openSliderID === sliderID) {
            // If the form is already open for this species, close it
            setOpenSliderID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenSliderID(sliderID);
        }
    };

    // SORTING SPACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    // SORTING SPACEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 10,
            name: sort.name,
            status: sort.status,
            date: sort.date,
            sortDate: sort.sortDate,
        });

        setPage(newPage);
    };
    const handleClear = () => {
        setSort({
            page: 1,
            limit: 10,
            name: null,
            status: null,
            date: null,
            sortDate: null,
        });
    };

    console.log(sliderList);
    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    SLIDER MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add slider</Text>
            </Flex>
            {show ? (
                <form className={cx('inner')} onSubmit={handleSubmit}>
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
                                    <AlertTitle>
                                        <Text fontSize="sm" lineHeight="1.4">
                                            {validate.sliderName}
                                            <br />
                                            {validate.sliderDescription}
                                        </Text>
                                    </AlertTitle>
                                    <AlertTitle>Failed to add parrot species - </AlertTitle>
                                    <AlertDescription>Please check your input!!!</AlertDescription>
                                </Alert>
                            ))}
                        <div className={cx('title-post')}>
                            <div className={cx('title')}>
                                <h1>Add slider</h1>
                            </div>
                        </div>
                        <Table size="xs">
                            <Tbody>
                                <Tr>
                                    <Td>Slider name: </Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="sliderName"
                                            name="sliderName"
                                            value={slider.sliderName}
                                            onChange={(e) => setSlider({ ...slider, sliderName: e.target.value })}
                                            variant="filled"
                                            placeholder="Slider name"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Slider description: </Td>
                                    <Td>
                                        <Input
                                            type="text"
                                            id="sliderDescription"
                                            name="sliderDescription"
                                            value={slider.sliderDescription}
                                            onChange={(e) =>
                                                setSlider({ ...slider, sliderDescription: e.target.value })
                                            }
                                            variant="filled"
                                            placeholder="Description"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Slider image</Td>
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
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <FontAwesomeIcon icon={faArrowsRotate} className={cx('refresh-icon')} onClick={handleClear} />
                <input
                    type="text"
                    placeholder="Slider name"
                    onChange={(e) => setSort({ ...sort, name: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Slider name"
                    onChange={(e) => setSort({ ...sort, date: e.target.value })}
                />
                <select name="status" id="status" onChange={(e) => setSort({ ...sort, status: e.target.value })}>
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>

                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="" disabled selected>
                        Sort Date
                    </option>
                    <option value="DDESC">Newest</option>
                    <option value="DASC">Oldest</option>
                </select>
            </div>
            <TableContainer className={cx('table-container')}>
                <Table size="xs ">
                    <Thead>
                        <Tr>
                            <Th className={cx('text-center')}>Slider ID</Th>
                            <Th className={cx('text-center')}>Slider name</Th>
                            <Th className={cx('text-center')}>Description</Th>
                            <Th className={cx('text-center')}>Slider image</Th>
                            <Th className={cx('text-center')}>Status</Th>
                            <Th className={cx('text-center')}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sliderList.map((slider, index) => (
                            <>
                                <Tr key={slider.id}>
                                    <Td>{slider.id}</Td>
                                    <Td>{slider.sliderName}</Td>
                                    <Td>{slider.sliderDescription}</Td>
                                    <Td className={cx('image-container')}>
                                        <img src={slider.sliderImageURL} />
                                    </Td>
                                    <Td>
                                        <Switch
                                            onChange={() => handleStatus(index)}
                                            size="lg"
                                            isChecked={slider.status}
                                            colorScheme="green"
                                        />
                                        {slider.status ? (
                                            <Text color="green" fontSize={12} overflow="hidden">
                                                On Processing
                                            </Text>
                                        ) : (
                                            <Text color="red" fontSize={12} overflow="hidden">
                                                Disabled
                                            </Text>
                                        )}

                                        <Input
                                            type="hidden"
                                            id="status"
                                            name="status"
                                            variant="filled"
                                            value={slider.status}
                                            onChange={(e) => setSlider({ ...slider, status: e.target.value })}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            key={slider.id}
                                            size="lg"
                                            colorScheme="green"
                                            onClick={() => toggleEditForm(slider.id)}
                                        >
                                            {openSliderID === slider.id ? 'Close edit' : 'Edit'}
                                        </Button>
                                    </Td>
                                </Tr>
                                <Tr key={index + 'slider'}>
                                    {openSliderID === slider.id && (
                                        <Td colSpan={8}>
                                            <UpdateSlider slider={slider} reloadData={handleUpdateSuccess} />
                                        </Td>
                                    )}
                                </Tr>
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <div className={cx('button-pagination')}>
                <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                    <p
                        key={index}
                        className={cx('number-page')}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            border: page === index + 1 ? '1px solid black' : 'none', // Change background color when on the current page
                            borderRadius: page === index + 1 ? '4px ' : 'none', // Change background color when on the current page
                            opacity: page === index + 1 ? '0.5' : '1', // Change background color when on the current page
                            backgroundColor: page === index + 1 ? '#f9ede9' : 'transparent', // Change background color when on the current page
                            color: page === index + 1 ? 'black' : '#000000', // Change text color when on the current page
                            padding: page === index + 1 ? '5px 7px' : '0px',
                            fontWeight: '600',
                        }}
                    >
                        {index + 1}
                    </p>
                ))}
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)} colorScheme="pink">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </Container>
    );
}

export default AddSlider;
