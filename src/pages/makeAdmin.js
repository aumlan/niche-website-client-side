import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import Rating from "react-rating";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";
import {faStar as fullStar} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const { statusChangeToAdmin,allUser,setallUser,allUserList } = useCart();

    // allUserList();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': '',
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.upsertedCount) {
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }

    return (
            <div>
                <h2>Make an Admin</h2>
                {/*<form onSubmit={handleAdminSubmit}>*/}

                {/*    <InputGroup className="mb-3">*/}
                {/*        <FormControl*/}
                {/*            placeholder="New Admin Email"*/}
                {/*            aria-label="Username"*/}
                {/*            aria-describedby="basic-addon1"*/}
                {/*            onBlur={handleOnBlur}*/}
                {/*        />*/}
                {/*    </InputGroup>*/}
                {/*    <Button type="submit" variant="primary">Make Admin</Button>*/}

                {/*</form>*/}

                {
                    allUser.length ?
                    allUser.map((user) => {
                        const { _id, displayName, email, role } =
                            user;

                        return (
                            <Row className="my-3" style={{ border: '1px solid #c3c3c3',
                                borderRadius: '10px'}}>
                                <Col sm={7} md={7}>
                                    <h6>Name: {displayName}</h6>
                                    <h6>Email: {email}</h6>
                                    <h6>Role: {
                                        role ? role : 'user'
                                    }</h6>
                                    {
                                        role === 'admin' ?  ''
                                            :
                                            <button
                                                onClick={() => statusChangeToAdmin(_id)}
                                                className="btn btn-primary "
                                            >
                                                Make Admin
                                            </button>
                                    }

                                </Col>
                            </Row>
                        );
                    }) : ''

                }







                {success && <Alert  variant='success'>
                    Admin Successfully Created!!
                </Alert>}


            </div>
    );
};

export default MakeAdmin;