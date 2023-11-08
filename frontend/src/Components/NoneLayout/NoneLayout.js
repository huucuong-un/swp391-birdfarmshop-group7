import styles from '~/Components/SystemLayout/System.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NoneLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default NoneLayout;
