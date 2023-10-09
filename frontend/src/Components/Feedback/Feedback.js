import classNames from 'classnames/bind';
import styles from '~/Components/Feedback/Feedback.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import FeedbackAPI from '~/Api/FeedbackAPI';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Feedback({ feedbackType }) {
    console.log(feedbackType);
    const [feedbackList, setFeedbacksList] = useState([]);
    const [count, setCount] = useState(0);

    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    const [param, setParam] = useState({
        page: 1,
        limit: 6,
        speciesId: feedbackType.id,
        productType: feedbackType.type,
    });

    useEffect(() => {
        const getFeedbackList = async () => {
            try {
                // const params = {
                //     page: 1,
                //     limit: 12,
                // };
                const feedbackList = await FeedbackAPI.getAll(param);
                setFeedbacksList(feedbackList.listResult);
                setTotalPage(feedbackList.totalPage);
                console.log(feedbackList);
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm getParrots khi component được mount
        getFeedbackList();
    }, [param]);

    return (
        <div className={cx('wrapper')}>
            <h1>Feedback</h1>
            <div className={cx('feedback-input')}>
                <input type="text" placeholder="type your feedback..." />
                <FontAwesomeIcon icon={faArrowRight} className={cx('icon')} />
            </div>
            {feedbackList.map((feedback, index) => (
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
                            <p>feadback.createdDate</p>
                        </div>
                        <div className={cx('feadback-type')}>
                            <p>Green</p>
                        </div>
                    </div>

                    <div className={cx('feadback-content')}>
                        <p>feadback.content</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Feedback;
