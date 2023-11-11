import styles from '~/Components/ChooseProduct/ChooseProduct.module.scss';
import classNames from 'classnames/bind';
import Title from '~/Components/Title/Title';
import parrot1 from '~/Assets/image/SelectProduct/pngegg.png';
import birdHouse from '~/Assets/image/HomePage/Bird-house.png';
import nest from '~/Assets/image/SelectProduct/nestreal.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function ChooseProduct() {
    return (
        <div className={cx('wrapper')}>
            <Title>Parrots</Title>
            <div className="container">
                <div className={cx('product-hover-effect-container')}>
                    <Tooltip label="Love zone!!!" placement="left" fontSize="xl">
                        <Link className={cx('item')} to="/nest">
                            <img className={cx('nest-img')} src={birdHouse} />
                        </Link>
                    </Tooltip>
                    <Tooltip label="Shopping time!!!" placement="right" fontSize="xl">
                        <Link className={cx('item')} to="/parrot-product">
                            <img className={cx('parrot-img')} src={parrot1} />
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default ChooseProduct;
