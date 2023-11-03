import Title from '~/Components/Title/Title';
import { Box, Container, Text } from '@chakra-ui/react';
import { Switch, Stack } from '@chakra-ui/react';
import styles from '~/Pages/AdParrotSpecies/AdParrotSpecies.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import AddParrotSpecies from '~/Pages/AddParrotSpecies/AddParrotSpecies';

const cx = classNames.bind(styles);

function AdParrotSpecies() {
    // Usestate

    const [species, setSpecies] = useState([]);

    const getParrotsSpecies = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
            setSpecies(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };
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
            <AddParrotSpecies></AddParrotSpecies>
        </Container>
    );
}

export default AdParrotSpecies;
