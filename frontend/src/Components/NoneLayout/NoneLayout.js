import styles from '~/Components/SystemLayout/System.module.scss';
import classNames from 'classnames/bind';
import MarketingLayout from '../NoneLayout/NoneLayout';

const cx = classNames.bind(styles);

function NoneLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <MarketingLayout></MarketingLayout>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default NoneLayout;
