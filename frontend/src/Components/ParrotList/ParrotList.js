// import 'bootstrap/dist/css/bootstrap.min.css
import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faCashRegister } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ParrotList() {
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [combineData, setCombineData] = useState([]);
    const [selectedColor, setSelectedColor] = useState({});
    const [quantities, setQuantities] = useState({});

    const handleColorSelection = (parrotId, color, price) => {
        setSelectedColor({
            ...selectedColor,
            [parrotId]: {
                color: color,
                price: price,
            },
        });
    };

    const handleQuantityIncrease = (parrotId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [parrotId]: (prevQuantities[parrotId] || 0) + 1, // Tăng quantity cho parrot cụ thể
        }));
    };

    const handleQuantityDecrease = (parrotId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [parrotId]: Math.max((prevQuantities[parrotId] || 0) - 1, 1), // Giới hạn số lượng tối thiểu là 1
        }));
    };

    useEffect(() => {
        const getParrotsSpecies = async () => {
            try {
                const parrotSpeciesList = await ParrotSpeciesAPI.getAll();
                setParrotSpecies(parrotSpeciesList);
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm getParrots khi component được mount

        getParrotsSpecies();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = [];
            for (const item of parrotSpecies) {
                const parrot = { ...item };
                try {
                    parrot.colors = await ParrotSpeciesAPI.getListBySpeciesId(item.id);
                    data.push(parrot);
                } catch (error) {
                    console.error(error);
                }
            }

            const initialSelectedColor = {};
            data.forEach((parrot) => {
                if (parrot.colors.length > 0) {
                    initialSelectedColor[parrot.id] = {
                        color: parrot.colors[0].color,
                        price: parrot.colors[0].price,
                    };
                }
            });

            setSelectedColor(initialSelectedColor);

            const initialQuantities = {};
            data.forEach((parrot) => {
                initialQuantities[parrot.id] = 1;
            });
            setQuantities(initialQuantities);

            // Khi tất cả các Promise đã hoàn thành, combineData sẽ chứa tất cả dữ liệu đã được lưu.
            setCombineData(data);
            // console.log(combineData[1].colors[0].color);
        };

        fetchData();
    }, [parrotSpecies]);

    return (
        <div className={cx('wrapper')}>
            {combineData.map((parrot, index) => {
                return (
                    <div className={cx('parrot-card')} key={index}>
                        <div className={cx('parrot-img')}>
                            <Link to={`/parrotdetail/${parrot.id}`}>
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

                            <div className={cx('parrot-color')}>
                                {parrot.colors.map((color, colorIndex) => (
                                    <div className={cx('cuong')}>
                                        <button
                                            key={colorIndex}
                                            className={cx('parrot-color-item', {
                                                selected: color.color === selectedColor[parrot.id]?.color,
                                            })}
                                            onClick={() => handleColorSelection(parrot.id, color.color, color.price)}
                                            style={{ backgroundColor: color.color }}
                                        ></button>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('quantity-input-container')}>
                                <button
                                    className={cx('quantity-input-btn')}
                                    onClick={() => handleQuantityDecrease(parrot.id)}
                                >
                                    -
                                </button>
                                <input type="number" value={quantities[parrot.id] || 1} min={1} />
                                <button
                                    className={cx('quantity-input-btn')}
                                    onClick={() => handleQuantityIncrease(parrot.id)}
                                >
                                    +
                                </button>
                            </div>
                            <strong className={cx('parrot-price')}>
                                {/* {selectedColor[parrot.id] && selectedColor[parrot.id].price} */}$
                                {selectedColor[parrot.id]?.price}
                            </strong>
                            <div className={cx('parrot-like')}>
                                <FontAwesomeIcon className={cx('parrot-like-icon')} icon={faHeart} />
                                <p className={cx('parrot-like-quantity')}>15 reviews</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ParrotList;
