import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import styles from '~/Components/Breadcrumbs/Breadcrumbs.module.scss';

const cx = classNames.bind(styles);

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // const modifiedPathnames = pathnames.map((name) => {
    //     if (name === 'parrot-product') {
    //         return 'Parrot product';
    //     }
    //     return name;
    // });

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home / </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    // const displayName = name === 'parrot-product' ? 'Collections' : name;
                    let displayName;
                    if (name === 'parrot-product') {
                        displayName = 'Collections';
                    } else if (name === 'parrot-detail') {
                        displayName = 'Details';
                    } else if (name === 'faqs') {
                        displayName = 'FAQS';
                    } else if (name === 'shopping-cart') {
                        displayName = 'Cart';
                    } else if (name === 'payment') {
                        displayName = 'Payment';
                    } else if (name === 'add-parrot-nest-service') {
                        displayName = 'Nest';
                    } else if (name === 'about-us') {
                        displayName = 'About Us';
                    } else {
                        displayName = name;
                    }

                    return isLast ? (
                        <li key={name}>{displayName} / </li>
                    ) : (
                        <li key={name}>
                            <Link to={routeTo}>{displayName} / </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Breadcrumbs;
