import { useState } from 'react';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import styles from '~/Components/Slider/Slider.module.scss';
import classNames from 'classnames/bind';

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
                    <img
                        className={cx('slider-img')}
                        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9fe65a5659ae89d5/64fde1dcefe403414d4e939c/GOAL_-_Blank_WEB_-_Facebook_-_2023-09-10T163322.289.png?auto=webp&format=pjpg&width=3840&quality=60"
                        alt="ronaldo"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className={cx('slider-img')}
                        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9fe65a5659ae89d5/64fde1dcefe403414d4e939c/GOAL_-_Blank_WEB_-_Facebook_-_2023-09-10T163322.289.png?auto=webp&format=pjpg&width=3840&quality=60"
                        alt="ronaldo"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className={cx('slider-img')}
                        src="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9fe65a5659ae89d5/64fde1dcefe403414d4e939c/GOAL_-_Blank_WEB_-_Facebook_-_2023-09-10T163322.289.png?auto=webp&format=pjpg&width=3840&quality=60"
                        alt="ronaldo"
                    />
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
