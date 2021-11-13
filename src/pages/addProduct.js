import React, {useState} from 'react';
import {Alert, Button, Form, FormControl, InputGroup} from "react-bootstrap";

const AddProduct = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const initialInfo = {
        img: '',
        title: '',
        desc:'',
        price:'',
        rating: '',
        ratingCount: ''
    };
    const [addProduct, setAddProduct] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...addProduct};
        newInfo[field]= value;
        setAddProduct(newInfo);

    }
    const handleAdminSubmit = e => {
        const product = { ...addProduct };
        fetch('http://localhost:5000/product/add', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleAdminSubmit}>

                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Image Link"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='img'
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Title"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='title'
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Description"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='desc'
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Price"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='price'
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Rating"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name='rating'
                        onBlur={handleOnBlur}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Rating Count"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onBlur={handleOnBlur}
                        name='ratingCount'
                    />
                </InputGroup>

                <Button type="submit" variant="primary">Add Product</Button>

            </form>


            {success && <Alert  variant='success'>
                Product Successfully Added!!
            </Alert>}
        </div>
    );
};

export default AddProduct;