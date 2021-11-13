import React from "react";
import bgImage from "./../assets/images/sectionBg.png";
import Bg from "./../assets/images/drone_banner.jpg";
import { Container, Row } from "react-bootstrap";
import Bounce from "react-reveal/Bounce";
import Slide from "react-reveal/Slide";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Service from "../components/service/Service.js";
import DownloadApp from "../components/DownloadApp/DownloadApp";
import Award from "../components/Award/Award";

const Home = () => {
  const { courses } = useAuth();
  return (
    <div>
      <div
        style={{
          background: `url(${Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <Container>
          <div
            style={{ height: "85vh" }}
            className="d-flex justify-content-center align-items-center"
          >
            <div className="text-center my-5 py-5">
              <Bounce left cascade>
                <h1 className="text-dark">Best Drones In Your Area</h1>
              </Bounce>

              <Bounce right cascade>
                <p className="my-4 text-dark fs-5">
                    Get the Best drones for your next shoot!
                </p>
              </Bounce>

              <Bounce>
                <NavLink
                  to="/courses"
                  className="rounded-pill btn btn-primary fs-5 py-2 px-4"
                >
                  View Drones
                </NavLink>
              </Bounce>
            </div>
          </div>
        </Container>
      </div>

      <div
        id="feature"
        className="py-5"
        style={{ backgroundColor: `rgb(203 203 203)` }}
      >
        <div className="text-center text-dark mb-5">
          <Slide left>
            <h1> Feature Products</h1>
          </Slide>

          <Slide right>
            <p className="mb-0">
              Here you can find the best drones for you. It is better than typical e-commerce platform.
            </p>
          </Slide>
        </div>

        <Container>
          <div className="my-3 d-flex flex-wrap justify-content-between">
            <Row>
              {courses.slice(0, 6)?.map((course) => (
                <Service key={course.key} course={course} />
              ))}
            </Row>
          </div>
        </Container>
      </div>
        <div
            className="py-5 text-center"
            style={{backgroundColor: '#E1E1E1 '}}
        >
            <Container>
                <DownloadApp/>
            </Container>
        </div>

        <div
            className="py-5 text-center"
            style={{backgroundColor: 'rgb(249 249 249) '}}
        >
            <Container>
                <Award/>
            </Container>
        </div>

    </div>
  );
};

export default Home;
