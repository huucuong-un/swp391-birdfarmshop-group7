import {
    Box,
    Container,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminRoleList.module.scss';
import RoleAPI from '~/Api/RoleAPI';

const cx = classNames.bind(styles);

const AdminRoleList = () => {
    const [roles, setRoles] = useState([]);
    const toast = useToast();
    const loadRoles = async () => {
        try {
            const data = await RoleAPI.getRoles();
            setRoles(data);
        } catch (error) {
            toast({
                title: 'Error occur!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            console.log(error);
        }
    };
    useEffect(() => {
        loadRoles();
        console.log(roles);
    }, []);

    return (
        <Container maxW="container.lg" fontSize={16}>
            <Box>
                <Text fontSize="20px" fontWeight="600" marginTop="5%">
                    ROLE MANAGEMENT
                </Text>
            </Box>

            <Flex className={cx('add-button')}>
                <FontAwesomeIcon icon={faCirclePlus} /> <Text className={cx('add-role-text')}>Add role</Text>
            </Flex>
            <TableContainer width="100%" margin="5% 0">
                <Table variant="simple" fontSize={16}>
                    <TableCaption>Role list</TableCaption>
                    <Thead fontSize={16}>
                        <Tr>
                            <Th>Role Id</Th>
                            <Th>Role Title</Th>
                            <Th>Role Description</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody fontSize={16}>
                        {roles.map((role, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{role.id}</Td>
                                    <Td>{role.name}</Td>
                                    <Td>{role.description}</Td>
                                    <Td>{role.status}</Td>
                                    <Td>Update</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminRoleList;
