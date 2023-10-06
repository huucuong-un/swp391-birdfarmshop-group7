import classNames from 'classnames/bind';
import styles from '~/Components/Feedback/Feedback.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Feedback() {
    return (
        <div className={cx('wrapper')}>
            <h1>Feedback</h1>
            <div className={cx('feedback-input')}>
                <input type="text" placeholder="type your feedback..." />
                <FontAwesomeIcon icon={faArrowRight} className={cx('icon')} />
            </div>
            <div className={cx('feedback-item')}>
                <div className={cx('feedback-header')}>
                    <div className={cx('user-avatar')}>
                        <img
                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="user-avatar"
                        />
                    </div>
                    <div className={cx('feedback-header-info')}>
                        <p className={cx('feedback-header-info-name')}>nguyenthanh</p>
                        <div className={cx('parrot-star')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>
                </div>
                <div className={cx('feadback-date-and-type-container')}>
                    <div className={cx('feadback-date')}>
                        <p>2022-10-31 09:33</p>
                    </div>
                    <div className={cx('feadback-type')}>
                        <p>Green</p>
                    </div>
                </div>

                <div className={cx('feadback-content')}>
                    <p>
                        Mic lọc âm rất tốt, quay thu âm được trong khoảng cách khá xa. pin dùng được khoảng 3-4h rất
                        ok.dễ sử dụng cắm vào là dùng.shop đóng gói gửi hàng nhanh,tư vấn nhiệt tình. mọi người nên mua
                        ở shop này! cho 5 sao!
                    </p>
                </div>
            </div>
            <div className={cx('feedback-item')}>
                <div className={cx('feedback-header')}>
                    <div className={cx('user-avatar')}>
                        <img
                            src="https://images.unsplash.com/photo-1588336142586-36aff13141fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            alt="user-avatar"
                        />
                    </div>
                    <div className={cx('feedback-header-info')}>
                        <p className={cx('feedback-header-info-name')}>nguyenthanh</p>
                        <div className={cx('parrot-star')}>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                    </div>
                </div>
                <div className={cx('feadback-date-and-type-container')}>
                    <div className={cx('feadback-date')}>
                        <p>2022-10-31 09:33</p>
                    </div>
                    <div className={cx('feadback-type')}>
                        <p>Green</p>
                    </div>
                </div>

                <div className={cx('feadback-content')}>
                    <p>
                        Mic lọc âm rất tốt, quay thu âm được trong khoảng cách khá xa. pin dùng được khoảng 3-4h rất
                        ok.dễ sử dụng cắm vào là dùng.shop đóng gói gửi hàng nhanh,tư vấn nhiệt tình. mọi người nên mua
                        ở shop này! cho 5 sao!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
