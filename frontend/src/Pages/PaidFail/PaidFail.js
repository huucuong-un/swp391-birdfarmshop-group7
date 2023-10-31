import { Button, ButtonGroup } from '@chakra-ui/react';

import classNames from 'classnames/bind';
import styles from '~/Pages/PaidFail/PaidFail.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function PaidFail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <FontAwesomeIcon icon={faCircleXmark} className={cx('fail-icon')} />
                <h1>Paid Fail!</h1>
                <div className={cx('active')}>
                    <Link to="/">
                        <Button size="lg" colorScheme="blue">
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaidFail;
