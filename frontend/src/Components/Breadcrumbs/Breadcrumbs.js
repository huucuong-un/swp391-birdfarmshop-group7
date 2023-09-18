import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import styles from '~/Components/Breadcrumbs/Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

function Breadcrumbs() {
    const location = useLocation();
    return (
        <nav>
            <Link to="/" className={location.pathname === '/' ? cx('breadcrumb-active') : cx('breadcrumb-not-active')}>
                Home
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link
                to="/parrotProduct"
                className={
                    location.pathname.startsWith('/parrotProduct')
                        ? cx('breadcrumb-active')
                        : cx('breadcrumb-not-active')
                }
            >
                Parrots
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link
                to="/products/1"
                className={location.pathname === '/products/1' ? cx('breadcrumb-active') : cx('breadcrumb-not-active')}
            >
                Product 1
            </Link>
        </nav>
    );
}

export default Breadcrumbs;
