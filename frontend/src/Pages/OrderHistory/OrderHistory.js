import classNames from 'classnames/bind';
import styles from '~/Pages/OrderHistory/OrderHistory.module.scss';
const cx = classNames.bind(styles);
function OrderHistory() {
    return (
        <div classNames={cx('wrapper')}>
            <div className={cx('inner')}></div>
        </div>
    );
}

export default OrderHistory;
