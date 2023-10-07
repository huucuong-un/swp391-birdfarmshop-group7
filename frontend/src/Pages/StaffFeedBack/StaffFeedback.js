import classNames from 'classnames/bind';
import styles from '~/Pages/StaffFeedBack/StaffFeedback.module.scss';

import { Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import Buttons from '~/Components/Button/Button';
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);
function StaffFeedback() {
    //  State to set show for add btn
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    return (
        <div className={cx('wrapper')}>
            {/* Title */}
            <div className={cx('title')}>
                <h1>Feedback</h1>
            </div>
            {/* Sort space */}
            <div className={cx('add-btn')}>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <select name="species" id="species">
                            <option value="" disabled selected>
                                Species
                            </option>
                            <option value="active">Active</option>
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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </form>
                </div>
            </div>
            {/* Table */}
            <form className={cx('inner')}>
                <TableContainer>
                    <Table size="lg">
                        <Thead>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>Username</Th>
                                <Th>Content</Th>
                                <Th>Parrot species id</Th>
                                <Th>Create at</Th>
                                <Th>Rating</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>NHN</Td>
                                <Td>Con chim nay dep qua</Td>
                                <Td>Vet den</Td>
                                <Td>13/03/2003</Td>
                                <Td>10</Td>
                                <Td className={cx('action-column')}>
                                    <Buttons add>Hide</Buttons>
                                    <Buttons add>Unhide</Buttons>
                                </Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>
                            <Tr></Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default StaffFeedback;
