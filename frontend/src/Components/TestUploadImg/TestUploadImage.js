import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Test = () => {
    const toast = useToast();

    const postDetails = (pic) => {
        if (pic === undefined) {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'parrotfarmshop');
            data.append('cloud_name', 'dkddhxz2g');
            fetch('https://api.cloudinary.com/v1_1/dkddhxz2g/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            return;
        }
    };
    return (
        <VStack spacing="5px">
            <FormControl id="pic">
                <FormLabel>Upload avatar</FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>
            <Button onClick={console.log('hihi')}>Sign Up</Button>
        </VStack>
    );
};
export default Test;
