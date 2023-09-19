import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from '~/Components/Post/Post.module.scss';

import Title from '~/Components/Title/Title';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <Title className={cx('title-post')}>Shopping With Fun</Title>;
            <div className="post-container row">
                <div className={cx('post-item col-4')}>
                    <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://images.alphacoders.com/522/522746.jpg"
                            alt="post1"
                        />
                    </Link>
                </div>

                <div className={cx('post-item col-4')}>
                    <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://images.alphacoders.com/522/522746.jpg"
                            alt="post1"
                        />
                    </Link>
                </div>

                <div className={cx('post-item col-4')}>
                    <Link className={cx('post-item-link')}>
                        <img
                            className={cx('post-item-img')}
                            src="https://images.alphacoders.com/522/522746.jpg"
                            alt="post1"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Post;
