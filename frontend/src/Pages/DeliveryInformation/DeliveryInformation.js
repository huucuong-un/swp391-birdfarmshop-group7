import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Table,
    Box,
    Center,
    Flex,
    Radio,
    Square,
    Text,
    textDecoration,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import classNames from 'classnames/bind';
import styles from '~/Pages/DeliveryInformation/DeliveryInformation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AddMoreDeliveryInfo from '~/Components/AddMoreDeliveryInfo/AddMoreDeliveryInfo';
import UpdateDeliveryInfo from '~/Components/UpdateDeliveryInfo/UpdateDeliveryInfo';
import { ShopState } from '~/context/ShopProvider';
import { TabContainer } from 'react-bootstrap';

const cx = classNames.bind(styles);

const DeliveryInformation = ({ selectedDelivery, setSelectedDelivery }) => {
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState();
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(Array(deliveryInfo.length).fill(false)); // Initialize with false for each item
    const { user } = ShopState();
    const [reloadStatus, setReloadStatus] = useState(true);
    const [showForUpdate, setShowForUpdate] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState();

    const handleShow = () => {
        setShow(!show);
    };

    const handleChangePickingStatus = async (delivery) => {
        const updateDeli = await DeliveryInformationAPI.updatePickingStatus(delivery);
        setSelectedDelivery(delivery);
        setReloadStatus(true);
    };

    const handleShowUpdate = (index) => {
        const updatedShowUpdate = [...showUpdate]; // Create a copy of showUpdate array
        updatedShowUpdate[index] = !updatedShowUpdate[index]; // Toggle the value
        setItemForUpdate(deliveryInfo[index]);
        setShowForUpdate(true);
        setShowUpdate(updatedShowUpdate); // Update the state
    };

    const handleUpdate = (updatedInfo) => {
        // Find the index of the updated item in the deliveryInfo array
        const index = deliveryInfo.findIndex((item) => item.id === updatedInfo.id);

        // Create a copy of the deliveryInfo array
        const updatedDeliveryInfo = [...deliveryInfo];

        // Update the item with the new data
        updatedDeliveryInfo[index] = updatedInfo;

        // Update the state
        setDeliveryInfo(updatedDeliveryInfo);
    };

    const handleAdd = (newInfo) => {
        try {
            const updatedDeliveryInfo = [...deliveryInfo];

            // Add the new info to the array
            updatedDeliveryInfo.push(newInfo);

            // Update the state
            setDeliveryInfo(updatedDeliveryInfo);
            if (deliveryInfo.length === 1) {
                setSelectedDeliveryId(deliveryInfo[0].id);
                selectedDelivery(deliveryInfo[0]);
                setSelectedDelivery(deliveryInfo[0]);
            }
        } catch (error) {}
        // Create a copy of the deliveryInfo array
    };

    // Load initial state from localStorage or use an empty array if no data is saved
    useEffect(() => {
        const getAllDeliveryInfoByCustomerId = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const data = await DeliveryInformationAPI.getAll(user.id, config);

                const nowDeliInfo = await DeliveryInformationAPI.getDeliveryInfoWithTruePickingStatusByCustomerId(
                    user.id,
                    config,
                );
                setDeliveryInfo(data);

                var index = 0;
                for (const deliInfo of data) {
                    if (deliInfo.id === nowDeliInfo.id) break;
                    index++;
                }
                setSelectedDeliveryId(data[index].id);
                setSelectedDelivery(data[index]);

                // console.log(data[index].id);
            } catch (error) {
                console.error(error);
            }
        };
        if (reloadStatus) {
            getAllDeliveryInfoByCustomerId();
            setReloadStatus(false);
        }
        getAllDeliveryInfoByCustomerId();
    }, [reloadStatus || user]);

    return (
        <Box className={cx('wrapper')}>
            <TabContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th backgroundColor="white">Receiver</Th>
                            <Th backgroundColor="white">Phone</Th>
                            <Th backgroundColor="white">Address</Th>
                            <Th backgroundColor="white">Choose</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {deliveryInfo.map((item, itemIndex) => (
                            <Tr>
                                <Td>{item.name}</Td>
                                <Td padding={5}>{item.phoneNumber}</Td>
                                <Td>
                                    <Text padding={5}>{item.address}</Text>
                                </Td>
                                <Td>
                                    <Radio
                                        name="delivery-info-item-radio"
                                        backgroundColor="white"
                                        size="lg"
                                        colorScheme="gray"
                                        value={item.id}
                                        // isChecked={selectedDeliveryId === item.id}
                                        isChecked={item.pickingStatus}
                                        onChange={() => {
                                            setSelectedDeliveryId(item.id);
                                            setSelectedDelivery(item);
                                            handleChangePickingStatus(item);
                                            // handleRedirectToPayment(); // Redirect to Payment
                                        }}
                                        display="flex"
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        p={5}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TabContainer>

            {/* <Flex
                        className={cx('delivery-info-item')}
                        id={item.id}
                        onClick={() => handleShowUpdate(itemIndex)}
                        key={itemIndex}
                    >
                        <Center w="100px">
                            <Text fontWeight="700" opacity={0.6}>
                                {item.name}
                            </Text>
                        </Center>
                        <Square size="100px">
                            <Text>{item.phoneNumber}</Text>
                        </Square>
                        <Center flex="1">
                            <Text>{item.address}</Text>
                        </Center>

                        <Radio
                            name="delivery-info-item-radio"
                            backgroundColor="white"
                            size="lg"
                            colorScheme="gray"
                            value={item.id}
                            // isChecked={selectedDeliveryId === item.id}
                            isChecked={item.pickingStatus}
                            onChange={() => {
                                setSelectedDeliveryId(item.id);
                                setSelectedDelivery(item);
                                handleChangePickingStatus(item);
                                // handleRedirectToPayment(); // Redirect to Payment
                            }}
                            display="flex"
                            justifyContent={'center'}
                            alignItems={'center'}
                            p={5}
                        />
 <div className={cx('fade-container')}>
                        <UpdateDeliveryInfo deliveryInfo={itemForUpdate} onUpdate={handleUpdate} w={100} />
                    </div>
                        <Text onClick={() => handleShowUpdate(itemIndex)} className={cx('edit-button')}>
                            Edit
                        </Text>
                    </Flex> */}
            <div className={cx('information')}>
                <FontAwesomeIcon onClick={handleShow} icon={faCirclePlus} size="xl" className={cx('add-button')} />
                <Text onClick={handleShow} className={cx('add-button-text')}>
                    Add new contact
                </Text>
            </div>
            <div className={cx('fade-container', { show: show })}>
                {show && <AddMoreDeliveryInfo onAdd={handleAdd} w={100}></AddMoreDeliveryInfo>}
            </div>
        </Box>
    );
};

export default DeliveryInformation;
