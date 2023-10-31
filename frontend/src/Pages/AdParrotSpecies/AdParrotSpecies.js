import Title from '~/Components/Title/Title';
import { Container } from '@chakra-ui/react';
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
            <div className={cx('title-container')}>
                <h1>ADD PARROT SPECIES</h1>
            </div>
            <AddParrotSpecies></AddParrotSpecies>
        </Container>
    );
}

export default AdParrotSpecies;
