import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfileNew.module.scss';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ShopState } from '~/context/ShopProvider';
import {
    Box,
    Container,
    Radio,
    RadioGroup,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
    Stack,
    Input,
    Avatar,
    Button,
    Toast,
    useToast,
} from '@chakra-ui/react';
import { Col, Row } from 'react-bootstrap';
import UserAPI from '~/Api/UserAPI';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function UserProfileNew() {
    const [loggedUser, setLoggedUser] = useState({});
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
    const [gender, setGender] = useState();
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const toast = useToast();

    const updateImg = (pic) => {
        setLoading(true);

        if (pic.type === 'image/jpeg' || pic.type === 'image/png' || pic.type === 'image/jpg') {
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
                    setImgUrl(data.url.toString());
                    setLoggedUser({ ...loggedUser, imgUrl: data.url.toString() });
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

    const updateProfile = async () => {
        try {
            if (loggedUser !== null) {
                const updateInfo = await UserAPI.updateUserProfile(loggedUser);
                // localStorage.removeItem('userInfo');
                console.log(updateInfo);

                // localStorage.setItem('userInfo', JSON.stringify(updateInfo));
                // setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
                console.log(loggedUser);
                localStorage.setItem('userInfo', JSON.stringify(updateInfo));
                setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
                toast({
                    title: 'Change successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            } else {
                console.log('Error in updateProfile function, loggedUser is null');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                console.log(accessToken);
                const token = accessToken;
                const user = await UserAPI.getUserByToken(token);

                setLoggedUser(user);
                setGender(user.gender);
                setImgUrl(user.imgUrl);
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        };
        generateToken();
    }, [accessToken]);

    useEffect(() => {
        console.log(loggedUser);
    }, [loggedUser]);
    const [genderTag, setGenderTag] = useState([]);
    // useEffect(() => {
    //     const maleRadio = (
    //         <input
    //             name="gender"
    //             type="radio"
    //             value="true"
    //             checked={loggedUser.gender === true}
    //             onChange={(e) => {
    //                 setLoggedUser({ ...loggedUser, gender: e.target.value });
    //             }}
    //         ></input>
    //     );

    //     const femaleRadio = (
    //         <input
    //             name="gender"
    //             type="radio"
    //             value="false"
    //             checked={loggedUser.gender === false}
    //             onChange={(e) => {
    //                 setLoggedUser({ ...loggedUser, gender: e.target.value });
    //             }}
    //         ></input>
    //     );

    //     setGenderTag([maleRadio, femaleRadio]);
    // }, [loggedUser]);

    return (
        <Container className={cx('container')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600">
                    My Profile
                </Text>
                <Text>Manage your account</Text>
            </Box>
            <Row className={cx('account-info-container')}>
                <Col xs lg="9">
                    <TableContainer className={cx('table-info-container')} size="lg">
                        <Table variant="none" size="lg">
                            <Tbody>
                                <Tr>
                                    <Td>
                                        <Text className={cx('text-userinfo')}>Username</Text>
                                    </Td>
                                    <Td>
                                        <Text className={cx('text-userinfo')}>{loggedUser.userName}</Text>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Text className={cx('text-userinfo')}>Name</Text>
                                    </Td>
                                    <Td>
                                        <Input
                                            height="50px"
                                            fontSize={16}
                                            value={loggedUser.fullName}
                                            onChange={(e) => setLoggedUser({ ...loggedUser, fullName: e.target.value })}
                                        />
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Text className={cx('text-userinfo')}> Email</Text>
                                    </Td>
                                    <Td>
                                        <Text className={cx('text-userinfo')}>{loggedUser.email}</Text>
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td>
                                        <Text className={cx('text-userinfo')}>Gender</Text>
                                    </Td>
                                    <Td>
                                        {/* {genderTag} */}
                                        <div className="" style={{ display: 'flex', fontSize: '14px', gap: '20px' }}>
                                            {gender === true ? (
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        name="gender"
                                                        type="radio"
                                                        size="lg"
                                                        value="true"
                                                        checked
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    />
                                                    <p className={cx('gender-text')}>Male</p>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        name="gender"
                                                        type="radio"
                                                        size="lg"
                                                        value="true"
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    />
                                                    <p className={cx('gender-text')}>Male</p>
                                                </div>
                                            )}

                                            {gender === false ? (
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        name="gender"
                                                        type="radio"
                                                        size="lg"
                                                        checked
                                                        value="false"
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    />
                                                    <p className={cx('gender-text')}>Female</p>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex' }}>
                                                    <input
                                                        name="gender"
                                                        type="radio"
                                                        size="lg"
                                                        value="false"
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    ></input>
                                                    <p className={cx('gender-text')}>Female</p>
                                                </div>
                                            )}
                                        </div>
                                        {/* <input
                                            name="gender"
                                            type="radio"
                                            value="true"
                                            checked={loggedUser.gender === true}
                                            onChange={(e) => {
                                                setLoggedUser({ ...loggedUser, gender: e.target.value });
                                            }}
                                        ></input>
                                        <input
                                            name="gender"
                                            type="radio"
                                            value="false"
                                            checked={loggedUser.gender === false}
                                            onChange={(e) => {
                                                setLoggedUser({ ...loggedUser, gender: e.target.value });
                                            }}
                                        ></input> */}
                                        {/* {gender === true ? (
                                                    <Radio
                                                        size="lg"
                                                        value="true"
                                                        checked
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    >
                                                        <Text className={cx('gender-text')}>Male</Text>
                                                    </Radio>
                                                ) : (
                                                    <Radio
                                                        size="lg"
                                                        value="true"
                                                        onChange={(e) => {
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value });
                                                            setGender(e.target.value);
                                                        }}
                                                    >
                                                        <Text className={cx('gender-text')}>Male</Text>
                                                    </Radio>
                                                )}

                                                {gender === false ? (
                                                    <Radio
                                                        size="lg"
                                                        value="false"
                                                        checked
                                                        onChange={(e) =>
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value })
                                                        }
                                                    >
                                                        <Text className={cx('gender-text')}>Female</Text>
                                                    </Radio>
                                                ) : (
                                                    <Radio
                                                        size="lg"
                                                        value="false"
                                                        onChange={(e) =>
                                                            setLoggedUser({ ...loggedUser, gender: e.target.value })
                                                        }
                                                    >
                                                        <Text className={cx('gender-text')}>Female</Text>
                                                    </Radio>
                                                )} */}
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td>
                                        <Text className={cx('text-userinfo')}> Date of birth</Text>
                                    </Td>
                                    <Td>
                                        <Input
                                            placeholder="Select Date and Time"
                                            size="lg"
                                            type="date"
                                            height="50px"
                                            fontSize={16}
                                            value={loggedUser.dob}
                                            onChange={(e) => setLoggedUser({ ...loggedUser, dob: e.target.value })}
                                        />
                                    </Td>
                                </Tr>

                                <Tr>
                                    <Td></Td>
                                    <Td>
                                        <Button
                                            marginTop={5}
                                            fontSize={14}
                                            padding="5%"
                                            colorScheme="blue"
                                            onClick={updateProfile}
                                        >
                                            Save
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Col>
                <Col md="auto" lg="3">
                    <Box textAlign="center" margin={10}>
                        <Avatar src={imgUrl} size="2xl"></Avatar>
                    </Box>
                    <Box textAlign="center">
                        <Input
                            fontSize={14}
                            fontWeight={500}
                            padding={'7%'}
                            onClick={updateImg}
                            accept="image/*"
                            type="file"
                            id="actual-btn"
                            onChange={(e) => updateImg(e.target.files[0])}
                            hidden
                        />
                        <label for="actual-btn" className={cx('lbl-img')}>
                            Select Image
                        </label>
                    </Box>
                    <Box textAlign="center" marginTop={5}>
                        <Text fontSize={14}>File extension: .JPEG, .PNG, .JPG</Text>
                    </Box>

                    <Box textAlign="center" marginTop={55} color="blue" textDecoration="underline">
                        <Link fontSize="14px" to="change-password">
                            Change Password
                        </Link>
                    </Box>
                </Col>
            </Row>
        </Container>
    );
}

export default UserProfileNew;
