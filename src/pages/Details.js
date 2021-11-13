import React, { useEffect, useState } from "react";
import {Redirect, useHistory} from "react-router-dom";
import useAuth from "./../hooks/useAuth.js";
import { useParams } from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";

const Details = () => {
    const { selectedCourse,setSelectedCourse } = useAuth();
    const history = useHistory();
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const { addToCart, AllContexts } = useAuth();
  const { user } = AllContexts;
  const { uid } = user;
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = () => {
      course.uid = uid;
      course.status = "pending";
    fetch(
        `http://localhost:5000/place-order/${uid}`, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(course),
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
              alert("succesfully Booked The Package" );
              const newSelection = [...selectedCourse, course];
              setSelectedCourse(newSelection);
              history.push('/dashboard');
          }
        });
  };

  useEffect(() => {
    fetch(
        `http://localhost:5000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?._id) {
          setCourse(data);
        } else {
          alert("something went wrong!");
        }
      });
  }, [id]);

  return (
    <div className="my-4">
      {course?.title ? (
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={3}>
              <h3>Place Order</h3>

              <p>*Provide your valid information</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="form-group mb-2">
                  <input className="form-control" {...register("name")} placeholder="Name"/>
                </div>

                <div className="form-group mb-2">
                  <input className="form-control" {...register("email", { required: true })} placeholder="Email"/>
                </div>

                <div className="form-group mb-2">
                  <input className="form-control" {...register("address", { required: true })} placeholder="Address"/>
                </div>

                <div className="form-group mb-3">
                  {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <Button variant="primary" type="submit">
                  Submit
                </Button>

              </form>
            </Col>
            <Col md={3}>
              <img className="img-fluid" src={course.img} alt="" />
            </Col>
            <Col md={6} className="d-flex justify-content-center flex-column">
              <h2>{course.title}</h2>
              <h6>{course.desc}</h6>
              <Row>
                <Col>
                  <h1>Price: {course.price}TK</h1>
                  <div className="my-2">
                    <Rating
                      initialRating={course.rating}
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
                    <span> {course.rating}</span>
                    <p className="mb-3">Total Review: {course.ratingCount}</p>
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
                    {/*  Add to Cart*/}
                    {/*</button>*/}
                  </div>
                </Col>
                <Col>
                  <div className="text-center">
                    <img
                      width="120px"
                      className="rounded-circle"
                      src={course.sellerThumb}
                      alt=""
                    />
                    {/*<h5>Seller: {course.provider}</h5>*/}
                    {/*<p className="mb-0">Web Apps Developer</p>*/}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <div className="my-5 py-1">
          <h1 className="my-5 p-5 text-center">NO Course Found</h1>
        </div>
      )}
    </div>
  );
};

export default Details;
