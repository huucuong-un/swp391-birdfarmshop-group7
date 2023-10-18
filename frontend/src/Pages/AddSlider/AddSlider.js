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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Title from '~/Components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import SliderAPI from '~/Api/SliderAPI';

const cx = classNames.bind(styles);

function AddSlider() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);
    // Toast
    const toast = useToast();
    const handleShow = () => {
        setShow(!show);
    };
    const [slider, setSlider] = useState({
        sliderName: '',
        description: '',
        sliderImageURL: img,
        status: true,
    });
    const [sliderList, setSliderList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const sliderList = await SliderAPI.getAll();
            setSliderList(sliderList.listResult);
        };
        fetchData();
    }, [slider]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsePost = await axios.post('http://localhost:8086/api/slider', {
                sliderName: slider.sliderName,
                description: slider.description,
                sliderImageURL: img,
                status: slider.status,
            });
            if (responsePost.status === 200) {
                console.log('POST request was successful at species!!');
                // Assuming the response contains the newly created post data

                setSubmissionStatus(true);
            } else {
                console.error('POST request failed with status code - species: ', responsePost.status);
                setSubmissionStatus(false);
            }
            setSlider({});
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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <Title system>Add slider</Title>
            </div>
            <div className={cx('add-btn')}>
                <Button onClick={handleShow} colorScheme={'green'} size={'lg'}>
                    Add
                    <span className={cx('span-icon', { 'rotate-icon': show })}>
                        {show ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </span>
                </Button>
            </div>
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
                                            id="title"
                                            name="title"
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
                                            id="title"
                                            name="title"
                                            value={slider.description}
                                            onChange={(e) => setSlider({ ...slider, description: e.target.value })}
                                            variant="filled"
                                            placeholder="Description"
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
            ) : (
                <></>
            )}
            <div className={cx('sort-space')}>
                <select name="species" id="species">
                    <option value="a">Species</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select name="status" id="status">
                    <option value="b">Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <input type="date" />
                <select name="price" id="price">
                    <option value="c">Price</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                            <Th className={cx('text-center')}>Start date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sliderList.map((slider) => (
                            <Tr key={slider.id}>
                                <Td>{slider.id}</Td>
                                <Td>{slider.sliderName}</Td>
                                <Td>{slider.description}</Td>
                                <Td className={cx('image-container')}>
                                    <img src={slider.sliderImageURL} />
                                </Td>
                                <Td>{slider.status.toString()}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AddSlider;
