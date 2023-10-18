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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
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
    const [vinh, setVinh] = useState(1);

    useEffect(() => {
        const getFeedback = async () => {
            try {
                const params = {
                    page: 1,
                    limit: 10,
                };
                const feedbackList = await FeedbackAPI.getAllFeedbackSystem(params);
                console.log(feedbackList);
                setFeedbackList(feedbackList.listResult);
            } catch (error) {
                console.log(error);
            }
        };

        getFeedback();
    }, [vinh]);

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

    const changeStatus = async (id) => {
        console.log(id);
        const change = await FeedbackAPI.changeStatus(id);
        setVinh((pre) => pre + 1);
    };

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

                    <option value="active">1</option>
                    <option value="active">2</option>
                    <option value="active">3</option>
                    <option value="active">4</option>
                    <option value="active">5</option>
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
                                    <Td className={cx('feedback-content')} maxWidth={100}>
                                        {/* <Accordion defaultIndex={[0]} allowMultiple>
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex="1" textAlign="left">
                                                            Section 1 title
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>{feedback.content}</AccordionPanel>
                                            </AccordionItem>
                                        </Accordion> */}
                                        {feedback.content}
                                    </Td>
                                    <Td>{feedback.species.name}</Td>
                                    <Td>{formatDate(new Date(feedback.createdDate))}</Td>
                                    <Td>{feedback.rating}</Td>
                                    <Td>
                                        {feedback.status ? (
                                            <Switch
                                                size="lg"
                                                isChecked
                                                colorScheme="green"
                                                onChange={() => changeStatus(feedback.id)}
                                            />
                                        ) : (
                                            <Switch
                                                size="lg"
                                                colorScheme="green"
                                                onChange={() => changeStatus(feedback.id)}
                                            />
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default StaffFeedback;
