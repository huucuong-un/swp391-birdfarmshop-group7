import classNames from 'classnames/bind';
import styles from '~/Components/Feedback/Feedback.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';

import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Feedback({ feedbackType }) {
    console.log(feedbackType);
    const [feedbackList, setFeedbacksList] = useState([]);
    const [count, setCount] = useState(0);
    const [combineData, setCombineData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [combineDataWithColor, setCombineDataWithColor] = useState([]);

    const [param, setParam] = useState({
        page: 1,
        limit: 6,
        speciesId: feedbackType.id,
        productType: feedbackType.type,
    });

    const StarRating = ({ rating }) => {
        const stars = [];

        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={i} />);
        }

        if (rating < 5) {
            for (let i = 0; i < 5 - rating; i++) {
                stars.push(<FontAwesomeIcon icon={regularStar} key={i} />);
            }
        }
        return stars;
    };

    useEffect(() => {
        const getFeedbackList = async () => {
            try {
                // const params = {
                //     page: 1,
                //     limit: 12,
                // };

                const feedbackListp = await FeedbackAPI.getAll(param);
                setFeedbacksList(feedbackListp.listResult);
                setTotalPage(feedbackListp.totalPage);
                console.log(feedbackListp.listResult);
            } catch (error) {
                console.error(error);
            }
        };

        // Gọi hàm getParrots khi component được mount
        getFeedbackList();
    }, [param]);
    // list feedback => luu no feedbacklist usestate => for lap cai list feedback
    useEffect(() => {
        const getUserName = async () => {
            const data = [];

            try {
                for (const items of feedbackList) {
                    const user = { ...items };
                    const userobject = await UserAPI.getUserById(items.userId);
                    user.username = userobject[0].userName;
                    user.imgUrl = userobject[0].imgUrl;
                    data.push(user);
                }
                setCombineData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserName();
    }, [feedbackList]);
    useEffect(() => {
        const getColor = async () => {
            const dataColor = [];
            try {
                for (const items of combineData) {
                    const color = { ...items };
                    const colorobject = await ParrotSpeciesColorAPI.findOneSpeciesColorById(items.colorId);
                    console.log(colorobject[0]);
                    color.color = colorobject[0].color;
                    dataColor.push(color);
                }
                console.log(dataColor);

                setCombineDataWithColor(dataColor);
            } catch (error) {}
        };
        getColor();
    }, [combineData]);

    useEffect(() => {
        console.log(combineDataWithColor);
    }, [combineDataWithColor]);

    return (
        <div className={cx('wrapper')}>
            <h1>Feedback</h1>
            <div className={cx('sort-feedback-container')}>
                <div className={cx('sort-item-container')}>
                    <div className={cx('sort-item')}>
                        <button>All</button>
                    </div>
                    <div className={cx('sort-item')}>
                        <button>
                            5 <FontAwesomeIcon icon={solidStar} />
                        </button>
                    </div>
                    <div className={cx('sort-item')}>
                        <button>
                            4 <FontAwesomeIcon icon={solidStar} />
                        </button>
                    </div>
                    <div className={cx('sort-item')}>
                        <button>
                            3 <FontAwesomeIcon icon={solidStar} />
                        </button>
                    </div>
                    <div className={cx('sort-item')}>
                        <button>
                            2 <FontAwesomeIcon icon={solidStar} />
                        </button>
                    </div>
                    <div className={cx('sort-item')}>
                        <button>
                            1 <FontAwesomeIcon icon={solidStar} />
                        </button>
                    </div>
                    <select className={cx('sort-feedback-select')}>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                    </select>
                </div>
            </div>
            {combineDataWithColor.map((feedback, index) => (
                <div className={cx('feedback-item')} key={index}>
                    <div className={cx('feedback-header')}>
                        <div className={cx('user-avatar')}>
                            <img src={feedback.imgUrl} alt="user-avatar" />
                        </div>
                        <div className={cx('feedback-header-info')}>
                            <p className={cx('feedback-header-info-name')}>{feedback.username}</p>
                            <div className={cx('parrot-star')}>
                                <StarRating rating={feedback.rating}></StarRating>
                            </div>
                        </div>
                    </div>
                    <div className={cx('feadback-date-and-type-container')}>
                        <div className={cx('feadback-date')}>
                            <p>{feedback.createdDate}</p>
                        </div>
                        <div className={cx('feadback-type')}>
                            <p>{feedback.color}</p>
                        </div>
                    </div>

                    <div className={cx('feadback-content')}>
                        <p>{feedback.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Feedback;
