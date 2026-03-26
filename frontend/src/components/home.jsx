import { Image } from "lucide-react"
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
                        <li>New session starts July 2026</li>
                        <li>Admissions will open soon for all streams including CSE , AI&ML, Electrical Engineering, Civil Engineering and Mechanical Engineering</li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://himachal-pradesh.indiaresults.com/">Results</a> for examinations held in December 2025 are  out for everyone</li>
                    </ul>
                </section>

                <section className="photos">
                    <h2>Campus Highlights</h2>
                    <div className="photo-grid">
                        <div> <img src="/images/hgpi.jpg" alt="Campus view" /> <span>Campus</span></div>
                        <div> <img src="/images/library.webp" alt="library" /> <span>Library</span></div>
                        <div> <img src="/images/playground.webp" alt="Playground" />  <span>Playground</span></div>
                        <div> <img src="/images/smartroom.jpg" alt="Smart Rooms" /><span>Smart Rooms</span></div>
                        <div> <img src="/images/walkway.webp" alt="Walkway" /><span>Walkway</span></div>
                        <div> <img src="/images/hostel.jpg" alt="Hostel Rooms" /><span>Hostels</span></div>
                    </div>
                </section>


            </div>


        </div>
    );
};

export default HomePage