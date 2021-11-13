import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './DownloadApp.module.css';

const DownloadApp = () => {
    return (
        <>

            <section>
                <div className="row mb-3">
                    <h2>Get The View You Never Experienced! </h2>
                    <p>Download the App and Earn free Coin. Use Coins to get FREE Products.</p>
                </div>

                <div className='row d-flex mt-4 mb-5' >

                    <div className={`${classes.content_shadow} content my-2`}>
                        <h4> 100+ </h4>
                        <p > Advanced Drones </p>
                    </div>
                    <div className={`${classes.content_shadow} content my-2`}>
                        <h4> 250+ </h4>
                        <p > Drones Accessories </p>
                    </div>
                    <div className={`${classes.content_shadow} content my-2`}>
                        <h4> 750+ </h4>
                        <p > Positive Reviews </p>
                    </div>
                    <div className={`${classes.content_shadow} content my-2`}>
                        <h4> 150,000+ </h4>
                        <p > Download App </p>
                    </div>
                </div>

                <div className="mb-2">
                    <Button variant="success">Download The App</Button>{' '}
                </div>

            </section>



        </>
    );
};

export default DownloadApp;