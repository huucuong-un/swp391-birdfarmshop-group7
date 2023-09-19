import Slider from '~/Components/Slider/Slider';
import ChooseProduct from '~/Components/ChooseProduct/ChooseProduct';
import styles from '~/Pages/HomePage/HomePage.module.scss';
import classNames from 'classnames/bind';
import Post from '~/Components/Post/Post';

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div className={cx('wrapper')}>
            <Slider></Slider>
            <ChooseProduct></ChooseProduct>
            <Post></Post>
        </div>
    );
}

export default HomePage;
