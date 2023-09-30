import classNames from 'classnames/bind';
import styles from '~/Pages/ParrotDetail/ParrotDetail.module.scss';

import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

import { Link, useParams, useLocation } from 'react-router-dom';
import ParrotAPI from '~/Api/ParrotAPI';
import Button from '~/Components/Button/Button';

const cx = classNames.bind(styles);

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
// ];

function ParrotDetail() {
    const location = useLocation();
    const receivedData = location.state;
    console.log(receivedData);
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState(receivedData.selectedColor);
    const [selectedColorId, setSelectedColorId] = useState(receivedData.selectedColorId);
    const [quantities, setQuantities] = useState({});
    const [combineData, setCombineData] = useState([]);
    const [parrotSpecies, setParrotSpecies] = useState([]);

    const [countParrot, setCountParrot] = useState('Check the color to see ');

    const dataToPass = {
        id,
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
        // console.log('Selected colorId:', colorId);
        setSelectedColorId(colorId);
        // console.log(selectedColorId);
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
                const parrotSpeciesById = await ParrotSpeciesAPI.get(id);
                setParrotSpecies(parrotSpeciesById);
                console.log(parrotSpecies);
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

            // const initialSelectedColor = {};
            // data.forEach((parrot) => {
            //     if (parrot.colors.length > 0) {
            //         initialSelectedColor[parrot.id] = {
            //             color: parrot.colors[0].color,
            //             price: parrot.colors[0].price,
            //         };
            //     }
            // });

            // setSelectedColor(initialSelectedColor);

            const initialQuantities = {};
            data.forEach((parrot) => {
                initialQuantities[parrot.id] = 1;
            });
            setQuantities(initialQuantities);

            // Khi tất cả các Promise đã hoàn thành, combineData sẽ chứa tất cả dữ liệu đã được lưu.
            setCombineData(data);
            console.log(combineData);
            // console.log(combineData[1].colors[0].color);
        };

        fetchData();
    }, [parrotSpecies]);

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Parrot Details</StartPartPage>
            {combineData.map((parrot, index) => {
                return (
                    <div key={index} className={cx('inner')}>
                        <div className={cx('mini-img-container')}>
                            <img src={parrot} alt="mini-image" />
                            <img src={parrot} alt="mini-image" />
                            <img src={parrot} alt="mini-image" />
                            <img src={parrot} alt="mini-image" />
                        </div>

                        <div className={cx('main-img')}>
                            <img src={parrot.img} alt="main-picture" />
                        </div>

                        <div className={cx('parrot-detail-container')}>
                            <p className={cx('parrot-detail-title')}>{parrot.name}</p>
                            <div className={cx('parrot-star')}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className={cx('parrot-detail-price-container')}>
                                <p className={cx('parrot-detail-price-title')}>Price</p>
                                <p className={cx('parrot-detail-price-value')}>{selectedColor[parrot.id]?.price}</p>
                            </div>

                            <div className={cx('choose-color')}>
                                <p className={cx('choose-color-title')}>Color</p>
                                <div key={index} className={cx('parrot-color')}>
                                    {parrot.colors.map((color, colorIndex) => (
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
                                    ))}
                                </div>
                            </div>
                            <div className={cx('quantity-container')}>
                                <p className={cx('quantity-title')}>Quantity</p>
                                <div className={cx('quanity-space')}>
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

                                    <p>{countParrot} avaiable</p>
                                </div>
                            </div>
                            <Accordion defaultIndex={[0]} allowMultiple>
                                <AccordionItem w={500}>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left" fontSize={16} fontWeight={500}>
                                                Description
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>{parrot.description}</AccordionPanel>
                                </AccordionItem>
                                <AccordionItem w={500}>
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left" fontSize={16} fontWeight={500}>
                                                Shipping & Return
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        Please Note: There is no restocking fee for this item. However, customers
                                        interested in a return for a refund must pay for the return shipping costs.
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <div className={cx('active-zone')}>
                                <button>Add to cart</button>
                                {countParrot === 0 ? (
                                    <Link to={``} className={cx('buy-btn')} state={dataToPass}>
                                        Contact
                                    </Link>
                                ) : countParrot === 'Check the color to see ' ? (
                                    <Link to={``} className={cx('buy-btn')} state={dataToPass}>
                                        Please choose color
                                    </Link>
                                ) : (
                                    <Link to={`/payment`} className={cx('buy-btn')} state={dataToPass}>
                                        Buy
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ParrotDetail;
