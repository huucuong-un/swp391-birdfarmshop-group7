import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link } from 'react-router-dom';

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
                    <Link to="/admin/order">
                        <p>ORDER</p>
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
                    <Link to="/admin/faqs">
                        <p>FAQs</p>
                    </Link>
                </div>

                <div className={cx('user-account')}>
                    <p>Nguyen Thanh</p>
                </div>
                <div className={cx('out-btn')}>
                    <Button className={cx('out-btn-icon')} to="">
                        Out
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SystemNavbar;
