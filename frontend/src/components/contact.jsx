import { Mail, Phone, MapPin, Github, Linkedin, User } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact">

            <div className="contact-wrapper">
                <h2 className="contact-heading">Get in Touch</h2>

                <div className="contact-card">
                    <h3><User size={20} /> College Contact</h3>
                    <p><MapPin size={16} /> <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/qpFFP3bmLCLKSHTQA"> Sadhaura Road Kala-Amb, Himachal Pradesh</a></p>
                    <p><Mail size={16} /> <a target="_blank" rel="noopener noreferrer" href="mailto:info@hgpi.in" >info@hgpi.in</a> </p>
                    <p><Phone size={16} /> <a target="_blank" rel="noopener noreferrer" href="tel:+919671300918"> +91 9671300918</a> </p>
                </div>

                <div className="contact-card">
                    <h3><User size={20} /> Developer Contact</h3>
                    <p><Mail size={16} /> <a href="mailto:gurbajsingh098@gmail.com" target="_blank" rel="noopener noreferrer"> gurbajsingh098@gmail.com </a></p>
                    <p>
                        <Github size={16} />
                        <a href="https://github.com/GurbajSinghCodes" target="_blank" rel="noopener noreferrer"> Github</a>
                    </p>
                    <p>
                        <Linkedin size={16} />
                        <a href="https://linkedin.com/in/gurbaj-singh-5a09482a6" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
