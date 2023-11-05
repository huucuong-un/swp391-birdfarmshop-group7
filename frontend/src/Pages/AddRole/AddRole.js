import {
    Table,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Switch,
    Input,
    Thead,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Text,
} from '@chakra-ui/react';
import classNames from 'classnames/bind';
import styles from '~/Pages/AddRole/AddRole.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RoleAPI from '~/Api/RoleAPI';
const cx = classNames.bind(styles);
function AddRole(props) {
    const [submissionStatus, setSubmissionStatus] = useState();
    const [role, setRole] = useState({
        name: '',
        description: '',
        status: false,
    });

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState(false);

    const handleStatus = () => {
        setStatus(!status);
    };

    const [validate, setValidate] = useState({
        name: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the first API endpoint
            if (role.description.length < 10) window.alert('Can not add!! Description must be in range 10..100');
            else if (
                (role.name.length !== 0 && role.description.length !== 0 && role.name.length < 2) ||
                role.name.length > 20 ||
                role.description.length < 10 ||
                role.description.length > 100
            ) {
                if (
                    (role.name.length < 2 || role.name.length > 20) &&
                    (role.description.length < 10 || role.description.length > 100)
                ) {
                    setValidate({
                        name: 'Name must be in 2 and 20 character',
                        description: 'Description must be in 10 and 100 character',
                    });
                } else if (role.name.length < 2 || role.name.length > 20) {
                    setValidate({
                        name: 'Name must be in 2 and 20 character',
                        description: '',
                    });
                } else if (role.description.length < 10 || role.description.length > 100) {
                    setValidate({
                        name: '',
                        description: 'Description must be in 10 and 100 character',
                    });
                }
                setSubmissionStatus(false);
                setTimeout(() => {
                    setSubmissionStatus();
                }, 5000);
            } else {
                // Make a POST request to the first API endpoint
                const responseParrots = await RoleAPI.addRole({
                    // Add other fields you want to send to the first API
                    name: role.name,
                    description: role.description,
                    status: status,
                });
                props.onAdd(responseParrots);
                if (responseParrots.status === 200) {
                    console.log('POST request was successful at ROLE!!');
                } else {
                    console.error('POST request failed with status code - ROLE: ', responseParrots.status);
                }

                setSubmissionStatus(true);

                setTimeout(() => {
                    setSubmissionStatus();
                }, 5000);
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmissionStatus(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} className={cx('inner')}>
                {(submissionStatus === true && (
                    <Alert status="success">
                        <AlertIcon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Your form has been submitted successfully.</AlertDescription>
                    </Alert>
                )) ||
                    (submissionStatus === false && (
                        <Alert status="error">
                            <AlertIcon />
                            <br />
                            <AlertTitle>
                                <Text fontSize="sm" lineHeight="1.4">
                                    {validate.name}
                                    <br />
                                    {validate.description}
                                </Text>
                            </AlertTitle>
                        </Alert>
                    ))}
                <TableContainer className={cx('table-container')}>
                    <Table variant="simple" size="lg">
                        <Thead>
                            <Tr>
                                <Th fontSize={16} colSpan={2}>
                                    Add Role
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr height="40px">
                                <Td fontSize={16}>Role name</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="name"
                                        name="name"
                                        variant="filled"
                                        placeholder="Name"
                                        value={role.name}
                                        onChange={(e) => setRole({ ...role, name: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>

                            <Tr height="40px">
                                <Td fontSize={16}>Description</Td>
                                <Td>
                                    <Input
                                        fontSize={16}
                                        type="text"
                                        id="description"
                                        name="description"
                                        variant="filled"
                                        placeholder="Description"
                                        value={role.description}
                                        onChange={(e) => setRole({ ...role, description: e.target.value })}
                                        required
                                    />
                                </Td>
                            </Tr>
                            <Tr>
                                <Td fontSize={16}>Status</Td>
                                <Td>
                                    <div className={cx('haha')}>
                                        <Switch onChange={handleStatus} size="lg" isChecked={status} />
                                        {status ? (
                                            <Text fontSize={16} margin={0} overflow="hidden" height={6}>
                                                On Processing
                                            </Text>
                                        ) : (
                                            <Text fontSize={16} margin={0} overflow="hidden" height={6}>
                                                Disabled
                                            </Text>
                                        )}
                                    </div>
                                    <Input
                                        type="hidden"
                                        id="status"
                                        name="status"
                                        variant="filled"
                                        value={status}
                                        onChange={(e) => setRole({ ...role, status: e.target.value })}
                                    />
                                </Td>
                            </Tr>
                        </Tbody>

                        <Tfoot>
                            <Tr>
                                <Td></Td>
                                <Td className={cx('submit-btn')}>
                                    <Button
                                        fontSize={16}
                                        type="submit"
                                        className={cx('btn')}
                                        width="100%"
                                        style={{ marginTop: 15 }}
                                        margin="8px"
                                        paddingTop={8}
                                        paddingBottom={8}
                                    >
                                        ADD
                                    </Button>
                                </Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </form>
        </div>
    );
}

export default AddRole;
