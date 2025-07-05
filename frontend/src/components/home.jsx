import React, { useState, useRef, useEffect } from "react";
const HomePage = () => {


    return (
        <div className="homepage">
            <div className="full-page-blur"></div>

            <header className="banner">
                <h1>Welcome to Himalayan Institute of Engineering & Technology</h1>
                <p>Empowering Students for a Better Future</p>
            </header>
            <div className="content">
                <section className="notices">
                    <h2>Latest Notices</h2>
                    <ul>
                        <li>New session starting from August 2025</li>
                        <li>Admissions open for 2025 batch for all streams including Computer Science and Engineering or AI&ML, Electrical Engineering, Civil Engineering and Mechanical Engineering</li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://hptuexam.com">Results</a> for examinations held in May 2025 are  out for everyone</li>
                    </ul>
                </section>

                <section className="photos">
                    <h2>Campus Highlights</h2>
                    <div className="photo-grid">
                        <div> <img src="/images/hgpi.jpg" alt="Campus view" /><span>Campus</span> </div>
                        <div>  <img src="/images/library.jpg" alt="Library" />              <span>Library</span></div>
                        <div> <img src="/images/playground.jpg" alt="Computer Lab" />              <span>Playground</span> </div>
                        <div> <img src="/images/smartroom.jpg" alt="Campus view" /><span>Smart Rooms</span> </div>
                        <div>  <img src="/images/walkway.jpg" alt="Campus" />              <span>Walkway</span></div>
                        <div>  <img src="/images/hostel.jpg" alt="Library" />              <span>Hostels</span></div>

                    </div>
                </section>


            </div>


        </div>
    );
};

export default HomePage