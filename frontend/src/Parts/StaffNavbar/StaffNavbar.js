import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShopState } from '~/context/ShopProvider';
import UserAPI from '~/Api/UserAPI';
import { Button, Text } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function StaffNavbar({ staff, manager }) {
    const { setUser } = ShopState();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/system/login');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link to="/staff/order">
                        <p>ORDER</p>
                    </Link>
                    <Link to="/staff/feedback">
                        <p>FEEDBACK</p>
                    </Link>
                    {/* <Link to="/staff/nest-usage-history">
                        <p>NEST ORDER</p>
                    </Link> */}
                </div>

                <div className={cx('user-account')}></div>
                <Button className={cx('out-btn-icon')} onClick={logoutHandler} colorScheme="green">
                    <Text fontSize={16} margin="0px 0px">
                        Out
                    </Text>
                </Button>
            </div>
        </div>
    );
}

export default StaffNavbar;
