import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Rating from "react-rating";
import useAuth from "../hooks/useAuth.js";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const MyOrder = () => {
  const { selectedCourse, remove, setSelectedCourse, AllContexts } = useAuth();
  const { user } = AllContexts;
  const { uid } = user;

  const history = useHistory();
  const totalPrice = selectedCourse.reduce(
    (total, course) => total + course.price,
    0
  );

  return (
    <div className="my-4">
      <Container>
        {selectedCourse.length ? (
          <Row>
            {/*<Col className="text-center" md={4}>*/}
            {/*  <h4>Total {selectedCourse.length} course selected</h4>*/}
            {/*  <h6>Total Price: {totalPrice.toFixed(2)} $</h6>*/}

            {/*  <button*/}
            {/*    onClick={() => {*/}
            {/*      fetch(*/}
            {/*        // `https://aqueous-dawn-65962.herokuapp.com/purchase/${uid}`,*/}
            {/*        `http://localhost:5000/purchase/${uid}`,*/}
            {/*        {*/}
            {/*          method: "delete",*/}
            {/*        }*/}
            {/*      )*/}
            {/*        .then((res) => res.json())*/}
            {/*        .then((data) => {*/}
            {/*          if (data.deletedCount > 0) {*/}
            {/*            alert("This for purchasing");*/}
            {/*            setSelectedCourse([]);*/}
            {/*            history.push("/home");*/}
            {/*          }*/}
            {/*        });*/}
            {/*    }}*/}
            {/*    className="btn btn-primary"*/}
            {/*  >*/}
            {/*    Check Out*/}
            {/*  </button>*/}
            {/*</Col>*/}
            <Col className="" md={8}>
              {selectedCourse.map((course) => {
                const { _id,img, title, desc, rating, ratingCount, price } =
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
                              Cancel Booking
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
      </Container>
    </div>
  );
};

export default MyOrder;
