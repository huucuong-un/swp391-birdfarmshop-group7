import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ placeholder, type, ...passProps }) {
    const props = {
        ...passProps,
    };

    return (
        <div className={cx('wrapper')}>
            <input className={cx('input')} placeholder={placeholder} type={type} {...props}></input>
            <i className={cx('line')}></i>
        </div>
    );
}

export default Input;
