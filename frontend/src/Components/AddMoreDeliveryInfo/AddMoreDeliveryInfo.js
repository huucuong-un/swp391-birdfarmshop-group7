import {
    Button,
    Table,
    Input,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Alert,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/Components/AddMoreDeliveryInfo/AddMoreDeliveryInfo.module.scss';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import { ShopState } from '~/context/ShopProvider';

const cx = classNames.bind(styles);

function AddMoreDeliveryInfo(props) {
    const [newDeliveryInfo, setNewDeliveryInfo] = useState({ name: '', phoneNumber: '', address: '', status: true });
    const { user } = ShopState();
    const [validate, setValidate] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const addNewDeliveryInfo = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const data = await DeliveryInformationAPI.getAll(user.id, config);
            if (
                newDeliveryInfo.name.length !== 0 &&
                newDeliveryInfo.phoneNumber.length !== 0 &&
                newDeliveryInfo.address.length !== 0 &&
                (newDeliveryInfo.name.length < 3 ||
                    newDeliveryInfo.name.length > 50 ||
                    newDeliveryInfo.phoneNumber.length < 10 ||
                    newDeliveryInfo.phoneNumber.length > 11 ||
                    newDeliveryInfo.address.length < 10 ||
                    newDeliveryInfo.address.length > 50)
            ) {
                if (
                    (newDeliveryInfo.name.length < 3 || newDeliveryInfo.name.length > 50) &&
                    (newDeliveryInfo.phoneNumber.length < 10 || newDeliveryInfo.phoneNumber.length > 11) &&
                    (newDeliveryInfo.address.length < 10 || newDeliveryInfo.address.length > 50)
                ) {
                    setValidate({
                        name: 'Name must be in 3 and 50 characters',
                        phone: 'Phone must be in 10 and 1 characters',
                        address: 'Address must be in 10 and 50 characters',
                    });
                } else if (
                    (newDeliveryInfo.name.length < 3 || newDeliveryInfo.name.length > 50) &&
                    (newDeliveryInfo.phoneNumber.length < 10 || newDeliveryInfo.phoneNumber.length > 11)
                ) {
                    setValidate({
                        name: 'Name must be in 3 and 50 characters',
                        phone: 'Phone must be in 10 and 1 characters',
                        address: '',
                    });
                } else if (
                    (newDeliveryInfo.phoneNumber.length < 10 || newDeliveryInfo.phoneNumber.length > 11) &&
                    (newDeliveryInfo.address.length < 10 || newDeliveryInfo.address.length > 50)
                ) {
                    setValidate({
                        name: '',
                        phone: 'Phone must be in 10 and 1 characters',
                        address: 'Address must be in 10 and 50 characters',
                    });
                } else if (newDeliveryInfo.name.length < 3 || newDeliveryInfo.name.length > 50) {
                    setValidate({
                        name: 'Name must be in 3 and 50 characters',
                        phone: '',
                        address: '',
                    });
                } else if (newDeliveryInfo.phoneNumber.length < 10 || newDeliveryInfo.phoneNumber.length > 11) {
                    setValidate({
                        name: '',
                        phone: 'Phone must be in 10 and 1 characters',
                        address: '',
                    });
                } else if (newDeliveryInfo.address.length < 10 || newDeliveryInfo.address.length > 50) {
                    setValidate({
                        name: '',
                        phone: '',
                        address: 'Address must be in 10 and 50 characters',
                    });
                }
                setSubmissionStatus(false);
                setLoading(false);
            }
            if (data === null || data === '' || data.length === 0) {
                const deliveryInformation = await DeliveryInformationAPI.addNewDeliveryInfo(
                    {
                        name: newDeliveryInfo.name,
                        phoneNumber: newDeliveryInfo.phoneNumber,
                        address: newDeliveryInfo.address,
                        status: newDeliveryInfo.status,
                        userId: user.id,
                        pickingStatus: true,
                    },
                    config,
                );
                setLoading(false);
                setSubmissionStatus(true);
                setNewDeliveryInfo({ name: '', phoneNumber: '', address: '', status: true });

                props.onAdd(deliveryInformation);
            } else {
                const deliveryInformation = await DeliveryInformationAPI.addNewDeliveryInfo(
                    {
                        name: newDeliveryInfo.name,
                        phoneNumber: newDeliveryInfo.phoneNumber,
                        address: newDeliveryInfo.address,
                        status: newDeliveryInfo.status,
                        userId: user.id,
                        pickingStatus: false,
                    },
                    config,
                );
                setLoading(false);
                setSubmissionStatus(true);
                setNewDeliveryInfo({ name: '', phoneNumber: '', address: '', status: true });

                props.onAdd(deliveryInformation);
            }
        } catch (error) {
            setSubmissionStatus(false);
            setLoading(false);
            console.error(error);
        }
    };

    const [submissionStatus, setSubmissionStatus] = useState();
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <div className={cx('alert-container')}>
                {(submissionStatus === true && (
                    <Alert status="success" fontSize={12}>
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Add successfully.</AlertDescription>
                    </Alert>
                )) ||
                    (submissionStatus === false && (
                        <Alert status="error" fontSize={12}>
                            <AlertIcon />
                            <AlertTitle>
                                Failed to add new delivery!! <br /> {validate.name} <br /> {validate.phone} <br />
                                {validate.address}
                            </AlertTitle>
                            <AlertDescription>Please check again!!!</AlertDescription>
                        </Alert>
                    ))}
            </div>

            <TableContainer className={cx('table-container')}>
                <Table size="xs ">
                    <Tbody>
                        <Tr>
                            <Td>Contact name</Td>
                            <Td>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newDeliveryInfo.name}
                                    onChange={(e) => setNewDeliveryInfo({ ...newDeliveryInfo, name: e.target.value })}
                                    variant="filled"
                                    placeholder="Contact name"
                                    backgroundColor={'white'}
                                    required
                                />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Phone Number</Td>
                            <Td>
                                <Input
                                    type="number"
                                    id="phone-number"
                                    name="phone-number"
                                    value={newDeliveryInfo.phoneNumber}
                                    onChange={(e) =>
                                        setNewDeliveryInfo({ ...newDeliveryInfo, phoneNumber: e.target.value })
                                    }
                                    variant="filled"
                                    placeholder="Phone number"
                                    backgroundColor={'white'}
                                    required
                                />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Address</Td>
                            <Td>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={newDeliveryInfo.address}
                                    onChange={(e) =>
                                        setNewDeliveryInfo({ ...newDeliveryInfo, address: e.target.value })
                                    }
                                    variant="filled"
                                    placeholder="Address"
                                    required
                                    backgroundColor={'white'}
                                />
                            </Td>
                        </Tr>
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Td></Td>
                            <Td className={cx('submit-btn')}>
                                <Button
                                    type="submit"
                                    className={cx('btn')}
                                    width="100%"
                                    style={{ marginTop: 15 }}
                                    margin="8px"
                                    onClick={addNewDeliveryInfo}
                                    isLoading={loading}
                                    backgroundColor={'#444'}
                                >
                                    Add
                                </Button>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AddMoreDeliveryInfo;
