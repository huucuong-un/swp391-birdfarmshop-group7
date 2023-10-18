import {
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Switch,
} from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from '~/Pages/StaffFeedBack/StaffFeedback.module.scss';

import React, { useState, useEffect } from 'react';
import FeedbackAPI from '~/Api/FeedbackAPI';
import UserAPI from '~/Api/UserAPI';
import ParrotSpeciesColorAPI from '~/Api/ParrotSpeciesColorAPI';

const cx = classNames.bind(styles);
function StaffFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const [combineData, setCombineData] = useState([]);

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const feedbackList = await FeedbackAPI.getAllFeedbackSystem();
                setFeedbackList(feedbackList);
            } catch (error) {
                console.log(error);
            }
        };

        getFeedback();
    }, []);

    useEffect(() => {
        const getUserbyId = async () => {
            const data = [];
            for (const item of feedbackList) {
                const feedback = { ...item };
                try {
                    feedback.userInfor = await UserAPI.getUserById(item.userId);
                    feedback.species = await ParrotSpeciesColorAPI.findOneSpeciesByColorId(item.colorId);
                    data.push(feedback);
                } catch (error) {
                    console.error(error);
                }
            }
            setCombineData(data);
        };
        getUserbyId();
    }, [feedbackList]);

    useEffect(() => {
        console.log(combineData);
    }, [combineData]);

    useEffect(() => {
        console.log(feedbackList);
    }, [feedbackList]);

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    return (
        <Container className={cx('wrapper')} maxW="container.xl">
            <div className={cx('title')}>
                <h1>Feedback</h1>
            </div>
            <div className={cx('sort-space')}>
                <select name="status" id="status">
                    <option value="" disabled selected>
                        Rating
                    </option>
                    <option value="active">1 star</option>
                    <option value="inactive">Inactive</option>
                </select>

                <select name="status" id="status">
                    <option value="" disabled selected>
                        Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <input type="date" />
                <select name="price" id="price">
                    <option value="" disabled selected>
                        Price
                    </option>
                </select>

                <button></button>
            </div>
            <TableContainer>
                <Table size="lg">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Content</Th>
                            <Th>Species</Th>
                            <Th>Create At</Th>
                            <Th>Rating</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {combineData &&
                            combineData.map((feedback, index) => (
                                <Tr key={index}>
                                    <Td>{feedback.id}</Td>
                                    <Td>{feedback.userInfor.fullName}</Td>
                                    <Td>{feedback.content}</Td>
                                    <Td>{feedback.species.name}</Td>
                                    <Td>{formatDate(new Date(feedback.createdDate))}</Td>
                                    <Td>{feedback.rating}</Td>
                                    {/* <Td>{feedback.status ? <Switch size="lg" isChecked /> : <Switch size="lg" />}</Td> */}
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default StaffFeedback;
