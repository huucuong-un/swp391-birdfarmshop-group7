import styles from '~/Components/ChooseProduct/ChooseProduct.module.scss';
import classNames from 'classnames/bind';
import Title from '~/Components/Title/Title';
import parrot1 from '~/Assets/image/SelectProduct/Grey-Parrot-PNG-Download-Image.png';
// import parrot2 from '~/Assets/image/SelectProduct/Grey-Parrot-PNG-Free-Download.png';
import nest from '~/Assets/image/SelectProduct/nest.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ChooseProduct() {
    return (
        <div className={cx('wrapper')}>
            <Title>Parrot Or Nest</Title>
            <div className="container">
                <div className={cx('product-hover-effect-container')}>
                    <Link className={cx('item-parrot')} to="/nest">
                        <img className={cx('nest-img')} src={nest} />
                    </Link>

                    <Link className={cx('item')} to="/parrotProduct">
                        <img className={cx('parrot-img')} src={parrot1} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ChooseProduct;
