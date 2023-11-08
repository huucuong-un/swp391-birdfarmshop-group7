import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopState } from '~/context/ShopProvider';
import { useState } from 'react';
import UserAPI from '~/Api/UserAPI';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function SystemNavbar({ staff, manager }) {
    const staffItem = [
        {
            title: 'ORDERS',
            path: '/staff-order-management',
        },

        {
            title: 'FEEDBACKS',
            path: '/staff-feedback',
        },
    ];

    const managerItem = [
        {
            title: 'ACCOUNTS',
            path: '/staff-order-management',
        },

        {
            title: 'ROLES',
            path: '/staff-feedback',
        },
        {
            title: 'SERVICE',
            path: '/staff-feedback',
        },
        {
            title: 'SPECIES',
            path: '/staff-feedback',
        },
        {
            title: 'COLORS',
            path: '/staff-feedback',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link to="/admin/dashboard">
                        <p>DASHBOARD</p>
                    </Link>
                    <Link to="/admin/account">
                        <p>ACCOUNT</p>
                    </Link>
                    <Link to="/admin/role">
                        <p>ROLE</p>
                    </Link>
                    <Link to="/admin/parrot-species">
                        <p>SPECIES</p>
                    </Link>
                    <Link to="/admin/parrot">
                        <p>PARROT</p>
                    </Link>
                    <Link to="/admin/promotion">
                        <p>PROMOTION</p>
                    </Link>
                    <Link to="/admin/nest">
                        <p>NEST</p>
                    </Link>
                    <Link to="/admin/nest-price">
                        <p>NEST PRICE</p>
                    </Link>
                    <Link to="/admin/nest-development-status">
                        <p>DEVELOPMENT STATUS</p>
                    </Link>
                    <Link to="/admin/faqs">
                        <p>FAQs</p>
                    </Link>
                </div>

                <div className={cx('user-account')}></div>

                <Button className={cx('out-btn-icon')}>Out</Button>
            </div>
        </div>
    );
}

export default SystemNavbar;
