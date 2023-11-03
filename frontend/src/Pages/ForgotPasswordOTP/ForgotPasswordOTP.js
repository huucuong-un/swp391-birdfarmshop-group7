import { Box, Button, Container, Input, InputGroup, Text, Toast, useToast } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OTPAPI from '~/Api/OTPAPI';

const ForgotPasswordOTP = () => {
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const handleValidateOTP = async () => {
        try {
            const email = location.state.email;
            const code = document.getElementById('OTP').value;

            console.log(document.getElementById('OTP').value);
            console.log(location.state.email);
            const OTP = await OTPAPI.getOTP(email, code);
            if (OTP.id !== null && OTP.id !== undefined) {
                navigate('reset-password', { state: { email } });
            } else {
                toast({
                    title: 'Wrong OTP',
                    // description: error.register.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            }
        } catch (error) {}
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
            <Box width="40%" marginTop={50}>
                <Text fontSize="16px" fontWeight={500}>
                    Enter OTP code
                </Text>

                <InputGroup size="md">
                    <Input
                        id="OTP"
                        pr="4.5rem"
                        type={'text'}
                        placeholder="Enter OTP code that we have sent to your email"
                        required
                        fontSize="16px"
                        padding="4% 2%"
                    />
                </InputGroup>
            </Box>

            <Button
                colorScheme="blue"
                width="40%"
                padding="2%"
                fontSize="16px"
                marginTop={10}
                onClick={() => {
                    handleValidateOTP();
                }}
            >
                Send
            </Button>
        </Container>
    );
};

export default ForgotPasswordOTP;
