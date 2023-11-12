import classNames from 'classnames/bind';
import styles from '~/Pages/ParrotProduct/ParrotProduct.module.scss';

import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import SortSpace from '~/Components/SortSpace/SortSpace';
import ParrotList from '~/Components/ParrotList/ParrotList';

import { useState } from 'react';

const cx = classNames.bind(styles);

function ParrotProduct() {
    const [sortWay, setSortWay] = useState('');
    const [totalSpecies, setTotalSpecies] = useState(0);

    const handleSortChange = (newSortValue) => {
        setSortWay(newSortValue);
        // console.log(newSortValue);
    };

    const handleTotalSpeciesChange = (newTotalSpecies) => {
        setTotalSpecies(newTotalSpecies);
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage totalSpecies={totalSpecies}>Parrots</StartPartPage>
            <SortSpace onSortAndSearchChange={handleSortChange} sortWay={sortWay}></SortSpace>
            <ParrotList sortWay={sortWay} onTotalSpeciesChange={handleTotalSpeciesChange}></ParrotList>
        </div>
    );
}

export default ParrotProduct;
