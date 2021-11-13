import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import Rating from "react-rating";
import useAuth from "../hooks/useAuth.js";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Profile from "./Profile";
import MyOrder from "./MyOrder";
import Services from "./../pages/Services";
import useCourses from "../hooks/useCourses";
import MakeAdmin from "./makeAdmin";
import AddProduct from "./addProduct";


const AdminPanel = () => {
    const { selectedCourse, remove, setSelectedCourse, AllContexts,statusChange } = useAuth();
    const { courses,totalPage, currentPage, setCurrentPage } = useCourses();
    const { user, logout } = AllContexts;
    const { uid } = user;
    const [allCourses, setAllCourses] = useState([]);

    useEffect(() => {
        fetch(
            "http://localhost:5000/products"
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setAllCourses(data);
                console.log(allCourses);

            });
    }, [allCourses]);

    function removeProduct(id) {
        console.log('remove called');
        fetch(`http://localhost:5000/product/delete/${id}`, {
            method: "delete",
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.deletedCount === 1) {
                    const selectAfterRemove = allCourses.filter(
                        (course) => course._id !== id
                    );
                    setAllCourses(selectAfterRemove);
                    console.log(courses);
                } else {
                    console.log(data);
                    alert("something went wrong!!");
                }
            });
    }

    function pageHandler(number) {
        setCurrentPage(number);
    }


    useEffect(() => {
        fetch("http://localhost:5000/order-list")
            .then((res) => res.json())
            .then((data) => {
                if (data.length) {
                    setSelectedCourse(data);
                }
            });
    }, []);



    const history = useHistory();
    const totalPrice = selectedCourse.reduce(
        (total, course) => total + course.price,
        0
    );

    return (
        <div className="my-4">

            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Manage All Orders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Add A Product</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Make Admin</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fourth">Manage Products</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="five" onClick={logout}>
                                        Sign Out
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {selectedCourse.length ? (
                                        <Row>

                                            <Col className="" md={9}>
                                                {selectedCourse.map((course) => {
                                                    const { _id,img, title, desc, rating, ratingCount, price, status } =
                                                        course;

                                                    return (
                                                        <Row className="my-3" key={_id} style={{ border: '1px solid #c3c3c3',
                                                            borderRadius: '10px'}}>
                                                            <Col sm={5}>
                                                                <img className="img-fluid" src={img} alt="" />
                                                            </Col>
                                                            <Col sm={7} md={7}>
                                                                <h5>{title}</h5>
                                                                <h4>Price: {price}</h4>
                                                                <Row>
                                                                    <Col sm={4} lg={12}>
                                                                        <Col>
                                                                            <Rating
                                                                                initialRating={rating}
                                                                                readonly
                                                                                emptySymbol={
                                                                                    <FontAwesomeIcon
                                                                                        className="text-warning"
                                                                                        icon={emptyStar}
                                                                                    />
                                                                                }
                                                                                fullSymbol={
                                                                                    <FontAwesomeIcon
                                                                                        className="text-warning"
                                                                                        icon={fullStar}
                                                                                    />
                                                                                }
                                                                            />
                                                                            <span>{rating}</span>
                                                                        </Col>
                                                                        <Col>Total review {ratingCount}</Col>
                                                                        <Col>Status:  <strong>{status}</strong></Col>
                                                                    </Col>
                                                                    <Col sm={8} >
                                                                        <div className="d-flex">
                                                                            {/*<NavLink*/}
                                                                            {/*  to={`/courses/${_id}`}*/}
                                                                            {/*  className="btn btn-primary w-100 me-1"*/}
                                                                            {/*>*/}
                                                                            {/*  View Details*/}
                                                                            {/*</NavLink>*/}


                                                                            <button
                                                                                onClick={() => {
                                                                                    if(window.confirm('Delete the item?')){remove(_id, uid)}}
                                                                                }
                                                                                className="btn btn-primary  w-100"
                                                                            >
                                                                                Delete Booking
                                                                            </button>

                                                                            &nbsp;
                                                                            {
                                                                                status === 'shipped' ?  ''
                                                                                    :
                                                                                    <button
                                                                                        onClick={() => statusChange(_id, uid,'shipped')}
                                                                                        className="btn btn-primary "
                                                                                    >
                                                                                        Shipped
                                                                                    </button>
                                                                            }
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}
                                            </Col>
                                        </Row>
                                    ) : (
                                        <div className="text-center my-5 py-5">
                                            <h1>No Course Selected!</h1>
                                        </div>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h1>add product</h1>
                                    <AddProduct/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <MakeAdmin />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    {allCourses.length ? (
                                        <Row>

                                            <Col className="" md={9}>
                                                {allCourses.map((course) => {
                                                    const { _id,img, title, desc, rating, ratingCount, price, status } =
                                                        course;

                                                    return (
                                                        <Row className="my-3" key={_id} style={{ border: '1px solid #c3c3c3',
                                                            borderRadius: '10px'}}>
                                                            <Col sm={5}>
                                                                <img className="img-fluid" src={img} alt="" />
                                                            </Col>
                                                            <Col sm={7} md={7}>
                                                                <h5>{title}</h5>
                                                                <h4>Price: {price}</h4>
                                                                <Row>
                                                                    <Col sm={4} lg={12}>
                                                                        <Col>
                                                                            <Rating
                                                                                initialRating={rating}
                                                                                readonly
                                                                                emptySymbol={
                                                                                    <FontAwesomeIcon
                                                                                        className="text-warning"
                                                                                        icon={emptyStar}
                                                                                    />
                                                                                }
                                                                                fullSymbol={
                                                                                    <FontAwesomeIcon
                                                                                        className="text-warning"
                                                                                        icon={fullStar}
                                                                                    />
                                                                                }
                                                                            />
                                                                            <span>{rating}</span>
                                                                        </Col>
                                                                        <Col>Total review {ratingCount}</Col>
                                                                        <Col>Status:  <strong>{status}</strong></Col>
                                                                    </Col>
                                                                    <Col sm={8} >
                                                                        <div className="d-flex">
                                                                            {/*<NavLink*/}
                                                                            {/*  to={`/courses/${_id}`}*/}
                                                                            {/*  className="btn btn-primary w-100 me-1"*/}
                                                                            {/*>*/}
                                                                            {/*  View Details*/}
                                                                            {/*</NavLink>*/}


                                                                            <button
                                                                                onClick={() => {
                                                                                    if(window.confirm('Delete the item?')){removeProduct(_id)}}
                                                                                }
                                                                                className="btn btn-primary  w-100"
                                                                            >
                                                                                Delete Product
                                                                            </button>


                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })}
                                            </Col>


                                        </Row>
                                    ) : (
                                        <div className="text-center my-5 py-5">
                                            <h1>No Course Selected!</h1>
                                        </div>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="five">
                                    <h1>Logout</h1>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>




        </div>
    );
};

export default AdminPanel;
