import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';

//hook
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Input, InputRightElement, Text, useToast, Button } from '@chakra-ui/react';
import { ShopState } from '~/context/ShopProvider';
import axios from 'axios';
import LoginAPI from '~/Api/LoginAPI';
import { InputGroup } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function  ChangePasswordForm() {
    const navigate = useNavigate();
    const toast = useToast();
    const { user } = ShopState();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [passwordNew, setPasswordNew] = useState('');
    const [confirmPasswordNew, setConfirmPasswordNew] = useState('');

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showConfirmPasswordNew, setShowConfirmPasswordNew] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };

    const togglePasswordVisibilityConFirmNew = () => {
        setShowConfirmPasswordNew(!showConfirmPasswordNew);
    };

    const handleClick = async () => {
        if (!password || !passwordNew || !confirmPasswordNew) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }
        if (passwordNew !== confirmPasswordNew) {
            toast({
                title: 'Password does not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const data = await LoginAPI.changePassword(
                {
                    currentUsername: user.userName,
                    currentPassword: password,
                    newPassword: passwordNew,
                    confirmNewPassword: confirmPasswordNew,
                },
                config,
            );

            toast({
                title: 'Change password successfully!!',
                // description: error.register.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            navigate('/login-user');
            console.log(data);
        } catch (error) {
            toast({
                title: 'Error occur!',
                // description: error.register.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }
    };

    return (
        <Container className={cx('container')} maxW="container.xl">
            <Box>
                <Text fontSize="24px" fontWeight="600" borderBottom="1px solid #ccc" width="90%" padding="10px 0">
                    Change Password
                </Text>
            </Box>
            <Box width="40%" marginTop={10}>
                <Text fontSize="16px" fontWeight={500}>
                    Current Password
                </Text>

                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fontSize="16px"
                        padding="4% 2%"
                    />
                    <InputRightElement width="4.5rem" height="100%">
                        <i className={cx('check')}>
                            {showPassword ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEye} />
                            )}
                        </i>
                    </InputRightElement>
                </InputGroup>
            </Box>

            <Box width="40%" marginTop={10}>
                <Text fontSize="16px" fontWeight={500}>
                    New Password
                </Text>

                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={showPasswordNew ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={passwordNew}
                        onChange={(e) => setPasswordNew(e.target.value)}
                        required
                        fontSize="16px"
                        padding="4% 2%"
                    />
                    <InputRightElement width="4.5rem" height="100%">
                        <i className={cx('check')}>
                            {showPasswordNew ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEye} />
                            )}
                        </i>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Box width="40%" marginTop={10}>
                <Text fontSize="16px" fontWeight={500}>
                    Confirm New Password
                </Text>

                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type={showConfirmPasswordNew ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={confirmPasswordNew}
                        onChange={(e) => setConfirmPasswordNew(e.target.value)}
                        required
                        fontSize="16px"
                        padding="4% 2%"
                    />
                    <InputRightElement width="4.5rem" height="100%">
                        <i className={cx('check')}>
                            {showConfirmPasswordNew ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityConFirmNew} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityConFirmNew} icon={faEye} />
                            )}
                        </i>
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Button
                onClick={() => handleClick()}
                colorScheme="blue"
                width="40%"
                padding="2%"
                fontSize="16px"
                marginTop={10}
            >
                Save change
            </Button>
        </Container>
    );
}

export default ChangePasswordForm;
