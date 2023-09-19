// import 'bootstrap/dist/css/bootstrap.min.css
import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import parrot from '~/Assets/image/SelectProduct/african-grey-parrot-nature.jpg';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const PARROT_ITEMS = [
    {
        name: 'Grey Parrot',
        img: parrot,
        like: 15,
        price: '1 500 000 VNĐ',
    },
    {
        name: 'Black Parrot',
        img: parrot,
        like: 15,
        price: '2 500 000 VNĐ',
    },
    {
        name: 'Red Parrot',
        img: parrot,
        like: 15,
        price: '3 500 000 VNĐ',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
    },
];

function ParrotList() {
    return (
        <div className={cx('wrapper')}>
            {PARROT_ITEMS.map((parrot, index) => {
                return (
                    <div className={cx('parrot-card')}>
                        <div className={cx('parrot-img')}>
                            <Link>
                                <img src={parrot.img} alt="parrot" />
                            </Link>
                        </div>

                        <div className={cx('parrot-info')}>
                            <p className={cx('parrot-name')}>{parrot.name}</p>
                            <div className={cx('parrot-like')}>
                                <FontAwesomeIcon className={cx('parrot-like-icon')} icon={faHeart} />
                                <p className={cx('parrot-like-quantity')}>15K</p>
                            </div>
                            <input className={cx('parrot-input-quantity')} type="number" defaultValue={1} />
                            <strong>{parrot.price}</strong>
                        </div>
                        <div className={cx('parrot-active')}>
                            <Link to="/payment">Buy</Link>
                            <Link to="/cart">Add To Cart</Link>
                            {/* <FontAwesomeIcon className={cx('parrot-cart-icon')} icon={faBagShopping} /> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ParrotList;
