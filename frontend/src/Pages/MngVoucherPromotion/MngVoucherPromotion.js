import classNames from 'classnames/bind';
import styles from '~/Pages/MngVoucherPromotion/MngVoucherPromotion.module.scss';

import { Input, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import Buttons from '~/Components/Button/Button';

const cx = classNames.bind(styles);

function MngVoucherPromotion() {
    return (
        <div className={cx('wrapper')}>
            {/* Title */}
            <div className={cx('title')}>
                <h1>Voucher & Promotion</h1>
            </div>
            {/* Sort space */}
            <div className={cx('add-btn')}>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <input type="text" placeholder="ID" />
                        <input type="text" placeholder="Code" />

                        <select name="status" id="status">
                            <option value="" disabled selected>
                                Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Create at
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Start date
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
                                <Th>ID</Th>
                                <Th>Voucher ID </Th>
                                <Th>Voucher Code</Th>
                                <Th>Description</Th>
                                <Th>Create at</Th>
                                <Th>Start date</Th>
                                <Th>End date</Th>
                                <Th>Value</Th>
                                <Th>Status</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>NHN130303</Td>
                                <Td>30%</Td>
                                <Td>13/03/2003</Td>
                                <Td>23/05/2003</Td>
                                <Td>31/11/2003</Td>
                                <Td>30%</Td>
                                <Td>Active</Td>
                                <Td className={cx('action-column')}>
                                    <Buttons add>Edit</Buttons>
                                    <Buttons add>Delete</Buttons>
                                    <Buttons add>Switch</Buttons>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>1</Td>
                                <Td>1</Td>
                                <Td>NHN130303</Td>
                                <Td>30%</Td>
                                <Td>13/03/2003</Td>
                                <Td>23/05/2003</Td>
                                <Td>31/11/2003</Td>
                                <Td>30%</Td>
                                <Td>Active</Td>
                                <Td className={cx('action-column')}>
                                    <Buttons add>Edit</Buttons>
                                    <Buttons add>Delete</Buttons>
                                    <Buttons add>Switch</Buttons>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>2</Td>
                                <Td>NHN230503</Td>
                                <Td>30%</Td>
                                <Td>13/03/2003</Td>
                                <Td>23/05/2003</Td>
                                <Td>31/11/2003</Td>
                                <Td>30%</Td>
                                <Td>Active</Td>
                                <Td className={cx('action-column')}>
                                    <Buttons add>Edit</Buttons>
                                    <Buttons add>Delete</Buttons>
                                    <Buttons add>Switch</Buttons>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default MngVoucherPromotion;
