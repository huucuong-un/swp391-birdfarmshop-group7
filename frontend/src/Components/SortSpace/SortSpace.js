import styles from '~/Components/SortSpace/SortSpace.module.scss';
import classNames from 'classnames/bind';
import { Input, Stack, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SortSpace(props) {
    const [sort, setSort] = useState({
        searchName: null,
        sortDate: null,
        sortName: null,
        sortRating: null,
        sortPrice: null,
    });

    const handleSortAndSearchChange = (event) => {
        const { name, value } = event.target;
        setSort((prevSort) => ({
            ...prevSort,
            [name]: value,
        }));

        props.onSortAndSearchChange({
            ...sort,
            [name]: value,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('sort-space')}>
                    <div className={cx('search')}>
                        <input
                            className={cx('search-input')}
                            type="text"
                            name="searchName"
                            placeholder="Search..."
                            onChange={handleSortAndSearchChange}
                        />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <select className={cx('select')} name="sortName" id="dsa" onChange={handleSortAndSearchChange}>
                        <option defaultValue selected>
                            Species
                        </option>
                        <option value="NASC">A to Z</option>
                        <option value="NDESC">Z to A</option>
                    </select>
                    <select className={cx('select')} name="sortRating" id="dsa" onChange={handleSortAndSearchChange}>
                        <option defaultValue selected>
                            Rating
                        </option>
                        <option value="PARASC">Ascending</option>
                        <option value="PARDESC">Descending</option>
                    </select>
                    <select className={cx('select')} name="sortPrice" id="dsa" onChange={handleSortAndSearchChange}>
                        <option defaultValue selected>
                            Price
                        </option>
                        <option value="PASC">Low to High</option>
                        <option value="PDESC">High to Low</option>
                    </select>
                    <select className={cx('select')} name="sortDate" id="dsa" onChange={handleSortAndSearchChange}>
                        <option defaultValue selected>
                            Date
                        </option>
                        <option value="DASC">Low to High</option>
                        <option value="DDESC">High to Low</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SortSpace;
