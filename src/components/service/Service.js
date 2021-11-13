import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import Zoom from "react-reveal/Zoom";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const Service = ({ course }) => {
  const history = useHistory();
  const { _id, img, title, desc, price, rating, ratingCount } = course;

  const { addToCart, AllContexts } = useAuth();
  const { user } = AllContexts;
  const { uid } = user;
  return (
    <Col sm={12} md={6} lg={4}>
      <Zoom>
        <div className="m-2">
          <Card className="mx-auto"
                style={{
                  width: "21rem",
                  boxShadow: 'rgb(0 0 0 / 25%) 0px 14px 28px, rgb(0 0 0 / 22%) 0px 10px 10px',
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}>
            <Card.Img variant="top" style={{ minHeight: "220px", maxHeight: '250px', borderBottom: '1px solid #d7d7d7' }} src={img} />
            <Card.Body className="my-1 py-1" >
              <Card.Title>{title.slice(0, 25)}</Card.Title>
              <Card.Text>{desc.slice(0, 50)}</Card.Text>
            </Card.Body>
            <Card.Body className="my-1 py-1">
              <h4>Price: {price}$</h4>
            </Card.Body>
            <Card.Body className="my-1 py-1">
              <Row>
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
              </Row>
            </Card.Body>
            <Card.Body className="d-flex">
              <NavLink
                to={`/courses/${_id}`}
                className="btn btn-primary w-100 me-1"
              >
                Purchase Now
              </NavLink>

              {/*<button*/}
              {/*  onClick={() => {*/}
              {/*    if (uid) {*/}
              {/*      addToCart(course);*/}
              {/*    } else {*/}
              {/*      history.push("/login");*/}
              {/*    }*/}
              {/*  }}*/}
              {/*  className="btn btn-primary  w-100"*/}
              {/*>*/}
              {/*  Book Now*/}
              {/*</button>*/}
            </Card.Body>
          </Card>
        </div>
      </Zoom>
    </Col>
  );
};

export default Service;
