// import 'bootstrap/dist/css/bootstrap.min.css
import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faCashRegister } from '@fortawesome/free-solid-svg-icons';

import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

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
    const [parrotSpecies, setParrotSpecies] = useState([]);

    const [combineData, setCombineData] = useState([]);
    const [selectedColor, setSelectedColor] = useState({});
    const [quantities, setQuantities] = useState({});
    const [countParrot, setCountParrot] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState({});

    const dataToPass = {
        selectedColor,
        quantities,
        combineData,
    };

    const handleColorSelection = async (parrotId, color, price, colorId) => {
        setSelectedColor({
            ...selectedColor,
            [parrotId]: {
                color: color,
                price: price,
                colorId: colorId,
            },
        });
        setSelectedColorId(colorId);
    };

    const handleQuantityIncrease = (parrotId) => {
        if (quantities[parrotId] < countParrot) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [parrotId]: (prevQuantities[parrotId] || 0) + 1, // Tăng quantity cho parrot cụ thể
            }));
        }
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
        const getCountAvailableParrotId = async () => {
            try {
                const availableParrot = await ParrotAPI.countAvailableParrotId(selectedColorId);
                setCountParrot(availableParrot);
            } catch (error) {
                console.error(error);
            }
        };

        getCountAvailableParrotId();
    }, [selectedColorId]);

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
                            <Link to="/payment" state={dataToPass}>
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
                                            onClick={() =>
                                                handleColorSelection(parrot.id, color.color, color.price, color.id)
                                            }
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
                                <p>{countParrot} avaiable</p>
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
