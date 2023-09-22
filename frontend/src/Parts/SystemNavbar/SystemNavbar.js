import styles from '~/Parts/SystemNavbar/SystemNavbar.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

import logo from '~/Assets/image/Logo/11-TWELL.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SystemNavbar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="">
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
                <div className={cx('nav-items')}>
                    <Link>
                        <p>ACCOUNTS</p>
                    </Link>
                    <Link>
                        <p>ROLES</p>
                    </Link>
                    <Link>
                        <p>SERVICE</p>
                    </Link>
                    <Link>
                        <p>SPECIES</p>
                    </Link>
                    <Link>
                        <p>COLORS</p>
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
