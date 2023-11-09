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
import styles from '~/Components/UpdateDeliveryInfo/UpdateDeliveryInfo.module.scss';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import { ShopState } from '~/context/ShopProvider';

const cx = classNames.bind(styles);

function UpdateDeliveryInfo(props) {
    const [newDeliveryInfo, setNewDeliveryInfo] = useState(props.deliveryInfo);
    console.log(newDeliveryInfo);
    const { user } = ShopState();
    const [validate, setValidate] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const updateDeliveryInfo = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (
                newDeliveryInfo.name.length === 0 ||
                newDeliveryInfo.phoneNumber.length === 0 ||
                newDeliveryInfo.address.length === 0 ||
                newDeliveryInfo.name.length < 3 ||
                newDeliveryInfo.name.length > 50 ||
                newDeliveryInfo.phoneNumber.length < 10 ||
                newDeliveryInfo.phoneNumber.length > 11 ||
                newDeliveryInfo.address.length < 10 ||
                newDeliveryInfo.address.length > 200
            ) {
                window.alert(
                    'Name must contain 3..50 characters. \n Phone must contain 10..11 digits \n Address length must be in range 10..200 characters',
                );
                setLoading(false);
                setSubmissionStatus(false);
            } else {
                const updatedInfo = await DeliveryInformationAPI.updateDeliveryInfo(
                    {
                        id: newDeliveryInfo.id,
                        name: newDeliveryInfo.name,
                        phoneNumber: newDeliveryInfo.phoneNumber,
                        address: newDeliveryInfo.address,
                        status: newDeliveryInfo.status,
                        userId: user.id,
                        pickingStatus: newDeliveryInfo.pickingStatus,
                    },
                    config,
                );
                setLoading(false);
                setSubmissionStatus(true);

                props.onUpdate(updatedInfo);
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
                                    onClick={() => {
                                        updateDeliveryInfo();
                                        // window.location.reload();
                                    }}
                                    isLoading={loading}
                                    backgroundColor={'#444'}
                                >
                                    Save Change
                                </Button>
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UpdateDeliveryInfo;
