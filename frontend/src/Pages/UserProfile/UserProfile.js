import classNames from 'classnames/bind';
import styles from '~/Pages/UserProfile/UserProfile.module.scss';

const cx = classNames.bind(styles);

function UserProfile() {
    return <div className={cx('wrapper')}></div>;
}

export default UserProfile;
