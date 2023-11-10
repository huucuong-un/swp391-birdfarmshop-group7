import { Box, Button, Container, Text } from '@chakra-ui/react';
import { Switch, Stack } from '@chakra-ui/react';
import styles from '~/Pages/AdParrotSpecies/AdParrotSpecies.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import AddParrotSpecies from '~/Pages/AddParrotSpecies/AddParrotSpecies';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

function AdParrotSpecies() {
    // Usestate
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('accessToken')));

    const [species, setSpecies] = useState([]);
    const navigate = useNavigate();
    const getParrotsSpecies = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
            setSpecies(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };

    const redirectToParrotList = () => {
        navigate('/admin/parrot');
    };

    useEffect(() => {
        const getUserByToken = async () => {
            try {
                console.log(token);
                const userByToken = await UserAPI.getUserByToken(token);
                if (
                    userByToken === null ||
                    userByToken === '' ||
                    userByToken === undefined ||
                    userByToken.length === 0
                ) {
                    navigate('/error');
                } else {
                    const userRole = await RoleAPI.getRoleName(userByToken.roleId);

                    if (userRole !== 'admin') {
                        navigate('/error');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserByToken();
    }, [token]);
    useEffect(() => {
        // Gọi hàm getParrots khi component được mount
        getParrotsSpecies();
    }, []);

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    PARROT SPECIES MANAGEMENT
                </Text>
            </Box>
            <Button colorScheme="green" onClick={redirectToParrotList} marginBottom={10}>
                <Text fontSize={16} margin={0} padding={4}>
                    View parrots list
                </Text>
            </Button>
            <AddParrotSpecies></AddParrotSpecies>
        </Container>
    );
}

export default AdParrotSpecies;
