// import 'bootstrap/dist/css/bootstrap.min.css
import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import parrot from '~/Assets/image/SelectProduct/african-grey-parrot-nature.jpg';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const PARROT_ITEMS = [
    {
        name: 'Grey Parrot',
        img: parrot,
        like: 15,
        price: '1 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },

    {
        name: 'Black Parrot',
        img: parrot,
        like: 15,
        price: '2 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Red Parrot',
        img: parrot,
        like: 15,
        price: '3 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
    {
        name: 'Pink Parrot',
        img: parrot,
        like: 15,
        price: '4 500 000 VNĐ',
        color1: '#ce2133',
        color2: '#3c65c5',
        color3: '#484848',
    },
];

function ParrotList() {
    const [color, setColor] = useState(null);

    const handleColorSelection = (color) => {
        setColor(color);
    };

    return (
        <div className={cx('wrapper')}>
            {PARROT_ITEMS.map((parrot, index) => {
                return (
                    <Link className={cx('parrot-card')} key={index}>
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
                            <div className={cx('parrot-color')}>
                                <input
                                    className={cx('parrot-color-item')}
                                    onClick={() => handleColorSelection('red')}
                                    style={{ backgroundColor: parrot.color1 }}
                                ></input>
                                <input
                                    className={cx('parrot-color-item', { green: color === 'green' })}
                                    onClick={() => handleColorSelection('green')}
                                    style={{ backgroundColor: parrot.color2 }}
                                ></input>
                                <input
                                    className={cx('parrot-color-item', { blue: color === 'blue' })}
                                    onClick={() => handleColorSelection('blue')}
                                    style={{ backgroundColor: parrot.color3 }}
                                ></input>
                            </div>
                            <input className={cx('parrot-input-quantity')} type="number" defaultValue={1} min={1} />
                            <strong className={cx('parrot-price')}>{parrot.price}</strong>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ParrotList;
