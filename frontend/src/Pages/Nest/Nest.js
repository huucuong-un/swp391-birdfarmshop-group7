import { Box, TabList, TabPanel, TabPanels, Text } from '@chakra-ui/react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Breadcrumbs from '~/Components/Breadcrumbs/Breadcrumbs';
import Test from '~/Components/TestUploadImg/TestUploadImage';

const Nest = () => {
    return (
        <Container maxW="xl" centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans">
                    Cookie Chat
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Test />
            </Box>
        </Container>
    );
};

export default Nest;
