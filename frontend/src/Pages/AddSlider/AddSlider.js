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
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Title from '~/Components/Title/Title';

import axios from 'axios';

const cx = classNames.bind(styles);

function AddSlider() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    // Toast
    const toast = useToast();

    const [post, setPost] = useState({
        title: '',
        content: '',
        imageUrl: null,
        startDate: '2023-09-23 00:00:00',
        endDate: '2023-09-30 23:59:59',
        status: true,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsePost = await axios.post('http://localhost:8086/api/post', {
                title: post.title,
                content: post.content,
                imageUrl: img,
                startDate: post.startDate,
                endDate: post.endDate,
                status: post.status,
            });
            if (responsePost.status === 200) {
                console.log('POST request was successful at species!!');
                // Assuming the response contains the newly created post data
                setPost({ ...post, ...responsePost.data });
                setSubmissionStatus(true);
            } else {
                console.error('POST request failed with status code - species: ', responsePost.status);
                setSubmissionStatus(false);
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
            setSubmissionStatus(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <Title system>Add slider</Title>
            </div>
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
                            <h1>Add species color</h1>
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
                                        value={post.title}
                                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                                        variant="filled"
                                        placeholder="Origin"
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

export default AddSlider;
