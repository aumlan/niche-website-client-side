import React from "react";
import { Container, Row } from "react-bootstrap";
import Service from "../service/Service.js";
import bgImage from "./../../assets/images/sectionBg.png";
import Bounce from "react-reveal/Bounce";
import useCourses from "../../hooks/useCourses.js";

const Services = () => {
  const [courses] = useCourses();
  return (
    <div
      style={{ background: `url(${bgImage})`, backgroundAttachment: "fixed" }}
    >
      <Container className="py-5">
        <Bounce left cascade>
          <h2 className="text-center text-white mb-0">Best Tour Packages</h2>
        </Bounce>
        <Bounce right cascade>
          <p className="my-4 mt-2 text-center text-muted fs-5">
            Learn exciting technologies from web development, design, game
            development and more!
          </p>
        </Bounce>
        <Row>
          {courses?.map((course) => (
            <Service course={course} key={course.key}></Service>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Services;
