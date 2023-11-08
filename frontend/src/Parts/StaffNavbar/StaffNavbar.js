import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function StaffNavbar({ staff, manager }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link to="/admin/order">
                        <p>ORDER</p>
                    </Link>
                    <Link to="/staff/feedback">
                        <p>FEEDBACK</p>
                    </Link>
                    <Link to="/admin/nest-usage-history">
                        <p>NEST USAGE HISTORY</p>
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

export default StaffNavbar;
