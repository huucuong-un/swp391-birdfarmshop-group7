import { Box, Button, Container, Input, InputGroup, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordOTP = () => {
    const navigate = useNavigate();

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
                    navigate('reset-password');
                }}
            >
                Send
            </Button>
        </Container>
    );
};

export default ForgotPasswordOTP;
