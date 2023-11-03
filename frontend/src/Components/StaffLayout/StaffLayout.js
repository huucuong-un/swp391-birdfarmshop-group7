import styles from '~/Components/SystemLayout/System.module.scss';
import classNames from 'classnames/bind';
import StaffNavbar from '~/Parts/StaffNavbar/StaffNavbar';

const cx = classNames.bind(styles);

function StaffLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <StaffNavbar></StaffNavbar>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default StaffLayout;
