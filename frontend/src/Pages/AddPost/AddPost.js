import classNames from 'classnames/bind';

import styles from '~/Pages/AddPost/AddPost.module.scss';
import {
    Input,
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Thead,
    Td,
    TableContainer,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Textarea,
    Text,
    Switch,
    Container,
    Fade,
    ScaleFade,
    Slide,
    SlideFade,
    Collapse,
    Box,
    Flex,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMinus,
    faPlus,
    faArrowsRotate,
    faAngleLeft,
    faAngleRight,
    faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import Title from '~/Components/Title/Title';
import axios from 'axios';
import PostAPI from '~/Api/PostAPI';
import UpdatePost from '~/Components/UpdatePost/UpdatePost';

const cx = classNames.bind(styles);

function AddPost() {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const [sort, setSort] = useState({
        page: 1,
        limit: 5,
        searchDate: null,
        status: null,
        title: null,
        content: null,
        description: null,
        sortTile: null,
        sortDate: null,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const handleUpdateSuccess = () => {
        setReloadData(true); // Set reloadData to true when the update is successful
    };
    const handleStatus = async (index) => {
        const updatedPost = [...postList];
        updatedPost[index].status = !updatedPost[index].status;

        var postResponse = window.confirm('Are you sure to change status ?');
        if (postResponse) {
            try {
                // Send a request to update the status on the server
                await PostAPI.changePostStatus(updatedPost[index].id);

                // If the request is successful, update the state
                setPostList(updatedPost);
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
    // Toast

    const toast = useToast();
    const handleShow = () => {
        setShow(!show);
    };
    const [post, setPost] = useState({
        description: '',
        title: '',
        content: '',
        imageUrl: null,
        startDate: '',
        endDate: '',
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
    const [validate, setValidate] = useState({
        title: null,
        description: null,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                post.title.length !== 0 &&
                post.content.length !== 0 &&
                (post.title.length > 150 ||
                    post.title.length < 3 ||
                    post.content.length > 300 ||
                    post.content.length < 10)
            ) {
                if (
                    (post.title.length > 150 || post.title.length < 3) &&
                    (post.content.length > 300 || post.content.length < 10)
                ) {
                    setValidate({
                        title: 'Title must be between 3 and 150 characters',
                        description: 'Content must be between 10 and 300 character',
                    });
                } else if (post.title.length > 150 || post.title.length < 3) {
                    setValidate({
                        title: 'Title must be between 3 and 150 characters',
                        description: '',
                    });
                } else if (post.content.length > 300 || post.content.length < 10) {
                    setValidate({
                        title: '',
                        description: 'Content must be between 10 and 300 character',
                    });
                }

                setSubmissionStatus(false);
                setTimeout(() => {
                    setSubmissionStatus('');
                }, 5000);
            } else {
                // Reset the error messages if the validation criteria are met
                setValidate({
                    title: null,
                    description: null,
                });
                const responsePost = await PostAPI.addPost({
                    endDate: post.endDate,
                    status: post.status,
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    startDate: post.startDate,
                    imageUrl: img,
                });

                console.log('POST request was successful at species!!');
                // Assuming the response contains the newly created post data
                setPost({ ...post, ...responsePost.data });
                setSubmissionStatus(true);
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
            setSubmissionStatus(false);
        }
    };
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const postList = await PostAPI.searchSortForPost(sort);
            setPostList(postList.listResult);
            setTotalPage(postList.totalPage);
        };
        if (reloadData) {
            fetchData();
            setReloadData(false);
        } else {
            fetchData();
        }
    }, [reloadData, post, sort]);
    const convertToTrueFormat = (timeText) => {
        let [date, time] = timeText.split('T');
        let [hours, mins, secs] = time.split(':');
        if (date && time && hours && mins && secs) {
            return date + ' ' + time;
        } else if (secs === undefined) {
            return date + ' ' + hours + ':' + mins + ':00';
        }
    };
    // console.log(postList);
    const [openPostID, setOpenPostID] = useState(null);
    const toggleEditForm = (postID) => {
        if (openPostID === postID) {
            // If the form is already open for this species, close it
            setOpenPostID(null);
        } else {
            // Otherwise, open the form for this species
            setOpenPostID(postID);
        }
    };
    // Sorting
    // Sorting
    // Sorting
    // Sorting
    // Sorting
    const handlePageChange = (newPage) => {
        setSort({
            page: newPage,
            limit: 5,
            email: sort.email,
            phone: sort.phone,
            date: sort.date,
            sortDate: sort.sortDate,
            sortPrice: sort.sortPrice,
            sortTitle: sort.sortTile,
        });

        setPage(newPage);
    };

    const handleClear = () => {
        setSort({
            page: 1,
            limit: 10,
            searchDate: null,
            status: null,
            title: null,
            content: null,
            description: null,
            sortTile: null,
            sortDate: null,
        });
    };

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    POST MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')} onClick={handleShow}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <Text className={cx('add-role-text')}>Add post</Text>
            </Flex>

            {show ? (
                <div className={cx('inner-up')}>
                    <div className={cx('post-img')}>{img ? <img src={img} alt="post-img" /> : <></>}</div>
                    <div className={cx('post-info')}>
                        <div className={cx('post-info-title')}>
                            <h1>{post.title}</h1>
                        </div>
                        <div className={cx('post-info-content')}>
                            <p>{post.content}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}

            {show ? (
                <form className={cx('inner')} onSubmit={handleSubmit}>
                    <TableContainer className={cx('table-container-add')}>
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
                                        </Text>
                                    </AlertTitle>
                                </Alert>
                            ))}
                        <div className={cx('title-container')}>
                            <Title system>Add Post</Title>
                        </div>
                        <Table size="xs ">
                            <Tbody>
                                <Tr>
                                    <Td>Title</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={post.title}
                                            onChange={(e) => {
                                                setPost({ ...post, title: e.target.value });
                                            }}
                                            variant="filled"
                                            placeholder="Title"
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
                                            value={post.description}
                                            onChange={(e) => {
                                                setPost({ ...post, description: e.target.value });
                                            }}
                                            variant="filled"
                                            placeholder="Description"
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Content</Td>
                                    <Td className={cx('text-area')}>
                                        <Textarea
                                            value={post.content}
                                            onChange={(e) => setPost({ ...post, content: e.target.value })}
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>Start day</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            step="1"
                                            type="datetime-local"
                                            onChange={(e) => {
                                                const timeConvert = convertToTrueFormat(e.target.value);
                                                setPost({ ...post, startDate: timeConvert });
                                            }}
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>End day</Td>
                                    <Td className={cx('text-area')}>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="md"
                                            step="1"
                                            type="datetime-local"
                                            onChange={(e) => {
                                                const timeConvert = convertToTrueFormat(e.target.value);
                                                setPost({ ...post, endDate: timeConvert });
                                            }}
                                            required
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>Post image</Td>
                                    <Td className={cx('text-area')}>
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
                    placeholder="Content"
                    onChange={(e) => setSort({ ...sort, content: e.target.value })}
                />
                <input type="text" placeholder="Title" onChange={(e) => setSort({ ...sort, title: e.target.value })} />

                {/* Sort date */}
                <input
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}
                />
                {/* Sort title */}
                <select
                    name="sortTitle"
                    id="sortTitle"
                    onChange={(e) => setSort({ ...sort, sortTitle: e.target.value })}
                >
                    <option value="b">Title</option>
                    <option value="TASC">Ascending</option>
                    <option value="TDESC">Descending</option>
                </select>
                <select name="sortDate" id="sortDate" onChange={(e) => setSort({ ...sort, sortDate: e.target.value })}>
                    <option value="b">Date</option>
                    <option value="DASC">Ascending</option>
                    <option value="DDESC">Descending</option>
                </select>
                <select
                    name="sortStatus"
                    id="sortStatus"
                    onChange={(e) => setSort({ ...sort, status: e.target.value })}
                >
                    <option value="">Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            <table>
                <thead>
                    <tr>
                        <th className={cx('text-center')}>ID</th>
                        <th className={cx('text-center')}>Title</th>
                        <th className={cx('text-center')}>Description</th>
                        <th className={cx('text-center')}>Content</th>
                        <th className={cx('text-center')}>Image</th>
                        <th className={cx('text-center')}>Start date</th>
                        <th className={cx('text-center')}>End date</th>
                        <th className={cx('text-center')}>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((post, index) => (
                        <>
                            <tr key={index}>
                                <td>{post.id} </td>
                                <td>{post.title} </td>
                                <td>{post.description}</td>
                                <td>
                                    <div className={cx('td-content')}>{post.content}</div>
                                </td>
                                <td>
                                    <img src={post.imageUrl} width="150px" height="150px" />
                                </td>
                                <td>{post.startDate} </td>
                                <td>{post.endDate} </td>
                                <td>
                                    <Switch
                                        onChange={() => handleStatus(index)}
                                        size="lg"
                                        isChecked={post.status}
                                        colorScheme="green"
                                    />
                                    {post.status ? (
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
                                        value={status}
                                        onChange={(e) => setPost({ ...post, status: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <Button
                                        key={post.id}
                                        onClick={() => toggleEditForm(post.id)}
                                        colorScheme={'green'}
                                        size={'lg'}
                                    >
                                        {openPostID === post.id ? 'Close Edit' : 'Edit'}
                                    </Button>
                                </td>
                            </tr>

                            <tr key={index + 'post'}>
                                {openPostID === post.id && (
                                    <td colSpan={10}>
                                        <UpdatePost postId={post.id} reloadData={handleUpdateSuccess} />
                                    </td>
                                )}
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
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

export default AddPost;
