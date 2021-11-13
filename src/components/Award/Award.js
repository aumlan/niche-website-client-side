import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './Award.module.css';
import award1 from './../../assets/images/award_1.jpg'
import award2 from './../../assets/images/award_2.jpg'
import logo from "../../assets/images/full-logo.png";

const Award = () => {
    return (
        <>

                <div className="row mb-3">
                    <h2>Winning Best E-commerce Awards ! </h2>
                    <p>Leading Online Ecommerce platform</p>
                </div>

                <div className='row d-flex mt-4 mb-5 justify-content-center' >

                    <div className={`${classes.content_shadow} content col-md-3 mb-3`}>
                        <img width="250px" height="250px" src={award1} alt="Logo" />
                    </div>
                    <div className='col-md-1'></div>
                    <div className={`${classes.content_shadow} content col-md-3 mb-3`}>
                        <img width="200px" src={award2} alt="Logo" />
                    </div>

                </div>

        </>
    );
};

export default Award;