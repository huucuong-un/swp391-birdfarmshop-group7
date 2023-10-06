import classNames from 'classnames/bind';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import styles from '~/Pages/PostDetail/PostDetail.module.scss';

const cx = classNames.bind(styles);

function PostDetail() {
    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Post Details</StartPartPage>
            <div className="inner">
                <div className={cx('inner-up')}>
                    <div className={cx('post-img')}>
                        <img
                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="post-img"
                        />
                    </div>

                    <div className={cx('post-info')}>
                        <div className={cx('post-info-title')}>
                            <h1>Golden Hour</h1>
                        </div>
                        <div className={cx('post-info-content')}>
                            <p>
                                The Golden Hour at the Bird Shop is a magical and enchanting experience that unfolds
                                every evening. As the sun begins its slow descent towards the horizon, the cozy little
                                shop undergoes a stunning transformation. The soft, warm rays of the setting sun filter
                                through the large windows, casting a golden glow that bathes the entire store in a
                                radiant light.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={cx('inner-down')}>
                    <div className={cx('inner-down-title')}>
                        <h1>Latests Events</h1>
                    </div>
                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>

                    <div className={cx('post-latests-container')}>
                        <div className={cx('post-latests-img')}>
                            <img
                                src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="post-latests-img"
                            />
                        </div>
                        <div className={cx('post-latests-info')}>
                            <p className={cx('post-latests-info-title')}>Vatos Locos and Friend Friday 5.26</p>
                            <p className={cx('post-latests-info-date')}>May 19, 2021</p>
                            <div className={cx('more-btn')}>
                                <button>More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
