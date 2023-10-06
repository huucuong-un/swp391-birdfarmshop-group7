import styles from '~/Components/SortSpace/SortSpace.module.scss';
import classNames from 'classnames/bind';
import { Input, Stack, InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SortSpace() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('sort-space')}>
                    <select className={cx('select')} name="Features" id="dsa">
                        <option defaultValue selected>
                            Features
                        </option>
                        <option>a to z</option>
                    </select>
                    <div className={cx('search')}>
                        <input className={cx('search-input')} type="text" placeholder="Search..." />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortSpace;
