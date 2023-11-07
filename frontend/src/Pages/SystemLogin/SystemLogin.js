import { Box, Button, Container, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import axios from 'axios';

import styles from './SystemLogin.module.scss';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function SystemLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();

    const navigate = useNavigate();
    const logins = async () => {
        if (!email || !password) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const data = await axios.post(
                'http://localhost:8086/api/user/authenticate',
                {
                    email,
                    password,
                },
                config,
            );
            localStorage.setItem('accessToken', JSON.stringify(data.data));
            console.log(data.data);
            const user = await UserAPI.getUserByToken(data.data);
            const userRole = await RoleAPI.getRoleName(user.roleId);
            console.log(user);
            setLoading(false);
            // // setLoading(false);
            if (userRole === 'admin') {
                navigate('/admin/dashboard');
                toast({
                    title: 'Login successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            } else if (userRole === 'staff') {
                navigate('/staff/order');
                toast({
                    title: 'Login successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            } else if (userRole === 'marketer') {
                navigate('/marketer/post');
                toast({
                    title: 'Login successful',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            } else if (userRole === 'customer') {
                navigate('/login-user');
            } else {
                navigate('/system/login');
                toast({
                    title: 'Login Fail',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            }
        } catch (error) {
            toast({
                title: 'Error occur, check your account and password again!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            console.log(error);
        }
    };

    return (
        <Container maxW="container.sm" bg="white" color="black" className={cx('container')}>
            <Box className={cx('login-title')}>Login</Box>

            <Container maxW="container.sm" className={cx('form-input')}>
                <Input
                    className={cx('input-form')}
                    variant="flushed"
                    placeholder="Account"
                    required
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputGroup mt="7%">
                    <Input
                        fontSize={18}
                        variant="flushed"
                        placeholder="Password"
                        type={show ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        padding={0}
                    />
                    <InputRightElement className={cx('showHidePasswordBtn')} onClick={handleClick}>
                        <Button backgroundColor="white">
                            {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button loading={loading} className={cx('login-button')} onClick={() => logins()}>
                    Login
                </Button>
            </Container>
        </Container>
    );
}

export default SystemLogin;
