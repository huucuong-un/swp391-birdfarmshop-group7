import styles from '~/Components/SystemLayout/System.module.scss';
import classNames from 'classnames/bind';
import MarketingNavbar from '~/Parts/MarketingNavbar/MarketingNavbar';

const cx = classNames.bind(styles);

function MarketingLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <MarketingNavbar></MarketingNavbar>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MarketingLayout;
