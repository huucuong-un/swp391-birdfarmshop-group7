// import 'bootstrap/dist/css/bootstrap.min.css
import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import parrot from '~/Assets/image/SelectProduct/Grey-Parrot-PNG-Download-Image.png';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faCashRegister } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

const PARROT_ITEMS = () => {};
// const PARROT_ITEMS = [
//     {
//         name: 'Grey Parrot',
//         img: parrot,
//         like: 15,
//         price: '1 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },

//     {
//         name: 'Black Parrot',
//         img: parrot,
//         like: 15,
//         price: '2 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Red Parrot',
//         img: parrot,
//         like: 15,
//         price: '3 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Pink Parrot',
//         img: parrot,
//         like: 15,
//         price: '4 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Pink Parrot',
//         img: parrot,
//         like: 15,
//         price: '4 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Pink Parrot',
//         img: parrot,
//         like: 15,
//         price: '4 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Pink Parrot',
//         img: parrot,
//         like: 15,
//         price: '4 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
//     {
//         name: 'Pink Parrot',
//         img: parrot,
//         like: 15,
//         price: '4 500 000 VNĐ',
//         color1: '#ce2133',
//         color2: '#3c65c5',
//         color3: '#484848',
//     },
// ];

const parrotSpeciesURL = 'http://localhost:8086/api/parrot-species';

// Make an HTTP GET request to the API endpoint
const datas = () => {
    fetch(parrotSpeciesURL)
        .then((response) => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then((data) => {
            // Store the fetched data in a constant variable
            const parrotSpeciesData = data;

            // You can now use parrotSpeciesData as needed
            console.log(parrotSpeciesData);
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
};
console.log(datas);

function ParrotList() {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleColorSelection = (color) => {
        setColor(color);
    };

    const handleQuantityIncrease = () => {
        setQuantity((pre) => pre + 1);
    };

    const handleQuantityDecrease = () => {
        setQuantity((pre) => pre - 1);
    };

    const [parrotSpecies, setParrotSpecies] = useState([]);

    const getParrotsSpecies = async () => {
        try {
            const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
            setParrotSpecies(parrotSpeciesList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Gọi hàm getParrots khi component được mount
        getParrotsSpecies();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className="right-container"></div>
            {PARROT_ITEMS.map((parrot, index) => {
                return (
                    <Link className={cx('parrot-card')} key={index}>
                        <div className={cx('parrot-img')}>
                            <Link>
                                <img className={cx('img')} src={parrot.img} alt="parrot" />
                            </Link>
                            <Link to="/payment">
                                <FontAwesomeIcon className={cx('buy-btn')} icon={faCashRegister} />
                            </Link>
                            <Link to="">
                                <FontAwesomeIcon className={cx('cart-btn')} icon={faBagShopping} />
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
                                    key={index}
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
                            {/* <input className={cx('parrot-input-quantity')} type="number" defaultValue={1} min={1} /> */}
                            <div className={cx('quantity-input-container')}>
                                <button className={cx('quantity-input-btn')} onClick={handleQuantityDecrease}>
                                    -
                                </button>
                                <input type="number" value={quantity} min={1} />
                                <button className={cx('quantity-input-btn')} onClick={handleQuantityIncrease}>
                                    +
                                </button>
                            </div>
                            <strong className={cx('parrot-price')}>{parrot.price}</strong>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ParrotList;
