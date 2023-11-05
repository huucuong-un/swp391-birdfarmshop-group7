import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

import logo from '~/Assets/image/Logo/2(5).png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MarketingNavbar({ staff, manager }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link to="">
                        <p>DASHBOARD</p>
                    </Link>
                    <Link to="/marketer/post">
                        <p>POST</p>
                    </Link>
                    <Link to="/marketer/slider">
                        <p>SLIDER</p>
                    </Link>
                    <Link to="/marketer/promotion">
                        <p>PROMOTION</p>
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

export default MarketingNavbar;
