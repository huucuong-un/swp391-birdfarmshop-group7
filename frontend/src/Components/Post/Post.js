import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/Components/Post/Post.module.scss';

import Title from '~/Components/Title/Title';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <Title className={cx('title-post')}>Shopping With Fun</Title>
            <div className={cx('post-container', 'row')}>
                <div className={cx('post-item', 'col-4')}>
                    {/* <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://c4.wallpaperflare.com/wallpaper/950/260/937/mickey-and-minnie-mouse-with-a-pet-pet-and-parrot-cartoon-safari-desktop-wallpaper-hd-for-mobile-phones-and-laptops-3840%C3%972160-wallpaper-preview.jpg"
                            alt="post1"
                        />
                    </Link> */}

                    <div className={cx('post-inner')}>
                        <div className={cx('scheme-swirl')}></div>
                        <div className={cx('post-img')}>
                            <img
                                src="https://www.meowingtons.com/cdn/shop/files/DSC02273_6ed7c0c1-0867-4dc8-a2dc-e15f47999142_540x.png?v=1666191045"
                                alt="post-background"
                            />
                        </div>
                        <div className={cx('post-title')}>$100 OFF Jungle Gym Cat Tree</div>
                        <div className={cx('post-content')}>
                            Our lowest price ever for the ultimate multi-station cat tree - no promo code needed.
                        </div>
                        <div className={cx('shop-sale-btn')}>
                            <button>Shop sale</button>
                        </div>
                    </div>
                </div>

                <div className={cx('post-item', 'col-4')}>
                    {/* <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://c4.wallpaperflare.com/wallpaper/950/260/937/mickey-and-minnie-mouse-with-a-pet-pet-and-parrot-cartoon-safari-desktop-wallpaper-hd-for-mobile-phones-and-laptops-3840%C3%972160-wallpaper-preview.jpg"
                            alt="post1"
                        />
                    </Link> */}

                    <div className={cx('post-inner')}>
                        <div className={cx('scheme-swirl')}></div>
                        <div className={cx('post-img')}>
                            <img
                                src="https://www.meowingtons.com/cdn/shop/files/DSC02273_6ed7c0c1-0867-4dc8-a2dc-e15f47999142_540x.png?v=1666191045"
                                alt="post-background"
                            />
                        </div>
                        <div className={cx('post-title')}>$100 OFF Jungle Gym Cat Tree</div>
                        <div className={cx('post-content')}>
                            Our lowest price ever for the ultimate multi-station cat tree - no promo code needed.
                        </div>
                        <div className={cx('shop-sale-btn')}>
                            <button>Shop sale</button>
                        </div>
                    </div>
                </div>
                <div className={cx('post-item', 'col-4')}>
                    {/* <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://c4.wallpaperflare.com/wallpaper/950/260/937/mickey-and-minnie-mouse-with-a-pet-pet-and-parrot-cartoon-safari-desktop-wallpaper-hd-for-mobile-phones-and-laptops-3840%C3%972160-wallpaper-preview.jpg"
                            alt="post1"
                        />
                    </Link> */}

                    <div className={cx('post-inner')}>
                        <div className={cx('scheme-swirl')}></div>
                        <div className={cx('post-img')}>
                            <img
                                src="https://www.meowingtons.com/cdn/shop/files/DSC02273_6ed7c0c1-0867-4dc8-a2dc-e15f47999142_540x.png?v=1666191045"
                                alt="post-background"
                            />
                        </div>
                        <div className={cx('post-title')}>$100 OFF Jungle Gym Cat Tree</div>
                        <div className={cx('post-content')}>
                            Our lowest price ever for the ultimate multi-station cat tree - no promo code needed.
                        </div>
                        <div className={cx('shop-sale-btn')}>
                            <button>Shop sale</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
