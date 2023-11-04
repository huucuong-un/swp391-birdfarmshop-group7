import { useEffect, useState } from 'react';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import styles from '~/Components/Slider/Slider.module.scss';
import classNames from 'classnames/bind';

import sliderImg from '~/Assets/image/SelectProduct/7447172.jpg';
import SliderAPI from '~/Api/SliderAPI';

const cx = classNames.bind(styles);

function Slider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const [sliderList, setSliderList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const sliderList = await SliderAPI.getAllWithTrueStatus();
            console.log(sliderList.listResult);
            setSliderList(sliderList.listResult);
        };

        fetchData();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img className={cx('slider-img')} src={sliderImg} alt="slider1" />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                {sliderList !== null ? (
                    sliderList.map((slider, sliderIndex) => (
                        <Carousel.Item interval={2000}>
                            <img className={cx('slider-img')} src={slider.sliderImageURL} alt={slider.sliderName} />
                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                    ))
                ) : (
                    <></>
                )}
            </Carousel>
        </div>
    );
}

export default Slider;
