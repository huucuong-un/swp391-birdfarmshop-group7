import { Link } from 'react-router-dom';

import Title from '~/Components/Title/Title';
import { useEffect, useState } from 'react';
import PostAPI from '~/Api/PostAPI';
import { useTranslation } from 'react-i18next';

import ReactElasticCarousel from 'react-elastic-carousel';
import classNames from 'classnames/bind';
import styles from '~/Components/Post/Post.module.scss';
import { Tooltip } from '@chakra-ui/react';

const cx = classNames.bind(styles);

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
];

function Post() {
    const { t } = useTranslation();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const getPostList = PostAPI.getAllByTrueStatus();
                getPostList.then((result) => {
                    setPostList(result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        getPost();
    }, []);

    useEffect(() => {
        console.log(postList);
    }, [postList]);

    return (
        <div className={cx('wrapper')}>
            <Title className={cx('title-post')}>{t('Shopping With Fun')}</Title>
            <div className={cx('post-container')}>
                <ReactElasticCarousel breakPoints={breakPoints}>
                    {postList.map((post, index) => (
                        <div key={index} className={cx('post-item')}>
                            <div className={cx('post-inner')}>
                                <div className={cx('scheme-swirl')}></div>
                                <div className={cx('post-img')}>
                                    <img src={post.imageUrl} alt="post-background" />
                                </div>
                                <div className={cx('post-title')}>{post.title}</div>
                                <div className={cx('post-content')}>{post.description}</div>
                                <Tooltip label="Ready for surprise <3" placement="bottom" fontSize="xl">
                                    <div className={cx('shop-sale-btn')}>
                                        <Link to="/post-detail" state={post.id}>
                                            <button>View Post</button>
                                        </Link>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </ReactElasticCarousel>
                {/* <div className={cx('post-item', 'col-4')}>
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
                </div> */}
            </div>
        </div>
    );
}

export default Post;
