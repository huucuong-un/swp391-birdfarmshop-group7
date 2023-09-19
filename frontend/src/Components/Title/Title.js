import styles from '~/Components/Title/Title.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Title({ children, className }) {
    const classes = cx('title', className);
    return <h1 className={classes}>{children}</h1>;
}

export default Title;
