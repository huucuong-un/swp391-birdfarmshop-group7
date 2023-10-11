import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/Components/Post/Post.module.scss';

import Title from '~/Components/Title/Title';
import { useEffect, useState } from 'react';
import PostAPI from '~/Api/PostAPI';

const cx = classNames.bind(styles);

function Post() {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            try {
                const getPostList = PostAPI.getAll();
                getPostList.then((result) => {
                    setPostList(result.listResult);
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
            <Title className={cx('title-post')}>Shopping With Fun</Title>
            <div className={cx('post-container', 'row')}>
                {postList.map((post, index) => (
                    <div key={index} className={cx('post-item', 'col-4')}>
                        <div className={cx('post-inner')}>
                            <div className={cx('scheme-swirl')}></div>
                            <div className={cx('post-img')}>
                                <img
                                    src="https://www.meowingtons.com/cdn/shop/files/DSC02273_6ed7c0c1-0867-4dc8-a2dc-e15f47999142_540x.png?v=1666191045"
                                    alt="post-background"
                                />
                            </div>
                            <div className={cx('post-title')}>{post.title}</div>
                            <div className={cx('post-content')}>{post.description}</div>
                            <div className={cx('shop-sale-btn')}>
                                <Link to="/post-detail" state={post.id}>
                                    <button>Shop sale</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
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
