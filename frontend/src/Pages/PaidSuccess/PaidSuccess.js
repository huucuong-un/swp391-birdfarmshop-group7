import classNames from 'classnames/bind';
import styles from '~/Pages/PaidSuccess/PaidSuccess.module.scss';

const cx = classNames.bind(styles);

function PaidSuccess() {
    return (
        <div className={cx('wrapper')}>
            <h1>Paid Success!</h1>
        </div>
    );
}

export default PaidSuccess;
