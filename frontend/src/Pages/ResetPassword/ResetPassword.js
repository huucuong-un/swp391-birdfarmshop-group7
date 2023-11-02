import { Box, Button, Container, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Pages/ChangePassword/ChangePassword.module.scss';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';

const ResetPassword = () => {
    const [passwordNew, setPasswordNew] = useState('');
    const [confirmPasswordNew, setConfirmPasswordNew] = useState('');

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showConfirmPasswordNew, setShowConfirmPasswordNew] = useState(false);
    const toast = useToast();
    const cx = classNames.bind(styles);

    const togglePasswordVisibilityNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };

    const togglePasswordVisibilityConFirmNew = () => {
        setShowConfirmPasswordNew(!showConfirmPasswordNew);
    };
    const handleClick = async () => {
        if (!passwordNew || !confirmPasswordNew) {
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
    };
    return (
        <Container minHeight={700} maxW="container.xl">
            <Box>
                <Text
                    fontSize="24px"
                    fontWeight="600"
                    borderBottom="1px solid #ccc"
                    width="90%"
                    padding="10px 0"
                    mt={10}
                >
                    Reset Password
                </Text>
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

            <Button colorScheme="blue" width="40%" padding="2%" fontSize="16px" marginTop={10}>
                Reset
            </Button>
        </Container>
    );
};

export default ResetPassword;
