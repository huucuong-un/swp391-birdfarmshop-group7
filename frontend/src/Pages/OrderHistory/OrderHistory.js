import classNames from 'classnames/bind';
import SortSpace from '~/Components/SortSpace/SortSpace';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/OrderHistory/OrderHistory.module.scss';

const cx = classNames.bind(styles);

function OrderHistory() {
    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Order History</StartPartPage>
            <SortSpace></SortSpace>
            <div className={cx('inner')}>
                <div className={cx('create-at')}>
                    <p>June 5</p>
                </div>
                <div className={cx('order-items')}>
                    <div className={cx('order-item-img')}>
                        <img
                            src="https://images.unsplash.com/photo-1625093727068-2f2355a4bd70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="main-img"
                        />
                    </div>
                    <div className={cx('order-item-info-container')}>
                        <p className={cx('order-item-info-title')}>Jungle Parrot</p>
                        <p className={cx('order-item-info-quantity')}>x2</p>
                    </div>
                    <div className={cx('order-item-price')}>$6000</div>
                </div>
                <div className={cx('total-container')}>
                    <p>Total: $6000</p>
                </div>
            </div>

            <div className={cx('inner')}>
                <div className={cx('create-at')}>
                    <p>June 5</p>
                </div>
                <div className={cx('order-items')}>
                    <div className={cx('order-item-img')}>
                        <img
                            src="https://images.unsplash.com/photo-1625093727068-2f2355a4bd70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="main-img"
                        />
                    </div>
                    <div className={cx('order-item-info-container')}>
                        <p className={cx('order-item-info-title')}>Jungle Parrot</p>
                        <p className={cx('order-item-info-quantity')}>x2</p>
                    </div>
                    <div className={cx('order-item-price')}>$6000</div>
                </div>
                <div className={cx('total-container')}>
                    <p>Total: $6000</p>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
