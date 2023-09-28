import { Table, Box, Center, Flex, Radio, Square, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DeliveryInformationAPI from '~/Api/DeliveryInformationAPI';
import classNames from 'classnames/bind';
import styles from '~/Pages/DeliveryInformation/DeliveryInformation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import Title from '~/Components/Title/Title';
import AddMoreDeliveryInfo from '~/Components/AddMoreDeliveryInfo/AddMoreDeliveryInfo';

const cx = classNames.bind(styles);

const DeliveryInformation = (customerid) => {
    const [deliveryInfo, setDeliveryInfo] = useState([]);
    const [selectedDeliveryId, setSelectedDeliveryId] = useState();
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const handleShowUpdate = () => {
        setShowUpdate(!showUpdate);
    };

    useEffect(() => {
        const getAllDeliveryInfoByCustomerId = async () => {
            try {
                const data = await DeliveryInformationAPI.getAll(1);
                setDeliveryInfo(data);
                setSelectedDeliveryId(data[0].id);
            } catch (error) {
                console.error(error);
            }
        };
        getAllDeliveryInfoByCustomerId();
    }, []);

    return (
        <Box className={cx('wrapper')}>
            <FontAwesomeIcon onClick={handleShow} icon={faCirclePlus} size="2xl" className={cx('add-button')} />
            <div className={cx('fade-container', { show: show })}>
                {show && <AddMoreDeliveryInfo w={100}></AddMoreDeliveryInfo>}
            </div>
            {deliveryInfo.map((item, itemIndex) => (
                <>
                    <Box className={cx('delivery-info-item-container')}>
                        <Flex className={cx('delivery-info-item')} key={item.id}>
                            <Center w="100px">
                                <Text fontWeight="700" opacity={0.6}>
                                    {item.name}
                                </Text>
                            </Center>
                            <Square size="150px">
                                <Text>{item.phoneNumber}</Text>
                            </Square>
                            <Center flex="1">
                                <Text>{item.address}</Text>
                            </Center>

                            <Radio
                                name="delivery-info-item-radio"
                                backgroundColor="white"
                                size="lg"
                                colorScheme="orange"
                                value={item.id}
                                isChecked={selectedDeliveryId === item.id}
                                onChange={() => setSelectedDeliveryId(item.id)}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'center'}
                                p={5}
                            />
                            <Text
                                color="#f57c7c"
                                fontWeight={500}
                                marginTop={3}
                                onClick={handleShowUpdate}
                                cursor={'pointer'}
                            >
                                Edit
                            </Text>
                        </Flex>
                        <div className={cx('fade-container', { showUpdate: showUpdate })}>
                            {showUpdate && <AddMoreDeliveryInfo w={100}></AddMoreDeliveryInfo>}
                        </div>
                    </Box>
                </>
            ))}
        </Box>
    );
};

export default DeliveryInformation;
