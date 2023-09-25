import classNames from 'classnames/bind';
import styles from '~/Pages/ParrotDetail/ParrotDetail.module.scss';

import SortSpace from '~/Components/SortSpace/SortSpace';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import parrot from '~/Assets/image/SelectProduct/Grey-Parrot-PNG-Download-Image.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

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
];

function ParrotDetail() {
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityIncrease = () => {
        setQuantity((pre) => pre + 1);
    };

    const handleQuantityDecrease = () => {
        setQuantity((pre) => pre - 1);
    };
    const handleColorSelection = (color) => {
        setColor(color);
    };

    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Parrot Details</StartPartPage>
            <div className={cx('inner')}>
                <div className={cx('mini-img-container')}>
                    <img src={parrot} alt="mini-image" />
                    <img src={parrot} alt="mini-image" />
                    <img src={parrot} alt="mini-image" />
                    <img src={parrot} alt="mini-image" />
                </div>

                <div className={cx('main-img')}>
                    <img src={parrot} alt="main-picture" />
                </div>

                <div className={cx('parrot-detail-container')}>
                    <p className={cx('parrot-detail-title')}>Grey Parrot</p>
                    <div className={cx('parrot-star')}>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>

                    <div className={cx('parrot-detail-price-container')}>
                        <p className={cx('parrot-detail-price-title')}>Price</p>
                        <p className={cx('parrot-detail-price-value')}>15 000 000 VNĐ</p>
                    </div>
                    <div className={cx('choose-color')}>
                        <p className={cx('choose-color-title')}>Color</p>
                        {PARROT_ITEMS.map((parrot, index) => {
                            return (
                                <div key={index} className={cx('parrot-color')}>
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
                            );
                        })}
                    </div>
                    <div className={cx('quantity-container')}>
                        <p className={cx('quantity-title')}>Quantity</p>
                        <div className={cx('quantity-input-container')}>
                            <button className={cx('quantity-input-btn')} onClick={handleQuantityDecrease}>
                                -
                            </button>
                            <input type="number" value={quantity} min={1} />
                            <button className={cx('quantity-input-btn')} onClick={handleQuantityIncrease}>
                                +
                            </button>
                        </div>
                    </div>

                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem w={500}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" fontSize={15}>
                                        Description
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <div className={cx('active-zone')}>
                        <button>Buy</button>
                        <button>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ParrotDetail;

{
}
