import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-content">
            <h1>Contact Information</h1>

                {/* Contact Form */}
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="4" placeholder="Your Message" required></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                </div>
                {/* Contact Information */}
                <div className="contact-info">
                    <p className="contact-description">
                        We'd love to hear from you! Reach out to us using the information below or send us a message.
                    </p>
                    <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <p>+91 9907359784</p> 
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <p>support@thriftnbliss.in</p>
                    </div>
                    <div className="contact-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <p>Shop no. 7, 1st floor, Shopping Complex, 2nd Street, Jorethang, South Sikkim, 737128</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
