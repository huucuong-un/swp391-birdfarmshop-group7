import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useState } from 'react';

const AddParrotSpecies = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [nestQuantity, setNestQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState(false);
    const [origin, setOrigin] = useState('');
    const [averageWeight, setAverageWeight] = useState(0);
    const [img, setImg] = useState('');
    const [parrotAverageRating, setParrotAverageRating] = useState(0);
    const [nestAverageRating, setNestAverageRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const postDetails = (pic) => {
        setLoading(true);
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
                    setImg(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }
    };

    const submitHandler = async () => {
        console.log('huhuhu');
        if (!name) {
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/api/parrot-species', {
                name,
                quantity,
                nestQuantity,
                description,
                availabilityStatus,
                origin,
                averageWeight,
                parrotAverageRating,
                nestAverageRating,
                img,
            });

            toast({
                title: 'Registration Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            console.log(data);

            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error occur!',
                description: error.res.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing="5px">
            <FormControl id="name" isRequired margin="8px">
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter parrot species name.." onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id="quantity" isRequired margin="8px">
                <FormLabel>Quantity</FormLabel>
                <Input placeholder="Enter quantity." onChange={(e) => setQuantity(e.target.value)} />
            </FormControl>

            <FormControl id="description" isRequired margin="8px">
                <FormLabel>Description</FormLabel>
                <Input placeholder="Enter description.." onChange={(e) => setDescription(e.target.value)} />
            </FormControl>

            <FormControl id="average-weight" isRequired margin="8px">
                <FormLabel>Average weight</FormLabel>
                <Input placeholder="Enter average weight.." onChange={(e) => setAverageWeight(e.target.value)} />
            </FormControl>

            <FormControl id="origin" isRequired margin="8px">
                <FormLabel>Origin</FormLabel>
                <Input placeholder="Enter species origin.." onChange={(e) => setOrigin(e.target.value)} />
            </FormControl>

            <FormControl id="img" isRequired margin="8px">
                <FormLabel>Upload image</FormLabel>
                <Input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                margin="8px"
                isLoading={loading}
            >
                Add
            </Button>
        </VStack>
    );
};

export default AddParrotSpecies;
