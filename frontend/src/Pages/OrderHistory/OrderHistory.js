import classNames from 'classnames/bind';
import SortSpace from '~/Components/SortSpace/SortSpace';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/OrderHistory/OrderHistory.module.scss';
const cx = classNames.bind(styles);

var listOfObjects = [
    {
        title: 'reasons why i love cars',
        desc: "because they're beautiful",
    },
    {
        title: 'reasons why i love women',
        desc: "because they're beautiful",
    },
    {
        title: 'reasons why i love my bros',
        desc: "because they're intelligen",
    },
];

function OrderHistory() {
    return (
        <div classNames={cx('wrapper')}>
            <StartPartPage>Order history</StartPartPage>
            <div className={cx('inner')}>
                <SortSpace></SortSpace>
                <div className={cx('history-container')}></div>
            </div>
        </div>
    );
}

export default OrderHistory;
