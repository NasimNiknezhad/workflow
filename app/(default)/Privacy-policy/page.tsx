import React from 'react';
import '../../../css/privacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <div className="privacy-policy__content">
        <section className="privacy-policy__section">
          <h2>1. Introduction</h2>
          <p>
            Your privacy is important to us. This privacy policy explains the personal data we collect, how we use it, and your rights regarding your data. By using our website, you agree to the collection and use of your information in accordance with this policy.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>2. Data We Collect</h2>
          <p>
            We collect personal information that you provide to us directly, such as your name, email address, phone number, and other contact details. We also collect data automatically when you interact with our website, such as IP address, browser type, and usage data.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>3. How We Use Your Data</h2>
          <p>
            We use the collected data to provide and improve our services, respond to your inquiries, send promotional communications (if you opt-in), and improve the security and functionality of our website.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2>4. Data Security</h2>
          <p>
            We are committed to ensuring the security of your personal data. We implement a variety of security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

      
        <section className="privacy-policy__section">
          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
