import { useState } from 'react';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import styles from '~/Components/Slider/Slider.module.scss';
import classNames from 'classnames/bind';

import sliderImg from '~/Assets/image/SelectProduct/fc1fd804573a1de7f94b49e80fb41d21.jpg';

const cx = classNames.bind(styles);

function Slider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div className={cx('wrapper')}>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img className={cx('slider-img')} src={sliderImg} alt="ronaldo" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img className={cx('slider-img')} src={sliderImg} alt="ronaldo" />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img className={cx('slider-img')} src={sliderImg} alt="ronaldo" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Slider;
