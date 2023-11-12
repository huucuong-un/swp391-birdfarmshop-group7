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

    useEffect(() => {
        const handleSortAndSearchChange = () => {
            props.onSortAndSearchChange({
                ...sort,
            });
        };
        handleSortAndSearchChange();
    }, [sort]);
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
                            onChange={(e) => setSort({ ...sort, searchName: e.target.value })}
                        />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <select
                        className={cx('select')}
                        name="sortName"
                        id="dsa"
                        onChange={(e) =>
                            setSort({ ...sort, sortName: e.target.value, sortRating: '', sortDate: '', sortPrice: '' })
                        }
                    >
                        <option
                            value=""
                            selected={sort.sortRating !== '' || sort.sortDate !== '' || sort.sortPrice !== ''}
                        >
                            Sort species
                        </option>
                        <option value="NASC">A to Z</option>
                        <option value="NDESC">Z to A</option>
                    </select>
                    <select
                        className={cx('select')}
                        name="sortRating"
                        id="dsa"
                        onChange={(e) =>
                            setSort({ ...sort, sortName: '', sortRating: e.target.value, sortDate: '', sortPrice: '' })
                        }
                    >
                        <option
                            value=""
                            selected={sort.sortName !== '' || sort.sortDate !== '' || sort.sortPrice !== ''}
                        >
                            Sort rating
                        </option>
                        <option value="PARASC">Ascending</option>
                        <option value="PARDESC">Descending</option>
                    </select>
                    <select
                        className={cx('select')}
                        name="sortPrice"
                        id="dsa"
                        onChange={(e) =>
                            setSort({ ...sort, sortName: '', sortRating: '', sortDate: '', sortPrice: e.target.value })
                        }
                    >
                        <option
                            value=""
                            selected={sort.sortName !== '' || sort.sortRating !== '' || sort.sortDate !== ''}
                        >
                            Sort price
                        </option>
                        <option value="PASC">Low to High</option>
                        <option value="PDESC">High to Low</option>
                    </select>
                    <select
                        className={cx('select')}
                        name="sortDate"
                        id="dsa"
                        onChange={(e) =>
                            setSort({
                                ...sort,
                                sortName: '',
                                sortRating: '',
                                sortDate: e.target.value,
                                sortPrice: '',
                            })
                        }
                    >
                        <option
                            value=""
                            selected={sort.sortName !== '' || sort.sortRating !== '' || sort.sortPrice !== ''}
                        >
                            Sort date
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
