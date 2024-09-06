import React from 'react';
import '../../../css/contactInfo.css'; 

const ContactInfo = () => {
  const contactDetails = {
    company: "Doe Enterprises",
    phone: "(123) 456-7890",
    email: "gittask@example.com",
    address: "1234 Elm Street, Springfield, IL 62701",
  };

  return (
    <div className="contact-info">
      <h1>Contact Information</h1>
      <div className="contact-info__details">
        
        <div className="contact-info__item">
          <label htmlFor="contact-phone">Phone:</label>
          <span id="contact-phone">{contactDetails.phone}</span>
        </div>
        <div className="contact-info__item">
          <label htmlFor="contact-email">Email:</label>
          <span id="contact-email">{contactDetails.email}</span>
        </div>
        <div className="contact-info__item">
          <label htmlFor="contact-address">Address:</label>
          <span id="contact-address">{contactDetails.address}</span>
        </div>
        <div className="contact-info__item">
          <label htmlFor="contact-company">Company:</label>
          <span id="contact-company">{contactDetails.company}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
